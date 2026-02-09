'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, TrendingUp, Zap, Lock, DollarSign } from 'lucide-react'

interface BankrService {
  name: string
  description: string
  apy: number
  risk: 'low' | 'medium' | 'high'
  tvl: number
  icon: React.ReactNode
}

export function BankrIntegration() {
  const [selectedService, setSelectedService] = useState<BankrService | null>(null)

  const services: BankrService[] = [
    {
      name: 'Base Savings',
      description: 'Earn yield on stablecoins',
      apy: 4.8,
      risk: 'low',
      tvl: 245000000,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      name: 'ETH Staking',
      description: 'Stake ETH for rewards',
      apy: 3.2,
      risk: 'low',
      tvl: 580000000,
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      name: 'Liquidity Pools',
      description: 'Provide liquidity, earn fees',
      apy: 12.5,
      risk: 'medium',
      tvl: 420000000,
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: 'DeFi Strategies',
      description: 'Automated yield farming',
      apy: 18.2,
      risk: 'high',
      tvl: 180000000,
      icon: <Lock className="w-5 h-5" />,
    },
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Bankr Integration</span>
          <Badge variant="outline">DeFi Yield</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              onClick={() => setSelectedService(service)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedService?.name === service.name
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-primary">{service.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">APY</span>
                  <span className="font-bold text-sm text-green-600">
                    {service.apy}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Risk</span>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getRiskColor(service.risk)}`}
                  >
                    {service.risk.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">TVL</span>
                  <span className="text-xs font-mono">
                    ${(service.tvl / 1e6).toFixed(0)}M
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Service Details */}
        {selectedService && (
          <div className="border-t pt-4 space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold">{selectedService.name} Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-2 bg-secondary/30 rounded">
                  <p className="text-xs text-muted-foreground">Current APY</p>
                  <p className="font-bold text-green-600">
                    {selectedService.apy}%
                  </p>
                </div>
                <div className="p-2 bg-secondary/30 rounded">
                  <p className="text-xs text-muted-foreground">Protocol Risk</p>
                  <p
                    className={`font-bold ${
                      selectedService.risk === 'low'
                        ? 'text-green-600'
                        : selectedService.risk === 'medium'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {selectedService.risk.toUpperCase()}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Total Value Locked: ${(selectedService.tvl / 1e9).toFixed(2)}B
              </p>

              <div className="bg-blue-50 p-3 rounded space-y-1">
                <p className="text-xs font-semibold text-blue-900">How it works</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Deposit your assets into the protocol</li>
                  <li>• Earn yield automatically</li>
                  <li>• Withdraw anytime without penalties</li>
                  <li>• 24/7 monitoring and optimization</li>
                </ul>
              </div>
            </div>

            <Button className="w-full gap-2 bg-gradient-to-r from-primary to-accent">
              <ExternalLink className="w-4 h-4" />
              Explore {selectedService.name}
            </Button>
          </div>
        )}

        {/* Bankr CTA */}
        <div className="border-t pt-4">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg space-y-2">
            <p className="font-semibold text-sm">Powered by Bankr</p>
            <p className="text-xs text-muted-foreground">
              Discover verified DeFi yield strategies optimized for Base network
            </p>
            <a
              href="https://bankr.fi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
            >
              Visit Bankr <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
