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

    // Check if we need to setup database
    const storageType = getStorageType()
    if (storageType === 'Local JSON File' && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)) {
      return NextResponse.json({ 
        error: 'Database not configured',
        message: 'You are running in production but MongoDB is not set up. Please set up MongoDB Atlas to enable admin features.',
        instructions: 'Go to MongoDB Atlas → Create Free Cluster → Get Connection String → Add MONGODB_URI to Vercel Environment Variables. See DATABASE_SETUP.md for details.'
      }, { status: 503 })
    }

    let result: any

    if (action === 'add') {
      result = await addDonator(donator)
      if (!result) {
        return NextResponse.json({ 
          error: 'Failed to add donator',
          message: 'Could not save data. If on Vercel, please set up MongoDB Atlas.'
        }, { status: 500 })
      }
    } else if (action === 'delete') {
      const success = await deleteDonator(id)
      if (!success) {
        return NextResponse.json({ 
          error: 'Failed to delete donator',
          message: 'Could not delete data. If on Vercel, please set up MongoDB Atlas.'
        }, { status: 500 })
      }
    } else if (action === 'edit') {
      const success = await updateDonator(id, donator)
      if (!success) {
        return NextResponse.json({ 
          error: 'Failed to update donator',
          message: 'Could not update data. If on Vercel, please set up MongoDB Atlas.'
        }, { status: 500 })
      }
    }

    // Return updated list
    const donators = await getDonators()
    
    return NextResponse.json({ 
      success: true, 
      donators,
      storage: storageType 
    })
  } catch (error) {
    console.error('Error managing donators:', error)
    
    const errorMessage = String(error)
    if (errorMessage.includes('serverless') || errorMessage.includes('filesystem')) {
      return NextResponse.json({ 
        error: 'Database not configured',
        message: 'MongoDB Atlas is required for production. Please set it up.',
        instructions: 'See DATABASE_SETUP.md for setup instructions.',
        details: errorMessage
      }, { status: 503 })
    }
    
    return NextResponse.json({ 
      error: 'Failed to manage donators',
      details: errorMessage
    }, { status: 500 })
  }
}

