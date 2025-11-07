import { NextResponse } from 'next/server'
import { getDonators } from '@/lib/db'

export async function GET() {
  try {
    const donators = await getDonators()
    
    // Sort by date (most recent first)
    donators.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return NextResponse.json(donators)
  } catch (error) {
    console.error('Error reading donators:', error)
    return NextResponse.json([], { status: 200 })
  }
}
