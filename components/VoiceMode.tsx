'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mic, MicOff, Volume2, Loader2, Send } from 'lucide-react'

interface VoiceModeProps {
  onTranscription?: (text: string) => void
}

export function VoiceMode({ onTranscription }: VoiceModeProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          setError(null)
        }

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              setTranscript(transcript)
              onTranscription?.(transcript)
            } else {
              interimTranscript += transcript
            }
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('[v0] Speech recognition error:', event.error)
          setError(`Error: ${event.error}`)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [onTranscription])

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthesisRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Voice Mode
          </span>
          <Badge variant={isListening ? 'default' : 'outline'}>
            {isListening ? 'Listening' : 'Ready'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Control Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`flex-1 gap-2 ${
              isListening
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gradient-to-r from-primary to-accent'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                Start Recording
              </>
            )}
          </Button>

          <Button
            onClick={isSpeaking ? stopSpeaking : () => speak('How can I help you today?')}
            variant="outline"
            className="gap-2"
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-4 h-4" />
                Stop
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                Speak
              </>
            )}
          </Button>
        </div>

        {/* Visualizer */}
        {isListening && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-1 h-12 bg-secondary/30 rounded-lg">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-full bg-primary rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0.3 + i * 0.15,
                  }}
                />
              ))}
            </div>
            <p className="text-center text-sm font-medium">Listening...</p>
          </div>
        )}

        {/* Transcript Display */}
        {transcript && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Transcription</label>
            <div className="p-3 bg-secondary/30 rounded-lg">
              <p className="text-sm">{transcript}</p>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => onTranscription?.(transcript)}
                  className="gap-2"
                >
                  <Send className="w-3 h-3" />
                  Send
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setTranscript('')}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/20 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Browser Support Info */}
        {!recognitionRef.current && (
          <div className="bg-yellow-50 p-3 rounded-lg space-y-2">
            <p className="text-xs font-semibold text-yellow-900">
              Browser Support
            </p>
            <p className="text-xs text-yellow-800">
              Speech recognition requires Chrome, Edge, Safari, or Firefox.
              Please enable microphone permissions.
            </p>
          </div>
        )}

        {/* Voice Features */}
        <div className="border-t pt-4 space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase">
            Voice Commands
          </p>
          <div className="space-y-2 text-xs">
            {[
              'Analyze my wallet',
              'Show Base analytics',
              'Token information',
              'Social feeds',
            ].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setTranscript(cmd)
                  onTranscription?.(cmd)
                }}
                className="w-full text-left p-2 hover:bg-secondary rounded transition-colors"
              >
                <span className="text-muted-foreground">Say: </span>
                <span className="font-medium">{cmd}</span>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
