import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import { validateAdminPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password, action, donator, id } = body

    // Validate admin password
    if (!validateAdminPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const jsonDirectory = path.join(process.cwd(), 'data')
    const filePath = jsonDirectory + '/donators.json'
    const fileContents = await fs.readFile(filePath, 'utf8')
    let donators = JSON.parse(fileContents)

    if (action === 'add') {
      // Add new donator
      const newId = donators.length > 0 ? Math.max(...donators.map((d: any) => d.id)) + 1 : 1
      const newDonator = {
        id: newId,
        name: donator.name,
        amount: Number(donator.amount),
        date: donator.date,
        message: donator.message || ''
      }
      donators.push(newDonator)
    } else if (action === 'delete') {
      // Delete donator
      donators = donators.filter((d: any) => d.id !== id)
    } else if (action === 'edit') {
      // Edit donator
      const index = donators.findIndex((d: any) => d.id === id)
      if (index !== -1) {
        donators[index] = {
          id: id,
          name: donator.name,
          amount: Number(donator.amount),
          date: donator.date,
          message: donator.message || ''
        }
      }
    }

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(donators, null, 2), 'utf8')

    return NextResponse.json({ success: true, donators })
  } catch (error) {
    console.error('Error managing donators:', error)
    return NextResponse.json({ error: 'Failed to manage donators' }, { status: 500 })
  }
}
