"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import Link from "next/link"

export default function DonationTracker() {
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const { t, language } = useLanguage()

  // Calculate yesterday's date
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const locale = language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US'
  const lastUpdated = yesterday.toLocaleDateString(locale, { 
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
        title: t.copied,
        description: `${label} ${t.copiedDescription}`,
      })
    }).catch(() => {
      toast({
        title: t.failedToCopy,
        description: t.tryAgain,
        variant: "destructive",
      })
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">💖</span>
            <span className="text-balance">{t.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 p-8 shadow-lg border-0 bg-card">
          <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.raised}</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">💰 {(collected / 1_000_000).toFixed(2)}M</p>
                <p className="text-xs text-muted-foreground mt-1">UZS</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{t.goal}</p>
                <p className="text-2xl sm:text-3xl font-bold text-accent">🎯 {(goal / 1_000_000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground mt-1">UZS</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">{t.progress}</span>
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
                <p className="text-sm text-muted-foreground">{t.slippersFunded}</p>
                <p className="text-2xl font-bold text-foreground">{slippersFunded}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent mb-1">❄️</p>
                <p className="text-sm text-muted-foreground">{t.remaining}</p>
                <p className="text-2xl font-bold text-foreground">{slippersRemaining}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Donation Instructions */}
        <Card className="mb-8 p-8 shadow-lg border-0 bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span>💳</span>
            {t.donateViaCard}
          </h2>

          <div className="space-y-4">
            <div 
              className="bg-secondary p-4 rounded-lg border border-border cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => copyToClipboard("8600612227452165", "Uzcard")}
            >
              <p className="text-sm text-muted-foreground mb-2">Uzcard</p>
              <p className="text-lg font-mono font-bold text-foreground">8600 6122 2745 2165</p>
              <p className="text-xs text-muted-foreground mt-2">{t.clickToCopy}</p>
            </div>

            {/* <div className="bg-secondary p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-2">HUMO</p>
              <p className="text-lg font-mono font-bold text-foreground">9860 XXXX XXXX XXXX</p>
            </div> */}
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground mb-3">
              <span className="font-semibold">💬 {t.afterDonating}</span> {t.sendScreenshotMessage}
            </p>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <a href="https://t.me/warmstepdonation">
                {t.telegramButton}
              </a>
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center space-y-4 text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <span>🔄</span>
            {t.updatedEvery24Hours}
          </p>
          <p>{t.lastUpdated} {lastUpdated}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-border">
            <Link href="/donators" className="text-primary hover:underline font-semibold">
              🙏 {t.viewDonators}
            </Link>
            <span className="hidden sm:inline text-border">•</span>
            <a href="https://t.me/warmstepdonation" className="text-primary hover:underline font-semibold">
              {t.telegramButton}
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
