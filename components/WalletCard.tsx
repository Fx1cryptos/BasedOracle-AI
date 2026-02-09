'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, ExternalLink } from 'lucide-react';

interface WalletCardProps {
  address: string;
  balance: string;
  nativeBalance?: string;
  tokenCount?: number;
}

export function WalletCard({
  address,
  balance,
  nativeBalance,
  tokenCount,
}: WalletCardProps) {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Wallet Info</span>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(address)}
              className="p-1 hover:bg-secondary rounded"
              title="Copy address"
            >
              <Copy className="w-4 h-4" />
            </button>
            <a
              href={`https://basescan.org/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-secondary rounded"
              title="View on BaseScan"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Address</p>
          <p className="font-mono text-sm">{shortAddress}</p>
        </div>
        {nativeBalance && (
          <div>
            <p className="text-sm text-muted-foreground">ETH Balance</p>
            <p className="text-lg font-semibold">{nativeBalance} ETH</p>
          </div>
        )}
        {balance && (
          <div>
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-lg font-semibold">${balance}</p>
          </div>
        )}
        {tokenCount !== undefined && (
          <div>
            <p className="text-sm text-muted-foreground">Tokens Held</p>
            <p className="text-lg font-semibold">{tokenCount}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
