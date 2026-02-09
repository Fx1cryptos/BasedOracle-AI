'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, ExternalLink, Copy, Check } from 'lucide-react'

interface WalletConnectProps {
  onConnect?: (address: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [address, setAddress] = useState('')
  const [copied, setCopied] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (!address.trim()) return

    // Validate Ethereum address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      alert('Please enter a valid Ethereum address')
      return
    }

    setIsConnecting(true)
    try {
      // Test API call
      const response = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      if (response.ok) {
        onConnect?.(address)
      } else {
        alert('Failed to connect wallet')
      }
    } catch (error) {
      console.error('[v0] Wallet connect error:', error)
      alert('Error connecting wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exampleAddresses = [
    '0x742d35Cc6634C0532925a3b844Bc922e1B9Efb97',
    '0x1111111254fb6c44bac0bed2854e76f90643097d',
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Wallet Address</label>
          <div className="flex gap-2">
            <Input
              placeholder="0x742d35Cc6634C0532925a3b844Bc922e1B9Efb97"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 font-mono text-sm"
            />
            <Button
              onClick={copyAddress}
              variant="outline"
              size="icon"
              title="Copy address"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <Button
          onClick={handleConnect}
          disabled={!address.trim() || isConnecting}
          className="w-full bg-gradient-to-r from-primary to-accent"
        >
          {isConnecting ? 'Connecting...' : 'Analyze Wallet'}
        </Button>

        <div className="border-t pt-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Quick Examples</p>
          <div className="space-y-2">
            {exampleAddresses.map((addr) => (
              <button
                key={addr}
                onClick={() => setAddress(addr)}
                className="w-full text-left p-2 text-xs bg-secondary hover:bg-secondary/70 rounded font-mono truncate transition-colors"
              >
                {addr}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg space-y-2">
          <p className="text-xs font-semibold text-blue-900">About Wallet Analysis</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>✓ Token holdings and portfolio value</li>
            <li>✓ Transaction history and patterns</li>
            <li>✓ DeFi protocol interactions</li>
            <li>✓ Risk assessment and alerts</li>
          </ul>
        </div>

        <a
          href="https://basescan.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-primary hover:underline"
        >
          View on BaseScan
          <ExternalLink className="w-3 h-3" />
        </a>
      </CardContent>
    </Card>
  )
}
