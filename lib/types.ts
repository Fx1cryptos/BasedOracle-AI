// Chat Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Blockchain Types
export interface WalletData {
  address: string
  balance: string
  nftCount: number
  portfolioValue: number
  transactions: Transaction[]
}

export interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  timestamp: Date
  status: 'success' | 'failed'
}

// Token Types
export interface TokenInfo {
  address: string
  name: string
  symbol: string
  decimals: number
  totalSupply: string
  price: number
  marketCap: number
  volume24h: number
}

export interface NFTCollection {
  contractAddress: string
  name: string
  symbol: string
  floorPrice: number
  volume24h: number
  totalItems: number
  totalOwners: number
}

// Social Types
export interface Tweet {
  id: string
  author: string
  handle: string
  content: string
  timestamp: Date
  likes: number
  retweets: number
  replies: number
  link: string
}

export interface FarcasterPost {
  hash: string
  author: string
  text: string
  timestamp: Date
  likes: number
  recasts: number
  replies: number
}

// Analytics Types
export interface BlockchainStats {
  totalTransactions: number
  activeAddresses: number
  totalVolume: string
  topProtocols: Protocol[]
  gasStats: GasStats
}

export interface Protocol {
  name: string
  tvl: number
  volume24h: number
  users: number
}

export interface GasStats {
  standard: number
  fast: number
  instantaneous: number
  base: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  timestamp: string
}

export interface ChatApiRequest {
  messages: ChatMessage[]
  userMessage: string
}

export interface ChatApiResponse {
  content: string
  timestamp: string
  error?: string
}
