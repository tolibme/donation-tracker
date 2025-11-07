import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'data')
    const fileContents = await fs.readFile(jsonDirectory + '/donators.json', 'utf8')
    const donators = JSON.parse(fileContents)
    
    // Calculate total collected amount
    const totalCollected = donators.reduce((sum: number, donator: any) => {
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
