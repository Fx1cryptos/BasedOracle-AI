'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SocialFeed } from './SocialFeed'
import { Loader2 } from 'lucide-react'

interface Feed {
  id: string
  platform: 'twitter' | 'farcaster'
  author: string
  content: string
  timestamp: string
  engagement: {
    likes: number
    retweets?: number
  }
  url: string
}

interface SocialFeedAggregatorProps {
  defaultType?: 'base' | 'defi' | 'trending'
}

export function SocialFeedAggregator({
  defaultType = 'base',
}: SocialFeedAggregatorProps) {
  const [feeds, setFeeds] = useState<Record<string, Feed[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(defaultType)

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        setLoading(true)
        setError(null)

        const types = ['base', 'defi', 'trending']
        const allFeeds: Record<string, Feed[]> = {}

        for (const type of types) {
          const response = await fetch(`/api/social?type=${type}&limit=10`)
          if (response.ok) {
            const data = await response.json()
            allFeeds[type] = data.feeds
          }
        }

        setFeeds(allFeeds)
      } catch (err) {
        console.error('[v0] Social feeds error:', err)
        setError('Failed to load social feeds')
      } finally {
        setLoading(false)
      }
    }

    fetchFeeds()
    const interval = setInterval(fetchFeeds, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [])

  if (loading && Object.keys(feeds).length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Community Updates</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading feeds...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Community Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Community Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="base" className="flex items-center gap-2">
              <span className="hidden sm:inline">Base</span>
              <span className="sm:hidden">Base</span>
            </TabsTrigger>
            <TabsTrigger value="defi" className="flex items-center gap-2">
              <span className="hidden sm:inline">DeFi</span>
              <span className="sm:hidden">DeFi</span>
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center gap-2">
              <span className="hidden sm:inline">Trending</span>
              <span className="sm:hidden">Trending</span>
            </TabsTrigger>
          </TabsList>

          {(['base', 'defi', 'trending'] as const).map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              {feeds[type] && feeds[type].length > 0 ? (
                <SocialFeed
                  posts={feeds[type]}
                  title={`${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } News & Updates`}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    No posts available for {type}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
