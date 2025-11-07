// Database utility that works with MongoDB (cloud) and local JSON (development)
import path from 'path'
import { promises as fs } from 'fs'
import { MongoClient, Db, Collection } from 'mongodb'

interface Donator {
  id: number
  name: string
  amount: number
  date: string
  message?: string
}

// MongoDB connection
let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.MONGODB_DB || 'warmsteps'
const COLLECTION_NAME = 'donators'

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
  }

  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db(DB_NAME)

  cachedClient = client
  cachedDb = db

  return { client, db }
}

async function getCollection(): Promise<Collection<Donator>> {
  const { db } = await connectToDatabase()
  return db.collection<Donator>(COLLECTION_NAME)
}

// Check if we have MongoDB configured
const hasMongoDB = !!MONGODB_URI

// Get all donators
export async function getDonators(): Promise<Donator[]> {
  if (hasMongoDB) {
    try {
      const collection = await getCollection()
      const donators = await collection.find({}).sort({ id: 1 }).toArray()
      // Remove MongoDB _id field
      return donators.map(({ _id, ...donator }: any) => donator)
    } catch (error) {
      console.error('Error reading from MongoDB:', error)
      return []
    }
  } else {
    // Use local JSON file for development
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

// Save all donators (for local dev only, MongoDB uses individual operations)
async function saveDonators(donators: Donator[]): Promise<boolean> {
  if (hasMongoDB) {
    try {
      const collection = await getCollection()
      // Clear collection and insert all
      await collection.deleteMany({})
      if (donators.length > 0) {
        await collection.insertMany(donators as any)
      }
      return true
    } catch (error) {
      console.error('Error writing to MongoDB:', error)
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
      console.error('If you are on Vercel, you need to set up MongoDB.')
      console.error('See DATABASE_SETUP.md for instructions.')
      
      // Check if we're in a serverless environment
      if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        throw new Error('Cannot write to filesystem in serverless environment. Please set up MongoDB. See DATABASE_SETUP.md')
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
  
  if (hasMongoDB) {
    try {
      const collection = await getCollection()
      await collection.insertOne(newDonator as any)
      return newDonator
    } catch (error) {
      console.error('Error adding to MongoDB:', error)
      return null
    }
  } else {
    donators.push(newDonator)
    const success = await saveDonators(donators)
    return success ? newDonator : null
  }
}

// Update a donator
export async function updateDonator(id: number, donator: Omit<Donator, 'id'>): Promise<boolean> {
  if (hasMongoDB) {
    try {
      const collection = await getCollection()
      const result = await collection.updateOne(
        { id },
        { 
          $set: {
            name: donator.name,
            amount: Number(donator.amount),
            date: donator.date,
            message: donator.message || ''
          }
        }
      )
      return result.matchedCount > 0
    } catch (error) {
      console.error('Error updating in MongoDB:', error)
      return false
    }
  } else {
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
}

// Delete a donator
export async function deleteDonator(id: number): Promise<boolean> {
  if (hasMongoDB) {
    try {
      const collection = await getCollection()
      const result = await collection.deleteOne({ id })
      return result.deletedCount > 0
    } catch (error) {
      console.error('Error deleting from MongoDB:', error)
      return false
    }
  } else {
    const donators = await getDonators()
    const filtered = donators.filter(d => d.id !== id)
    
    if (filtered.length === donators.length) return false
    
    return await saveDonators(filtered)
  }
}

// Get storage type for debugging
export function getStorageType(): string {
  return hasMongoDB ? 'MongoDB Atlas' : 'Local JSON File'
}
