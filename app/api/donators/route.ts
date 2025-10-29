import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET() {
  try {
    // Read the donators.json file
    const jsonDirectory = path.join(process.cwd(), 'data')
    const fileContents = await fs.readFile(jsonDirectory + '/donators.json', 'utf8')
    const donators = JSON.parse(fileContents)
    
    // Sort by date (most recent first)
    donators.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return NextResponse.json(donators)
  } catch (error) {
    console.error('Error reading donators file:', error)
    return NextResponse.json([], { status: 200 })
  }
}
