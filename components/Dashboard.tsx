'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WalletCard } from './WalletCard'
import { TokenList } from './TokenList'
import { SocialFeed } from './SocialFeed'
import { AnalyticsCard } from './AnalyticsCard'
import { Loader2 } from 'lucide-react'

interface DashboardProps {
  walletAddress?: string
}

export function Dashboard({ walletAddress }: DashboardProps) {
  const [loading, setLoading] = useState(true)
  const [walletData, setWalletData] = useState<any>(null)
  const [socialFeeds, setSocialFeeds] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch analytics
        const analyticsRes = await fetch('/api/analytics?metric=tvl')
        if (analyticsRes.ok) {
          const analyticsData = await analyticsRes.json()
          setAnalytics(analyticsData.data)
        }

        // Fetch social feeds
        const socialRes = await fetch('/api/social?type=base&limit=5')
        if (socialRes.ok) {
          const socialData = await socialRes.json()
          setSocialFeeds(socialData.feeds)
        }

        // Fetch wallet data if address provided
        if (walletAddress) {
          const walletRes = await fetch('/api/wallet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: walletAddress }),
          })

          if (walletRes.ok) {
            const wallet = await walletRes.json()
            setWalletData(wallet)
          }
        }
      } catch (err) {
        console.error('[v0] Dashboard error:', err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [walletAddress])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      {error && (
        <div className="bg-destructive/20 text-destructive p-4 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Analytics Section */}
      {analytics && (
        <AnalyticsCard
          title="Base Network Analytics"
          metrics={[
            {
              label: 'Total Value Locked',
              value: `$${(analytics.current / 1e9).toFixed(1)}B`,
              change24h: analytics.change24h,
            },
            {
              label: '24h Change',
              value: `${analytics.change24h > 0 ? '+' : ''}${analytics.change24h.toFixed(1)}%`,
              trend: analytics.change24h > 0 ? 'up' : 'down',
            },
            {
              label: '7d Change',
              value: `${analytics.change7d > 0 ? '+' : ''}${analytics.change7d.toFixed(1)}%`,
              trend: analytics.change7d > 0 ? 'up' : 'down',
            },
            {
              label: 'Network Status',
              value: 'Healthy',
              unit: '✓',
            },
          ]}
        />
      )}

      {/* Wallet Section */}
      {walletData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WalletCard
            address={walletData.address}
            balance={walletData.balance}
            nativeBalance={walletData.nativeBalance}
            tokenCount={walletData.tokens?.length || 0}
          />
          {walletData.tokens && walletData.tokens.length > 0 && (
            <TokenList
              tokens={walletData.tokens.slice(0, 10).map((token: any) => ({
                id: token.token_address,
                name: token.name,
                symbol: token.symbol,
                balance: token.balance,
                image: token.thumbnail,
              }))}
              title="Top Holdings"
            />
          )}
        </div>
      )}

      {/* Social Feeds Section */}
      {socialFeeds.length > 0 && (
        <SocialFeed posts={socialFeeds} title="Base Community News" />
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-xs text-muted-foreground">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">15M+</p>
            <p className="text-xs text-green-600">↑ 8.5% today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-xs text-muted-foreground">Active Addresses</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">450K</p>
            <p className="text-xs text-green-600">↑ 3.2% today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-xs text-muted-foreground">Avg Gas Price</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">15 Gwei</p>
            <p className="text-xs text-red-600">↓ 5.2% today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-xs text-muted-foreground">Ecosystem dApps</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-xs text-muted-foreground">Growing</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
