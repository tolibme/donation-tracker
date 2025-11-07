// Database utility that works with both local JSON and Vercel Blob
import path from 'path'
import { promises as fs } from 'fs'

interface Donator {
  id: number
  name: string
  amount: number
  date: string
  message?: string
}

// Check if we have Vercel Blob configured
const hasBlob = process.env.BLOB_READ_WRITE_TOKEN

let blobPut: any = null
let blobList: any = null
let blobDel: any = null

// Initialize Blob only if available
if (hasBlob) {
  try {
    const blob = require('@vercel/blob')
    blobPut = blob.put
    blobList = blob.list
    blobDel = blob.del
  } catch (error) {
    console.warn('Vercel Blob not available, using local JSON file')
  }
}

const DONATORS_BLOB_NAME = 'donators.json'

// Get all donators
export async function getDonators(): Promise<Donator[]> {
  if (blobPut && blobList) {
    try {
      // List blobs to find our donators file
      const { blobs } = await blobList({ prefix: DONATORS_BLOB_NAME })
      
      if (blobs && blobs.length > 0) {
        // Fetch the blob content
        const response = await fetch(blobs[0].url)
        const data = await response.json()
        return data
      }
      
      // If blob doesn't exist, return empty array
      return []
    } catch (error) {
      console.error('Error reading from Blob:', error)
      return []
    }
  } else {
    // Use local JSON file
    try {
      const jsonDirectory = path.join(process.cwd(), 'data')
      const filePath = jsonDirectory + '/donators.json'
      const fileContents = await fs.readFile(filePath, 'utf8')
      return JSON.parse(fileContents)
    } catch (error) {
      console.error('Error reading from JSON file:', error)
      return []
    }
  }
}

// Save all donators
export async function saveDonators(donators: Donator[]): Promise<boolean> {
  if (blobPut && blobList && blobDel) {
    try {
      // Delete old blob if exists
      const { blobs } = await blobList({ prefix: DONATORS_BLOB_NAME })
      if (blobs && blobs.length > 0) {
        await blobDel(blobs[0].url)
      }
      
      // Upload new blob
      const jsonString = JSON.stringify(donators, null, 2)
      await blobPut(DONATORS_BLOB_NAME, jsonString, {
        access: 'public',
        contentType: 'application/json',
      })
      
      return true
    } catch (error) {
      console.error('Error writing to Blob:', error)
      return false
    }
  } else {
    // Use local JSON file
    try {
      const jsonDirectory = path.join(process.cwd(), 'data')
      const filePath = jsonDirectory + '/donators.json'
      await fs.writeFile(filePath, JSON.stringify(donators, null, 2), 'utf8')
      return true
    } catch (error) {
      console.error('Error writing to JSON file:', error)
      console.error('If you are on Vercel, you need to set up Vercel Blob storage.')
      console.error('See DATABASE_SETUP.md for instructions.')
      
      // Check if we're in a serverless environment
      if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        throw new Error('Cannot write to filesystem in serverless environment. Please set up Vercel Blob storage. See DATABASE_SETUP.md')
      }
      return false
    }
  }
}

// Add a donator
export async function addDonator(donator: Omit<Donator, 'id'>): Promise<Donator | null> {
  const donators = await getDonators()
  const newId = donators.length > 0 ? Math.max(...donators.map(d => d.id)) + 1 : 1
  const newDonator: Donator = {
    id: newId,
    name: donator.name,
    amount: Number(donator.amount),
    date: donator.date,
    message: donator.message || ''
  }
  
  donators.push(newDonator)
  const success = await saveDonators(donators)
  return success ? newDonator : null
}

// Update a donator
export async function updateDonator(id: number, donator: Omit<Donator, 'id'>): Promise<boolean> {
  const donators = await getDonators()
  const index = donators.findIndex(d => d.id === id)
  
  if (index === -1) return false
  
  donators[index] = {
    id,
    name: donator.name,
    amount: Number(donator.amount),
    date: donator.date,
    message: donator.message || ''
  }
  
  return await saveDonators(donators)
}

// Delete a donator
export async function deleteDonator(id: number): Promise<boolean> {
  const donators = await getDonators()
  const filtered = donators.filter(d => d.id !== id)
  
  if (filtered.length === donators.length) return false
  
  return await saveDonators(filtered)
}

// Get storage type for debugging
export function getStorageType(): string {
  return blobPut ? 'Vercel Blob' : 'Local JSON File'
}
