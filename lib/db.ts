// Database utility that works with both local JSON and Vercel KV
import path from 'path'
import { promises as fs } from 'fs'

interface Donator {
  id: number
  name: string
  amount: number
  date: string
  message?: string
}

// Check if we're in production with Vercel KV
const isProduction = process.env.VERCEL_ENV === 'production'
const hasKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN

let kv: any = null

// Initialize KV only if available
if (hasKV) {
  try {
    const { kv: vercelKV } = require('@vercel/kv')
    kv = vercelKV
  } catch (error) {
    console.warn('Vercel KV not available, using local JSON file')
  }
}

const DONATORS_KEY = 'donators'

// Get all donators
export async function getDonators(): Promise<Donator[]> {
  if (kv) {
    try {
      const donators = await kv.get(DONATORS_KEY)
      return donators || []
    } catch (error) {
      console.error('Error reading from KV:', error)
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
  if (kv) {
    try {
      await kv.set(DONATORS_KEY, donators)
      return true
    } catch (error) {
      console.error('Error writing to KV:', error)
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
      console.error('If you are on Vercel, you need to set up Vercel KV database.')
      console.error('See DATABASE_SETUP.md for instructions.')
      
      // Check if we're in a serverless environment
      if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        throw new Error('Cannot write to filesystem in serverless environment. Please set up Vercel KV database. See DATABASE_SETUP.md')
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
  return kv ? 'Vercel KV' : 'Local JSON File'
}
