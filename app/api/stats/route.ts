import { NextResponse } from 'next/server'
import { getDonators } from '@/lib/db'

export async function GET() {
  try {
    const donators = await getDonators()
    
    // Calculate total collected amount
    const totalCollected = donators.reduce((sum, donator) => {
      return sum + Number(donator.amount)
    }, 0)
    
    return NextResponse.json({ 
      collected: totalCollected,
      donatorCount: donators.length 
    })
  } catch (error) {
    console.error('Error reading stats:', error)
    return NextResponse.json({ collected: 0, donatorCount: 0 }, { status: 200 })
  }
}
