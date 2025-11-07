import { NextResponse } from 'next/server'
import { validateAdminPassword } from '@/lib/auth'
import { getDonators, addDonator, updateDonator, deleteDonator, getStorageType } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password, action, donator, id } = body

    // Validate admin password
    if (!validateAdminPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    let result: any

    if (action === 'add') {
      result = await addDonator(donator)
      if (!result) {
        return NextResponse.json({ 
          error: 'Failed to add donator',
          message: 'Could not save data to MongoDB.'
        }, { status: 500 })
      }
    } else if (action === 'delete') {
      const success = await deleteDonator(id)
      if (!success) {
        return NextResponse.json({ 
          error: 'Failed to delete donator',
          message: 'Could not delete data from MongoDB.'
        }, { status: 500 })
      }
    } else if (action === 'edit') {
      const success = await updateDonator(id, donator)
      if (!success) {
        return NextResponse.json({ 
          error: 'Failed to update donator',
          message: 'Could not update data in MongoDB.'
        }, { status: 500 })
      }
    }

    // Return updated list
    const donators = await getDonators()
    
    return NextResponse.json({ 
      success: true, 
      donators,
      storage: getStorageType() 
    })
  } catch (error) {
    console.error('Error managing donators:', error)
    
    const errorMessage = String(error)
    
    // Check if MongoDB is not configured
    if (errorMessage.includes('MONGODB_URI')) {
      return NextResponse.json({ 
        error: 'Database not configured',
        message: 'MongoDB Atlas is not set up. Please configure MONGODB_URI environment variable.',
        instructions: 'Go to Vercel Dashboard → Settings → Environment Variables → Add MONGODB_URI. See DATABASE_SETUP.md for details.'
      }, { status: 503 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to manage donators',
      message: errorMessage
    }, { status: 500 })
  }
}

