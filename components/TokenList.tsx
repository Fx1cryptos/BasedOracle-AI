'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Token {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  marketCapRank?: number;
  balance?: string;
  value?: string;
}

interface TokenListProps {
  tokens: Token[];
  title?: string;
}

export function TokenList({ tokens, title = 'Tokens' }: TokenListProps) {
  if (!tokens || tokens.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No tokens found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-2 hover:bg-secondary rounded"
            >
              <div className="flex items-center gap-3">
                {token.image && (
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{token.symbol.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                {token.balance && (
                  <p className="font-medium text-sm">{token.balance}</p>
                )}
                {token.value && (
                  <p className="text-xs text-muted-foreground">${token.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
