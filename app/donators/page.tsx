"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Donator {
  id: number
  name: string
  amount: number
  date: string
  message?: string
}

export default function DonatorsPage() {
  const [donators, setDonators] = useState<Donator[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/donators')
      .then(res => res.json())
      .then(data => {
        setDonators(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load donators:', err)
        setLoading(false)
      })
  }, [])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalDonations = donators.reduce((sum, d) => sum + d.amount, 0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center gap-3">
            <span className="text-5xl">🙏</span>
            <span>Our Generous Donators</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Thank you to everyone who has contributed to bringing warmth this winter
          </p>
        </div>

        {/* Total Donations Card */}
        <Card className="mb-8 p-6 shadow-lg border-0 bg-card">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Total Donations</p>
            <p className="text-3xl sm:text-4xl font-bold text-primary">
              {formatAmount(totalDonations)} UZS
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              from {donators.length} generous {donators.length === 1 ? 'donor' : 'donors'}
            </p>
          </div>
        </Card>

        {/* Donators List */}
        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading donators...</p>
          </Card>
        ) : donators.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No donations yet. Be the first to donate!</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {donators.map((donator) => (
              <Card key={donator.id} className="p-6 shadow-md border-0 bg-card hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">💖</span>
                      <h3 className="text-xl font-bold text-foreground">{donator.name}</h3>
                    </div>
                    {donator.message && (
                      <p className="text-sm text-muted-foreground italic ml-11">
                        "{donator.message}"
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right sm:text-left sm:min-w-[200px]">
                    <p className="text-2xl font-bold text-primary mb-1">
                      {formatAmount(donator.amount)} UZS
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(donator.date)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Make a Donation
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
