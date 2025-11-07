// MongoDB database utility
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
    throw new Error('MONGODB_URI environment variable is not defined. Please set up MongoDB Atlas.')
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

// Get all donators
export async function getDonators(): Promise<Donator[]> {
  try {
    const collection = await getCollection()
    const donators = await collection.find({}).sort({ id: 1 }).toArray()
    // Remove MongoDB _id field
    return donators.map(({ _id, ...donator }: any) => donator)
  } catch (error) {
    console.error('Error reading from MongoDB:', error)
    throw error
  }
}

// Add a donator
export async function addDonator(donator: Omit<Donator, 'id'>): Promise<Donator | null> {
  try {
    const donators = await getDonators()
    const newId = donators.length > 0 ? Math.max(...donators.map(d => d.id)) + 1 : 1
    
    const newDonator: Donator = {
      id: newId,
      name: donator.name,
      amount: Number(donator.amount),
      date: donator.date,
      message: donator.message || ''
    }
    
    const collection = await getCollection()
    await collection.insertOne(newDonator as any)
    return newDonator
  } catch (error) {
    console.error('Error adding to MongoDB:', error)
    return null
  }
}

// Update a donator
export async function updateDonator(id: number, donator: Omit<Donator, 'id'>): Promise<boolean> {
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
}

// Delete a donator
export async function deleteDonator(id: number): Promise<boolean> {
  try {
    const collection = await getCollection()
    const result = await collection.deleteOne({ id })
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting from MongoDB:', error)
    return false
  }
}

// Get storage type for debugging
export function getStorageType(): string {
  return MONGODB_URI ? 'MongoDB Atlas' : 'Not Configured'
}
