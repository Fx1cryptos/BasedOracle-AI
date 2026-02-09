'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Wallet,
  Gem,
  DollarSign,
  Radio,
  FileText,
  Mic,
  ExternalLink,
  Plus,
  Menu,
  X,
  MessageSquare,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'

const navigationItems = [
  { icon: BarChart3, label: 'Dashboard', prompt: 'Show me a Base ecosystem overview' },
  { icon: BarChart3, label: 'Onchain Analytics', prompt: 'Analyze Base blockchain activity' },
  { icon: Wallet, label: 'Wallet Intelligence', prompt: 'Analyze my wallet' },
  { icon: Gem, label: 'Unclaimed Airdrops', prompt: 'Check unclaimed airdrops' },
  { icon: Gem, label: 'NFTs & Creator Coins', prompt: 'Show NFT trends on Base' },
  { icon: Radio, label: 'Social Feeds', prompt: 'Show latest Base community posts' },
  { icon: DollarSign, label: 'Token Info', prompt: 'Tell me about $BASEDORACLE' },
  { icon: FileText, label: 'Docs & Links', prompt: 'Show documentation links' },
  { icon: Mic, label: 'Voice Mode', prompt: 'Enable voice chat' },
]

interface SidebarProps {
  onNavigate?: (prompt: string) => void
  onNewChat?: () => void
}

interface Conversation {
  id: string
  title: string
  timestamp: Date
}

export function Sidebar({ onNavigate, onNewChat }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', title: 'Base Analytics Overview', timestamp: new Date(Date.now() - 3600000) },
    { id: '2', title: 'Wallet Performance Check', timestamp: new Date(Date.now() - 7200000) },
  ])

  const handleNavigate = (prompt: string) => {
    onNavigate?.(prompt)
    setIsMobileOpen(false)
  }

  const handleNewChat = () => {
    onNewChat?.()
    setIsMobileOpen(false)
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(conversations.filter(c => c.id !== id))
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto z-30 transform transition-transform lg:transform-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">BO</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Base Oracle</h1>
              <p className="text-xs text-gray-500">Powered by Base</p>
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200">
          <Button
            onClick={handleNewChat}
            className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </Button>
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto p-4 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">Recent Conversations</p>
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="group flex items-start gap-2 p-2 rounded-lg hover:bg-secondary text-left text-sm text-gray-700 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium">{conv.title}</p>
                  <p className="text-xs text-gray-500">
                    {conv.timestamp.toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteConversation(conv.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 className="w-3 h-3 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200 space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase">Quick Actions</p>
          <div className="space-y-1">
            {navigationItems.slice(0, 6).map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-xs text-gray-700 hover:bg-primary/10 hover:text-primary"
                onClick={() => handleNavigate(item.prompt)}
              >
                <item.icon className="w-3 h-3" />
                <span className="truncate">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <Link
            href="https://base.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="w-full gap-2">
              <ExternalLink className="w-4 h-4" />
              Base Ecosystem
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
