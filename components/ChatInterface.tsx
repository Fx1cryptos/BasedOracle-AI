'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'
import { MessageBubble } from './MessageBubble'

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content:
          "I'm Base Oracle, your intelligent AI agent for the Base blockchain ecosystem. I can help you with:\n\n- **Onchain Analytics** - Real-time blockchain data and insights\n- **Wallet Intelligence** - Analyze wallets and portfolio performance\n- **DeFi Insights** - Track protocols, yields, and opportunities\n- **NFT Intelligence** - Monitor collections and trends\n- **Social Feeds** - Latest updates from Base community\n\nWhat would you like to explore?",
      },
    ],
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            role={message.role}
            isLoading={false}
          />
        ))}

        {isLoading && (
          <MessageBubble
            content=""
            role="assistant"
            isLoading={true}
          />
        )}

        {error && (
          <div className="flex justify-start mb-4">
            <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg bg-destructive/20 text-destructive">
              <p className="text-sm">Error: {error.message}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="text"
            placeholder="Ask me about Base analytics, wallets, DeFi, NFTs, or social trends..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1 rounded-full"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full w-10 h-10 p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
