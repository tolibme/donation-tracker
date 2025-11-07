"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import Link from "next/link"

interface Donator {
  id: number
  name: string
  amount: number
  date: string
  message?: string
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [donators, setDonators] = useState<Donator[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const { toast } = useToast()
  const { language } = useLanguage()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    message: ""
  })

  useEffect(() => {
    if (isAuthenticated) {
      loadDonators()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter password",
        variant: "destructive",
      })
      return
    }

    // Check password by trying to fetch donators
    fetch('/api/admin/donators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, action: 'validate' })
    }).then(res => {
      if (res.ok) {
        setIsAuthenticated(true)
        toast({
          title: "✓ Success",
          description: "Logged in successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Invalid password",
          variant: "destructive",
        })
      }
    })
  }

  const loadDonators = async () => {
    try {
      const res = await fetch('/api/donators')
      const data = await res.json()
      setDonators(data)
    } catch (error) {
      console.error('Failed to load donators:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const action = editingId ? 'edit' : 'add'
      const donatorData = {
        name: formData.name.trim(),
        amount: parseInt(formData.amount),
        date: formData.date,
        message: formData.message.trim() || undefined
      }

      const res = await fetch('/api/admin/donators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          action,
          id: editingId,
          donator: donatorData
        })
      })

      if (res.ok) {
        const data = await res.json()
        // Force update the donators list
        if (data.donators && Array.isArray(data.donators)) {
          setDonators([...data.donators])
        } else {
          // Fallback: reload from API
          await loadDonators()
        }
        setFormData({ name: "", amount: "", date: new Date().toISOString().split('T')[0], message: "" })
        setEditingId(null)
        toast({
          title: "✓ Success",
          description: editingId ? "Donator updated successfully" : "Donator added successfully",
        })
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || errorData.error || 'Failed to save donator')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save donator'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (donator: Donator) => {
    setFormData({
      name: donator.name,
      amount: donator.amount.toString(),
      date: donator.date,
      message: donator.message || ""
    })
    setEditingId(donator.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this donator?')) return

    setLoading(true)
    try {
      const res = await fetch('/api/admin/donators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          action: 'delete',
          id
        })
      })

      if (res.ok) {
        const data = await res.json()
        // Force update the donators list
        if (data.donators && Array.isArray(data.donators)) {
          setDonators([...data.donators])
        } else {
          // Fallback: reload from API
          await loadDonators()
        }
        toast({
          title: "✓ Success",
          description: "Donator deleted successfully",
        })
      } else {
        const errorData = await res.json()
        throw new Error(errorData.message || errorData.error || 'Failed to delete donator')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete donator'
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setFormData({ name: "", amount: "", date: new Date().toISOString().split('T')[0], message: "" })
    setEditingId(null)
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount)
  }

  const formatDate = (dateString: string) => {
    const locale = language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US'
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>

          <Card className="p-8 shadow-lg border-0 bg-card">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">🔐 Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Enter password to access admin panel</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>

              <div className="text-center mt-4">
                <Link href="/" className="text-sm text-primary hover:underline">
                  ← Back to Home
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </main>
    )
  }

  const totalDonations = donators.reduce((sum, d) => sum + d.amount, 0)
  const goal = 9_000_000
  const slipperCost = 45_000
  const totalSlippers = 187
  const slippersFunded = Math.floor(totalDonations / slipperCost)
  const slippersRemaining = totalSlippers - slippersFunded
  const progressPercentage = (totalDonations / goal) * 100

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary to-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">🔐 Admin Panel</h1>
          <p className="text-muted-foreground">Manage donators and donations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 shadow-lg border-0 bg-card">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Total Donations</p>
              <p className="text-3xl font-bold text-primary">{formatAmount(totalDonations)} UZS</p>
              <p className="text-xs text-muted-foreground mt-2">
                {progressPercentage.toFixed(1)}% of {formatAmount(goal)} UZS
              </p>
            </div>
          </Card>
          <Card className="p-6 shadow-lg border-0 bg-card">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Total Donators</p>
              <p className="text-3xl font-bold text-accent">{donators.length}</p>
            </div>
          </Card>
          <Card className="p-6 shadow-lg border-0 bg-card">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">🥿 Slippers Funded</p>
              <p className="text-3xl font-bold text-primary">{slippersFunded}</p>
              <p className="text-xs text-muted-foreground mt-2">
                of {totalSlippers} total
              </p>
            </div>
          </Card>
          <Card className="p-6 shadow-lg border-0 bg-card">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">❄️ Remaining</p>
              <p className="text-3xl font-bold text-accent">{slippersRemaining}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {formatAmount(slippersRemaining * slipperCost)} UZS needed
              </p>
            </div>
          </Card>
        </div>

        {/* Info Alert */}
        <Card className="p-4 mb-8 bg-primary/10 border-primary/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="text-sm font-semibold text-foreground">Auto-Update Enabled</p>
              <p className="text-xs text-muted-foreground mt-1">
                All changes (add/edit/delete) automatically update the collected amount, slippers funded, 
                and progress on the main page. Visitors will see real-time stats!
              </p>
            </div>
          </div>
        </Card>

        {/* Add/Edit Form */}
        <Card className="p-8 shadow-lg border-0 bg-card mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {editingId ? "✏️ Edit Donator" : "➕ Add New Donator"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Donator name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount (UZS) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="45000"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Optional message from donator"
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Saving..." : editingId ? "Update Donator" : "Add Donator"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Donators List */}
        <Card className="p-8 shadow-lg border-0 bg-card">
          <h2 className="text-2xl font-bold text-foreground mb-6">📋 All Donators</h2>

          {donators.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No donators yet</p>
          ) : (
            <div className="space-y-4">
              {donators.map((donator) => (
                <div key={donator.id} className="bg-secondary p-4 rounded-lg border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{donator.name}</h3>
                        <span className="text-xs text-muted-foreground">#{donator.id}</span>
                      </div>
                      {donator.message && (
                        <p className="text-sm text-muted-foreground italic mb-2">"{donator.message}"</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-primary font-bold">{formatAmount(donator.amount)} UZS</span>
                        <span className="text-muted-foreground">{formatDate(donator.date)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(donator)}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(donator.id)}
                      >
                        🗑️ Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}
