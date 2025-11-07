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
        return NextResponse.json({ error: 'Failed to add donator' }, { status: 500 })
      }
    } else if (action === 'delete') {
      const success = await deleteDonator(id)
      if (!success) {
        return NextResponse.json({ error: 'Failed to delete donator' }, { status: 500 })
      }
    } else if (action === 'edit') {
      const success = await updateDonator(id, donator)
      if (!success) {
        return NextResponse.json({ error: 'Failed to update donator' }, { status: 500 })
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
    return NextResponse.json({ 
      error: 'Failed to manage donators',
      details: String(error)
    }, { status: 500 })
  }
}

