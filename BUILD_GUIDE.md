# Base Oracle - Build & Deployment Guide

## Status: Ready to Build

All source files are in place and the application is ready for the build process.

---

## Quick Build Steps

### 1. Install Dependencies
```bash
npm install
```
This installs all required packages including:
- Next.js 16
- React 19 & React DOM
- AI SDK 6 with OpenAI provider
- shadcn/ui components
- Tailwind CSS
- All supporting libraries

**Expected time:** 2-5 minutes (depends on internet speed)

### 2. Start Development Server
```bash
npm run dev
```
This starts the local development server on `http://localhost:3000`

**What it does:**
- Hot-reloading enabled for instant changes
- Opens at http://localhost:3000
- Shows console logs and errors

### 3. Build for Production
```bash
npm run build
```
This creates an optimized production build.

**What it does:**
- Compiles TypeScript to JavaScript
- Optimizes and bundles React components
- Creates `.next` directory with built files
- Runs type checking and linting

### 4. Start Production Server
```bash
npm start
```
Runs the production-optimized build locally (for testing before deployment).

---

## Project Structure Verification

All essential files are present:

```
✓ app/
  ✓ layout.tsx           (Root layout with metadata)
  ✓ page.tsx             (Main page component)
  ✓ globals.css          (Global styles)
  ✓ api/
    ✓ chat/route.ts      (AI chat endpoint)
    ✓ wallet/route.ts    (Wallet analysis)
    ✓ tokens/route.ts    (Token search)
    ✓ social/route.ts    (Social feeds)
    ✓ analytics/route.ts (Network stats)
    ✓ voice/route.ts     (Voice processing)

✓ components/
  ✓ ChatInterface.tsx    (Main chat UI)
  ✓ MessageBubble.tsx    (Message display)
  ✓ Sidebar.tsx          (Navigation)
  ✓ Header.tsx           (Top bar)
  ✓ Footer.tsx           (Bottom bar)
  ✓ Dashboard.tsx        (Analytics)
  ✓ WalletCard.tsx       (Wallet display)
  ✓ TokenList.tsx        (Token listing)
  ✓ SocialFeed.tsx       (Social posts)
  ✓ BlockchainStats.tsx  (Network stats)
  ✓ VoiceMode.tsx        (Voice input)
  ✓ WalletConnect.tsx    (Wallet connection)
  ✓ [16 more components] (Specialized features)

✓ lib/
  ✓ types.ts             (TypeScript types)
  ✓ api.ts               (API utilities)
  ✓ utils.ts             (Helper functions)

✓ Configuration Files
  ✓ tailwind.config.ts   (Tailwind config)
  ✓ tsconfig.json        (TypeScript config)
  ✓ package.json         (Dependencies)
  ✓ next.config.mjs      (Next.js config)

✓ Documentation
  ✓ README.md            (Main guide)
  ✓ API_DOCUMENTATION.md (API reference)
  ✓ DEPLOYMENT.md        (Deployment guide)
  ✓ QUICK_START.md       (5-minute setup)
```

---

## Environment Variables Setup

Before starting the dev server or deploying, add your API keys:

### Option A: Local Development (.env.local)
```bash
# In project root, create .env.local file:
OPENAI_API_KEY=sk_your_openai_key_here
MORALIS_API_KEY=your_moralis_key
ALCHEMY_API_KEY=your_alchemy_key
```

### Option B: Vercel Deployment
In Vercel dashboard → Settings → Environment Variables, add:
- `OPENAI_API_KEY`
- `MORALIS_API_KEY` (optional)
- `ALCHEMY_API_KEY` (optional)

### Getting API Keys
- **OpenAI:** https://platform.openai.com/api-keys
- **Moralis:** https://moralis.io/ (required for wallet analysis)
- **Alchemy:** https://www.alchemy.com/ (required for on-chain data)

---

## Build Troubleshooting

### Issue: "Module not found" errors during build
**Solution:** Run `npm install` first, then `npm run build`

### Issue: TypeScript errors
**Solution:** These are checked during build. Fix using:
```bash
npm run lint
```

### Issue: Port 3000 already in use
**Solution:** Use different port:
```bash
npm run dev -- -p 3001
```

### Issue: Build fails due to missing API keys
**Solution:** Add environment variables (development will work without keys with demo data)

---

## Performance Optimization

The build includes:
- Next.js Turbopack (default bundler in v16)
- Code splitting and lazy loading
- Automatic static optimization
- Image optimization
- CSS minification
- JavaScript tree-shaking

**Build output location:** `./.next/`

---

## Deployment Checklist

Before deploying to production:

- [ ] Run `npm install` locally
- [ ] Run `npm run build` and verify no errors
- [ ] Run `npm run dev` and test UI in browser
- [ ] Add environment variables (OPENAI_API_KEY required)
- [ ] Test all chat features locally
- [ ] Verify API routes work (`/api/chat`, etc.)
- [ ] Check mobile responsiveness
- [ ] Test wallet integration (if API keys added)
- [ ] Review README.md and docs
- [ ] Deploy to Vercel or preferred hosting

---

## Deployment Options

### Option 1: Vercel (Recommended - 1 minute)
```bash
npm install -g vercel
vercel deploy --prod
# Then add environment variables in Vercel dashboard
```

### Option 2: Docker
```bash
docker build -t base-oracle .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk_... \
  base-oracle
```

### Option 3: Manual Node.js Server
```bash
npm run build
npm start
# Server runs on port 3000
```

### Option 4: Other Hosting (Railway, Render, etc.)
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## Next Steps

1. **Install & Run:**
   ```bash
   npm install
   npm run dev
   ```

2. **Visit:** http://localhost:3000

3. **Test Chat:** Type a question about Base blockchain

4. **Add API Keys:** Copy environment variables to `.env.local`

5. **Deploy:** Follow deployment option above

---

## Support & Documentation

- **Full Docs:** See README.md
- **API Reference:** See API_DOCUMENTATION.md
- **Deployment:** See DEPLOYMENT.md
- **Implementation:** See IMPLEMENTATION_SUMMARY.md

---

## Build Statistics

- **React Components:** 20+
- **API Endpoints:** 6
- **TypeScript Types:** 50+
- **Total Code Lines:** ~8,000+
- **Documentation:** 5 comprehensive guides

All systems ready for production deployment.
