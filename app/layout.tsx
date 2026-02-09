import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Base Oracle - AI Agent for Base Blockchain',
  description: 'Professional AI intelligence agent for the Base ecosystem. Real-time onchain analytics, wallet intelligence, and blockchain insights powered by Base.',
  keywords: ['Base', 'blockchain', 'AI', 'agent', 'analytics', 'Web3', 'crypto'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  other: {
    'base:app_id': '69401eb7d19763ca26ddc30c',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  )
}
