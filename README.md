# Base Oracle - AI Agent Chatbot

A production-ready AI-powered chatbot for the Base blockchain ecosystem. Base Oracle provides intelligent conversational AI with real-time blockchain analytics, wallet intelligence, DeFi insights, social integration, and voice-enabled interaction.

**Built with:** Next.js 16 • React 19 • TypeScript • Tailwind CSS • AI SDK • Vercel

---

## Features

### Core AI Features
- **Conversational AI Agent** - GPT-powered responses with blockchain context awareness
- **Natural Language Processing** - Understands crypto/DeFi terminology
- **Multi-turn Conversations** - Maintains conversation history and context
- **Real-time Responses** - Streaming responses for better UX

### Blockchain & Wallet
- **Wallet Analysis** - View balances, token holdings, transaction history
- **Portfolio Tracking** - Monitor multiple wallets and assets
- **DeFi Integration** - Bankr protocol for yield opportunities
- **On-chain Analytics** - Base network statistics in real-time

### Social & Community
- **Social Feed Aggregation** - Twitter/X and Farcaster feeds
- **Community Insights** - Trending topics and discussions
- **Engagement Metrics** - Track community activity
- **News Integration** - Latest Base ecosystem updates

### Token Intelligence
- **Token Search** - Discover and research tokens
- **Market Data** - Price, volume, and liquidity information
- **Top Charts** - Trending and top-performing tokens

### Voice & Accessibility
- **Voice Commands** - Hands-free interaction
- **Speech-to-Text** - Convert voice to text
- **Voice Responses** - AI responses spoken aloud
- **Voice Mode UI** - Dedicated voice interface

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn
- OpenAI API key

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Fx1cryptos/BasedOracle.git
cd BasedOracle
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env.local
```

Add your API keys:
```env
OPENAI_API_KEY=sk_your_key_here
MORALIS_API_KEY=your_moralis_key
ALCHEMY_API_KEY=your_alchemy_key
```

4. **Start development server:**
```bash
npm run dev
```

5. **Open in browser:**
```
http://localhost:3000
```

---

## Usage Examples

### Chat Interface
Ask the AI agent about Base ecosystem:
```
"What is the current Base network TVL?"
"Show me trending tokens on Base"
"Analyze wallet 0x742d35Cc6634C0532925a3b844Bc922e1B9Efb97"
"What are the latest Farcaster discussions about Base?"
```

### Wallet Analysis
```
1. Click "Wallet Intelligence" in sidebar
2. Enter a Base wallet address
3. View holdings, portfolio value, and DeFi positions
```

### Token Discovery
```
1. Click "Token Info" 
2. Search for any token
3. View market data and trading information
```

### Voice Mode
```
1. Click voice icon
2. Say your question
3. Get real-time voice response
```

---

## API Endpoints

All API endpoints are documented in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Available Endpoints:
- `POST /api/chat` - AI conversational endpoint
- `POST /api/wallet` - Wallet analysis
- `GET /api/tokens` - Token information
- `GET /api/social` - Social feeds
- `GET /api/analytics` - Network analytics
- `POST /api/voice` - Voice processing

---

## Project Structure

```
Base Oracle/
├── app/
│   ├── api/                    # API Routes
│   │   ├── chat/route.ts       # AI Chat endpoint
│   │   ├── wallet/route.ts     # Wallet analysis
│   │   ├── tokens/route.ts     # Token search
│   │   ├── social/route.ts     # Social feeds
│   │   ├── analytics/route.ts  # Network stats
│   │   └── voice/route.ts      # Voice processing
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles
├── components/                 # React Components
│   ├── ChatInterface.tsx       # Main chat UI
│   ├── Sidebar.tsx             # Navigation
│   ├── Header.tsx              # Top bar
│   ├── Footer.tsx              # Bottom bar
│   ├── MessageBubble.tsx       # Chat messages
│   ├── WalletCard.tsx          # Wallet display
│   ├── TokenList.tsx           # Token listing
│   ├── SocialFeed.tsx          # Social posts
│   ├── SocialFeedAggregator.tsx # Multi-feed
│   ├── BlockchainStats.tsx     # Network stats
│   ├── Dashboard.tsx           # Analytics dashboard
│   ├── TokenSearch.tsx         # Token discovery
│   ├── BankrIntegration.tsx    # DeFi yields
│   ├── VoiceMode.tsx           # Voice input
│   ├── VoiceChat.tsx           # Voice interface
│   ├── WalletConnect.tsx       # Connect wallet
│   └── AnalyticsCard.tsx       # Stats display
├── lib/
│   ├── types.ts                # TypeScript types
│   ├── api.ts                  # API utilities
│   └── utils.ts                # Helper functions
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
├── API_DOCUMENTATION.md        # API reference
└── README.md                   # This file
```

---

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Lucide Icons** - Icon set

### Backend & AI
- **Next.js API Routes** - Backend endpoints
- **OpenAI API** - GPT models
- **AI SDK** - Streamlined AI integration
- **Vercel AI Gateway** - API routing

### Data & Blockchain
- **Moralis API** - Wallet and blockchain data
- **Alchemy API** - On-chain data
- **CoinGecko API** - Token information
- **Web Speech API** - Voice interaction

### Deployment
- **Vercel** - Recommended hosting
- **Docker** - Containerization
- **Node.js** - Runtime

---

## Environment Variables

Required for all features to work:

```env
# AI
OPENAI_API_KEY=sk_...              # Required for chat

# Blockchain (Optional but recommended)
MORALIS_API_KEY=your_key           # Wallet analysis
ALCHEMY_API_KEY=your_key           # On-chain data

# Advanced (Optional)
ANTHROPIC_API_KEY=sk_ant_...       # Alternative AI
```

---

## Deployment

### Deploy to Vercel (1-click)

```bash
vercel deploy
```

Then add environment variables in Vercel dashboard.

### Deploy with Docker

```bash
docker build -t base-oracle .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk_... \
  base-oracle
```

### Deploy to Other Platforms

Works with any Node.js hosting:
- Railway
- Render  
- Heroku
- AWS
- Google Cloud
- Azure

---

## Configuration

### Customize AI Behavior
Edit `/app/api/chat/route.ts` to modify:
- System prompt
- Temperature/creativity
- Context window
- Response format

### Customize Styling
Edit `/app/globals.css` and `/tailwind.config.ts`:
- Color scheme
- Typography
- Spacing
- Animations

### Add New Features
1. Create API route in `/app/api`
2. Create component in `/components`
3. Update sidebar navigation
4. Document in API_DOCUMENTATION.md

---

## Performance

- Message pagination
- Analytics caching (30s)
- Social feed auto-refresh (1m)
- Image optimization
- Code splitting enabled
- Streaming responses

---

## Security

- API keys in environment variables only
- Input validation on all endpoints
- Rate limiting per endpoint
- CORS configured
- HTTPS enforced in production
- No client-side secrets

---

## Troubleshooting

### Chat Not Working
```
✓ Check OPENAI_API_KEY is set
✓ Verify API key has credits
✓ Check rate limits
✓ Review browser console
```

### Wallet Data Missing
```
✓ Add MORALIS_API_KEY
✓ Verify wallet address format (0x...)
✓ Check address is on Base
```

### Voice Not Working
```
✓ Enable microphone permissions
✓ Use Chrome, Edge, or Firefox
✓ Check speaker/headphones
```

---

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

---

## Support

- **Docs** - See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Issues** - GitHub Issues
- **Community** - Base Discord
- **Twitter** - @BaseOracle

---

## Roadmap

- [ ] Advanced analytics dashboard
- [ ] Real-time price charts
- [ ] Trading signals
- [ ] Mobile app
- [ ] Browser extension
- [ ] Discord bot
- [ ] Cross-chain support
- [ ] Advanced AI models

---

## License

MIT - Free for personal and commercial use

---

## Disclaimer

**For informational purposes only.** Not financial advice. Always do your own research before investing.

---

Built with ❤️ for the Base ecosystem | [Base Docs](https://docs.base.org)
