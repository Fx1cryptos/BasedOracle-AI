'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { ChatInterface } from '@/components/ChatInterface'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Navigation */}
      <Sidebar />

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
