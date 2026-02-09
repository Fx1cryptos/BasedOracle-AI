'use client'

import { Button } from '@/components/ui/button'
import { Wallet, Settings } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src="https://blob.8004scan.app/ae6661ea5f6c31c764a08602269398691465ffd3d5b95441c2da36d74eba458d.jpg"
          alt="Base Oracle"
          className="w-8 h-8 rounded"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-900">Base Oracle</h2>
          <p className="text-xs text-gray-500">AI Intelligence for Base</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="gap-2 rounded-lg border-gray-300"
          title="Analyze My Wallet"
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden sm:inline">Analyze Wallet</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg hover:bg-gray-100"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
