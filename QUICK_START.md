# Base Oracle - Quick Start Guide

Get Base Oracle running in 5 minutes.

---

## 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/Fx1cryptos/BasedOracle.git
cd BasedOracle

# Install dependencies
npm install
```

---

## 2. Get API Keys (2 minutes)

### OpenAI API Key (Required)
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key

### Moralis API Key (Recommended)
1. Go to [moralis.io](https://moralis.io)
2. Sign up
3. Create new API key
4. Copy the key

### Alchemy API Key (Optional)
1. Go to [alchemy.com](https://alchemy.com)
2. Sign up
3. Create Base network app
4. Copy API key

---

## 3. Configure Environment (1 minute)

```bash
# Create .env.local
cp .env.example .env.local
```

Edit `.env.local`:
```env
OPENAI_API_KEY=sk_your_key_here
MORALIS_API_KEY=your_key_here
ALCHEMY_API_KEY=your_key_here
```

---

## 4. Run Locally (< 1 minute)

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 5. Deploy (1 click)

### Option A: Vercel (Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Then add environment variables in Vercel dashboard.

### Option B: Docker
```bash
# Build
docker build -t base-oracle .

# Run
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk_... \
  base-oracle
```

### Option C: Railway (1-click)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Select repository
4. Add environment variables
5. Deploy

---

## Chat Commands

Ask the AI anything about Base:

```
"What's the Base network TVL?"
"Analyze wallet 0x742d..."
"Show trending tokens"
"Latest Farcaster posts"
"Token info for USDC"
"DeFi yield opportunities"
```

---

## File Structure Cheat Sheet

```
app/api/           # API endpoints
  ├── chat/        # AI responses
  ├── wallet/      # Wallet data
  ├── tokens/      # Token search
  ├── social/      # Social feeds
  ├── analytics/   # Network stats
  └── voice/       # Voice processing

components/        # React components
  ├── ChatInterface.tsx
  ├── WalletCard.tsx
  ├── TokenList.tsx
  ├── SocialFeed.tsx
  ├── VoiceMode.tsx
  └── Dashboard.tsx

lib/              # Utilities
  ├── types.ts    # TypeScript types
  ├── api.ts      # API helpers
  └── utils.ts    # Helper functions
```

---

## Common Tasks

### Add New API Endpoint

1. Create file: `app/api/my-feature/route.ts`
2. Add route handler:
```typescript
export async function GET(request: NextRequest) {
  return NextResponse.json({ data: "..." })
}
```

### Add New Component

1. Create file: `components/MyComponent.tsx`
2. Build UI:
```typescript
export function MyComponent() {
  return <div>Your component</div>
}
```

### Update Styling

Edit `app/globals.css` or `tailwind.config.ts`

### Debug Issues

Check browser console:
```javascript
// In browser console
localStorage.setItem("debug", "true")
// Then check Network and Console tabs
```

---

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://typescriptlang.org)
- [Tailwind Docs](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [OpenAI API](https://platform.openai.com/docs)
- [Base Docs](https://docs.base.org)

---

## Troubleshooting

### "API key not found"
→ Check `.env.local` has correct key

### "Port 3000 in use"
→ Run `lsof -i :3000` to find process

### "Node modules not found"
→ Run `npm install`

### "Build failed"
→ Run `npm run build` to see errors

---

## Next Steps

1. **Explore Components:** Review `/components` folder
2. **Try APIs:** Test endpoints in Postman
3. **Customize:** Update colors/fonts
4. **Deploy:** Use Vercel, Docker, or Railway
5. **Monitor:** Set up error tracking
6. **Scale:** Add caching/database as needed

---

## Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Quality
npm run lint             # Run linter
npm run type-check       # Check TypeScript

# Deployment
vercel                   # Deploy to Vercel
docker build -t app .    # Build Docker image
docker run -p 3000:3000  # Run Docker image
```

---

## Environment Variables Checklist

- [ ] OPENAI_API_KEY set
- [ ] MORALIS_API_KEY set (optional)
- [ ] ALCHEMY_API_KEY set (optional)
- [ ] .env.local created
- [ ] Variables in production environment

---

## Performance Tips

- Enable Vercel Analytics
- Use Chrome DevTools for profiling
- Check Network tab for slow requests
- Monitor API response times
- Cache social feeds (60s)
- Paginate results

---

## Security Tips

- Never commit .env files
- Rotate API keys monthly
- Use HTTPS in production
- Enable rate limiting
- Validate all inputs
- Monitor for unusual activity

---

## Questions?

Check:
1. README.md - Overview
2. API_DOCUMENTATION.md - API details
3. DEPLOYMENT.md - Deployment help
4. GitHub Issues - Common problems

---

## Ready?

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🚀

---

Happy building! 🎉
