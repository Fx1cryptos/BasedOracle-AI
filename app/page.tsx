'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { ChatInterface } from '@/components/ChatInterface'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
  const handleNavigate = (prompt: string) => {
    // Trigger chat with specific prompt via the ChatInterface
    const event = new CustomEvent('sendPrompt', { detail: prompt })
    window.dispatchEvent(event)
  }

  const handleNewChat = () => {
    // Reset chat state by dispatching event
    const event = new CustomEvent('newChat')
    window.dispatchEvent(event)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <Sidebar onNavigate={handleNavigate} onNewChat={handleNewChat} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header />

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
