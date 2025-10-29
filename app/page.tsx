"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function DonationTracker() {
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  // Calculate yesterday's date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const lastUpdated = yesterday.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })

  // Animation effect for progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(0) // GOTTA CHANGE THIS EVERY DAY (Sample: 3,450,000 / 9,000,000 * 100)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const collected = 0
  const goal = 9_000_000
  const slipperCost = 45_000
  const totalSlippers = 187

  const slippersFunded = Math.floor(collected / slipperCost)
  const slippersRemaining = totalSlippers - slippersFunded

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "✓ Copied!",
        description: `${label} number copied to clipboard`,
      })
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">💖</span>
            <span className="text-balance">Warm Steps for Kind Hearts</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Help us bring warmth and comfort to 187 grandparents this winter.
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 p-8 shadow-lg border-0 bg-card">
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Raised</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">💰 {(collected / 1_000_000).toFixed(2)}M</p>
                <p className="text-xs text-muted-foreground mt-1">UZS</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Goal</p>
                <p className="text-2xl sm:text-3xl font-bold text-accent">🎯 {(goal / 1_000_000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground mt-1">UZS</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">Progress</span>
                <span className="text-sm font-bold text-primary">{progress.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Slippers Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">🥿</p>
                <p className="text-sm text-muted-foreground">Slippers Funded</p>
                <p className="text-2xl font-bold text-foreground">{slippersFunded}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent mb-1">❄️</p>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-foreground">{slippersRemaining}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Donation Instructions */}
        <Card className="mb-8 p-8 shadow-lg border-0 bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span>💳</span>
            Donate via Card
          </h2>

          <div className="space-y-4">
            <div 
              className="bg-secondary p-4 rounded-lg border border-border cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => copyToClipboard("8600612227452165", "Uzcard")}
            >
              <p className="text-sm text-muted-foreground mb-2">Uzcard</p>
              <p className="text-lg font-mono font-bold text-foreground">8600 6122 2745 2165</p>
              <p className="text-xs text-muted-foreground mt-2">Click to copy</p>
            </div>

            {/* <div className="bg-secondary p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">HUMO</p>
              <p className="text-lg font-mono font-bold text-foreground">9860 XXXX XXXX XXXX</p>
            </div> */}
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground mb-3">
              <span className="font-semibold">💬 After donating:</span> Please send a screenshot or message to Telegram
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <a href="https://t.me/warmstepdonation">
                Telegram @warmstepdonation
              </a>
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-4 text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <span>🔄</span>
            Updated every 24 hours
          </p>
          <p>Last updated: {lastUpdated}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-border">
            <a href="https://t.me/warmstepdonation" className="text-primary hover:underline font-semibold">
              Telegram @warmstepdonation
            </a>
            {/* <span className="hidden sm:inline text-border">•</span>
            <a href="https://instagram.com/yourinsta" className="text-primary hover:underline font-semibold">
              Instagram @yourinsta
            </a> */}
          </div>
        </div>
      </div>
    </main>
  )
}
