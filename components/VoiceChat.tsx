'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VoiceMode } from './VoiceMode'
import { MessageBubble } from './MessageBubble'
import { Badge } from '@/components/ui/badge'
import { Volume2, Send, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function VoiceChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  const handleTranscription = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)

    try {
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          userMessage: text,
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || 'I could not process that request.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Speak the response if voice enabled
      if (voiceEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.content)
        utterance.rate = 1
        utterance.pitch = 1
        window.speechSynthesis.speak(utterance)
      }
    } catch (error) {
      console.error('[v0] Voice chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Voice Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Voice Conversation
            </span>
            <Button
              size="sm"
              variant={voiceEnabled ? 'default' : 'outline'}
              onClick={() => setVoiceEnabled(!voiceEnabled)}
            >
              {voiceEnabled ? 'Voice On' : 'Voice Off'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VoiceMode onTranscription={handleTranscription} />
        </CardContent>
      </Card>

      {/* Chat History */}
      {messages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))}

            {isProcessing && (
              <MessageBubble
                content=""
                role="assistant"
                isLoading={true}
              />
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Info */}
      <div className="bg-blue-50 p-4 rounded-lg space-y-2">
        <p className="text-sm font-semibold text-blue-900">Voice Mode Features</p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Hands-free interaction with Base Oracle</li>
          <li>✓ Automatic speech-to-text transcription</li>
          <li>✓ Real-time voice responses</li>
          <li>✓ Compatible with all chat commands</li>
        </ul>
      </div>
    </div>
  )
}
