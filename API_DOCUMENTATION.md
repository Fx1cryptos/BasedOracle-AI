# Base Oracle API Documentation

## Overview

Base Oracle is a comprehensive AI-powered agent chatbot for the Base blockchain ecosystem. This document outlines all available APIs and their usage.

## Environment Variables

Required environment variables (add to `.env.local`):

```
OPENAI_API_KEY=your_openai_api_key_here
MORALIS_API_KEY=your_moralis_api_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

## API Endpoints

### 1. Chat API
**Endpoint:** `POST /api/chat`

Processes user messages and returns AI responses with support for blockchain context.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "message history" }
  ],
  "userMessage": "current user message"
}
```

**Response:**
```json
{
  "content": "AI response message"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [],
    "userMessage": "What is the current Base network TVL?"
  }'
```

### 2. Wallet Analysis API
**Endpoint:** `POST /api/wallet`

Analyzes wallet holdings, portfolio, and transactions.

**Request:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc922e1B9Efb97"
}
```

**Response:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc922e1B9Efb97",
  "balance": "15234.50",
  "nativeBalance": "2.5",
  "tokens": [...]
}
```

**Requirements:** `MORALIS_API_KEY`

### 3. Token Information API
**Endpoint:** `GET /api/tokens?query=ethereum`

Searches for token information by name or symbol.

**Query Parameters:**
- `query` (required): Token name or symbol

**Response:**
```json
{
  "tokens": [
    {
      "id": "ethereum",
      "name": "Ethereum",
      "symbol": "ETH",
      "image": "url",
      "marketCapRank": 2
    }
  ]
}
```

**Example:**
```bash
curl "http://localhost:3000/api/tokens?query=ethereum"
```

### 4. Social Feeds API
**Endpoint:** `GET /api/social?type=base&limit=10`

Retrieves aggregated social feeds from Twitter/X and Farcaster.

**Query Parameters:**
- `type` (optional): "base", "defi", or "trending" (default: "base")
- `limit` (optional): Number of posts (default: 10)

**Response:**
```json
{
  "feeds": [
    {
      "id": "1",
      "platform": "twitter",
      "author": "author_name",
      "content": "post content",
      "timestamp": "2024-01-09T12:00:00Z",
      "engagement": { "likes": 1500 },
      "url": "https://..."
    }
  ],
  "type": "base"
}
```

**Example:**
```bash
curl "http://localhost:3000/api/social?type=base&limit=5"
```

### 5. Analytics API
**Endpoint:** `GET /api/analytics?metric=tvl`

Retrieves Base network analytics and statistics.

**Query Parameters:**
- `metric` (optional): "tvl", "users", "transactions", or "gasPrice" (default: "tvl")

**Response:**
```json
{
  "metric": "tvl",
  "data": {
    "current": 2140000000,
    "change24h": 5.2,
    "change7d": 12.5,
    "history": [...]
  },
  "timestamp": "2024-01-09T12:00:00Z"
}
```

**Example:**
```bash
curl "http://localhost:3000/api/analytics?metric=tvl"
```

### 6. Voice Processing API
**Endpoint:** `POST /api/voice`

Processes voice input and returns transcription.

**Request:**
```json
{
  "audio": "base64_encoded_audio",
  "language": "en-US"
}
```

**Response:**
```json
{
  "transcription": "what did the user say",
  "confidence": 0.95,
  "language": "en-US",
  "timestamp": "2024-01-09T12:00:00Z"
}
```

## Components

### Core Components

1. **ChatInterface** - Main chat UI with message history
2. **Sidebar** - Navigation and conversation management
3. **Header** - Top navigation and branding
4. **Footer** - Information and links
5. **MessageBubble** - Individual message display

### Blockchain Components

1. **WalletCard** - Displays wallet information
2. **TokenList** - Shows token holdings
3. **WalletConnect** - Wallet connection interface
4. **BlockchainStats** - Network statistics display
5. **Dashboard** - Comprehensive dashboard view

### Social & Info Components

1. **SocialFeed** - Individual social post display
2. **SocialFeedAggregator** - Multi-platform feed aggregation
3. **SocialStats** - Community engagement metrics
4. **TokenSearch** - Token discovery interface
5. **BankrIntegration** - DeFi yield opportunities

### Voice Components

1. **VoiceMode** - Voice recording and transcription
2. **VoiceChat** - Voice-based conversation interface

## Usage Examples

### Example 1: Analyze a Wallet

```typescript
// In your component
const handleWalletAnalysis = async (address: string) => {
  const response = await fetch('/api/wallet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address })
  });
  const data = await response.json();
  // Use data to display wallet information
};
```

### Example 2: Search for Token Information

```typescript
const handleTokenSearch = async (query: string) => {
  const response = await fetch(`/api/tokens?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  // Display token results
};
```

### Example 3: Send Chat Message

```typescript
const handleChat = async (message: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: conversationHistory,
      userMessage: message
    })
  });
  const data = await response.json();
  // Display AI response
};
```

## Features

### 1. AI Chat Agent
- Natural language processing
- Blockchain context awareness
- Multi-turn conversations
- Real-time responses

### 2. Wallet Intelligence
- Portfolio analysis
- Token holdings tracking
- Transaction history
- DeFi protocol interaction tracking

### 3. Social Integration
- Twitter/X feed aggregation
- Farcaster integration
- Community trend tracking
- Engagement metrics

### 4. Token Information
- Real-time token data
- Market information
- Liquidity metrics
- Price history

### 5. Voice Interface
- Speech-to-text transcription
- Voice commands
- Audio responses
- Hands-free interaction

### 6. DeFi Insights
- Yield opportunity tracking
- Bankr protocol integration
- APY comparisons
- Risk assessment

## Deployment

### Using Vercel

1. Clone the repository
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with `vercel deploy`

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Error Handling

All APIs return error responses with appropriate HTTP status codes:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common status codes:
- 400: Bad request (missing parameters)
- 401: Unauthorized (missing API key)
- 404: Not found (resource not found)
- 500: Server error (internal error)

## Rate Limiting

- Chat API: 100 requests per minute
- Wallet API: 50 requests per minute
- Token API: 200 requests per minute
- Analytics API: 100 requests per minute

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/Fx1cryptos/BasedOracle/issues)
- Review the [Base Ecosystem Docs](https://docs.base.org)
- Visit [Bankr Documentation](https://bankr.fi/docs)

## Security

- All API keys should be stored in environment variables
- Use HTTPS for all API calls
- Validate user input before processing
- Implement rate limiting
- Use secure wallet connections

## Future Enhancements

- [ ] Advanced AI model training with blockchain data
- [ ] Multi-wallet portfolio tracking
- [ ] Advanced charting and analytics
- [ ] Real-time price alerts
- [ ] Mobile app
- [ ] Browser extension
- [ ] Discord/Telegram bot integration
