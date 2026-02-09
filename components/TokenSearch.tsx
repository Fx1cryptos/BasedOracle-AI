'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Search, ExternalLink } from 'lucide-react'

interface Token {
  id: string
  name: string
  symbol: string
  image: string
  marketCapRank?: number
}

interface TokenSearchProps {
  onSelectToken?: (token: Token) => void
}

export function TokenSearch({ onSelectToken }: TokenSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query.trim()) return

    try {
      setLoading(true)
      const response = await fetch(`/api/tokens?query=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()
      setResults(data.tokens)
      setSearched(true)
    } catch (error) {
      console.error('[v0] Token search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const popularTokens = [
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'DAI', name: 'Dai' },
    { symbol: 'USDT', name: 'Tether' },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Token Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search tokens (ETH, USDC, DAI...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <Button
            type="submit"
            disabled={!query.trim() || loading}
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </form>

        {/* Popular Tokens */}
        {!searched && (
          <div className="space-y-2 pt-4 border-t">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Popular Tokens
            </p>
            <div className="grid grid-cols-2 gap-2">
              {popularTokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setQuery(token.symbol)
                    setSearched(false)
                  }}
                  className="p-2 text-left bg-secondary hover:bg-secondary/70 rounded text-sm transition-colors"
                >
                  <p className="font-semibold">{token.symbol}</p>
                  <p className="text-xs text-muted-foreground truncate">{token.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searched && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            ) : results.length > 0 ? (
              results.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {token.image && (
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {token.symbol.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {token.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {token.marketCapRank && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                        #{token.marketCapRank}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectToken?.(token)}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No tokens found</p>
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 p-3 rounded-lg space-y-2 pt-4 border-t">
          <p className="text-xs font-semibold text-blue-900">Token Details Available</p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>✓ Market cap and ranking</li>
            <li>✓ Trading volume and liquidity</li>
            <li>✓ Price history and charts</li>
            <li>✓ Contract information</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
