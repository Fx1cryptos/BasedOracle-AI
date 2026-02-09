'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, TrendingUp } from 'lucide-react'

interface BlockchainStatsProps {
  metric?: 'tvl' | 'users' | 'transactions' | 'gasPrice'
}

export function BlockchainStats({ metric = 'tvl' }: BlockchainStatsProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/analytics?metric=${metric}`)
        if (!response.ok) throw new Error('Failed to fetch stats')

        const result = await response.json()
        setData(result.data)
        setError(null)
      } catch (err) {
        console.error('[v0] Stats error:', err)
        setError('Failed to load statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [metric])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Base Network Statistics</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-32">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Base Network Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  const formatValue = (value: number | string): string => {
    if (typeof value === 'string') return value
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`
    return value.toString()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Base Network Statistics</span>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Metric */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground uppercase font-semibold">
            {metric === 'tvl'
              ? 'Total Value Locked'
              : metric === 'users'
              ? 'Active Users'
              : metric === 'transactions'
              ? 'Total Transactions'
              : 'Average Gas Price'}
          </p>
          <div className="flex items-baseline gap-4">
            <p className="text-4xl font-bold">
              {formatValue(data.current)}
            </p>
            {data.change24h && (
              <div className="space-y-1">
                <p
                  className={`text-sm font-semibold ${
                    data.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {data.change24h >= 0 ? '+' : ''}{data.change24h.toFixed(2)}%
                </p>
                <p className="text-xs text-muted-foreground">24h change</p>
              </div>
            )}
          </div>
        </div>

        {/* 7 Day Change */}
        {data.change7d && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">7 Day Change</p>
              <p
                className={`text-lg font-semibold ${
                  data.change7d >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {data.change7d >= 0 ? '+' : ''}{data.change7d.toFixed(2)}%
              </p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className="text-lg font-semibold text-primary">Healthy</p>
            </div>
          </div>
        )}

        {/* History Chart Placeholder */}
        {data.history && data.history.length > 0 && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-xs text-muted-foreground font-semibold">Historical Data</p>
            <div className="space-y-1">
              {data.history.map((point: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{point.date}</span>
                  <span className="font-mono">{formatValue(point.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unit */}
        {data.unit && (
          <p className="text-xs text-muted-foreground pt-2 border-t">
            Unit: <span className="font-mono">{data.unit}</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
