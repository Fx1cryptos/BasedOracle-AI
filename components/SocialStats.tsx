'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, MessageSquare, Heart, Share2 } from 'lucide-react'

interface SocialStatsProps {
  communitySize?: number
  activeContributors?: number
  engagementRate?: number
  weeklyPosts?: number
}

export function SocialStats({
  communitySize = 45000,
  activeContributors = 2300,
  engagementRate = 4.2,
  weeklyPosts = 8500,
}: SocialStatsProps) {
  const stats = [
    {
      icon: Users,
      label: 'Community Members',
      value: communitySize.toLocaleString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: MessageSquare,
      label: 'Active Contributors',
      value: activeContributors.toLocaleString(),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Heart,
      label: 'Engagement Rate',
      value: `${engagementRate.toFixed(1)}%`,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Share2,
      label: 'Weekly Posts',
      value: `${(weeklyPosts / 1000).toFixed(1)}K`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
