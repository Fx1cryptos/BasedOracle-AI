# Base Oracle - Deployment Guide

Complete guide to deploy Base Oracle to production.

## Quick Deploy Options

### Option 1: Vercel (Recommended - 1 Click)

**Best for:** Most users, automatic scaling, built-in monitoring

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Add environment variables:
   - `OPENAI_API_KEY`
   - `MORALIS_API_KEY`
   - `ALCHEMY_API_KEY`
6. Click Deploy

```bash
# Or use CLI:
npm install -g vercel
vercel
```

### Option 2: Docker + Railway

**Best for:** Docker experience, affordable, easy scaling

1. Create Railway account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Create new project
4. Add environment variables
5. Deploy automatically on push

### Option 3: Manual Node.js Server

**Best for:** Full control, custom infrastructure

```bash
# Build
npm run build

# Start
npm start
```

---

## Environment Setup

### Create .env.local

```env
# Required
OPENAI_API_KEY=sk_...

# Recommended
MORALIS_API_KEY=your_key
ALCHEMY_API_KEY=your_key

# Optional
ANTHROPIC_API_KEY=sk_ant_...
```

### Get API Keys

**OpenAI API Key:**
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or login
3. Navigate to API keys
4. Create new secret key
5. Copy and save safely

**Moralis API Key:**
1. Go to [moralis.io](https://moralis.io)
2. Sign up
3. Create new API key
4. Copy to .env.local

**Alchemy API Key:**
1. Go to [alchemy.com](https://alchemy.com)
2. Sign up
3. Create app for Base network
4. Copy API key

---

## Deployment Methods

### Vercel Deployment

**Advantages:**
- Zero configuration
- Automatic CI/CD
- Built-in analytics
- Unlimited free tier
- Auto-scaling
- Custom domains

**Steps:**

1. **Initialize Git:**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel:**
```bash
npm install -g vercel
vercel --prod
```

3. **Set Environment Variables:**
```bash
vercel env add OPENAI_API_KEY
vercel env add MORALIS_API_KEY
vercel env add ALCHEMY_API_KEY
```

4. **Monitor Deployment:**
```bash
vercel logs
```

### Docker Deployment

**Build Docker Image:**

```bash
# Build
docker build -t base-oracle:latest .

# Tag for registry
docker tag base-oracle:latest your-registry/base-oracle:latest

# Push to registry
docker push your-registry/base-oracle:latest
```

**Run Docker Container:**

```bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=sk_... \
  -e MORALIS_API_KEY=your_key \
  -e ALCHEMY_API_KEY=your_key \
  base-oracle:latest
```

**Docker Compose:**

```yaml
version: '3.8'

services:
  base-oracle:
    image: base-oracle:latest
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - MORALIS_API_KEY=${MORALIS_API_KEY}
      - ALCHEMY_API_KEY=${ALCHEMY_API_KEY}
    restart: unless-stopped
```

### Railway Deployment

**Steps:**

1. Connect GitHub repository to Railway
2. Select "Node.js" template
3. Add environment variables
4. Deploy

```bash
# Or using Railway CLI:
npm install -g @railway/cli
railway link
railway up
```

### Heroku Deployment

**Using Heroku CLI:**

```bash
# Login
heroku login

# Create app
heroku create base-oracle

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Set environment variables
heroku config:set OPENAI_API_KEY=sk_...
heroku config:set MORALIS_API_KEY=your_key
heroku config:set ALCHEMY_API_KEY=your_key

# Deploy
git push heroku main
```

### AWS Deployment

**Using Elastic Beanstalk:**

```bash
# Install EB CLI
pip install awseb-cli

# Initialize
eb init -p node.js-18 base-oracle

# Create environment
eb create base-oracle-env

# Set environment variables
eb setenv OPENAI_API_KEY=sk_... MORALIS_API_KEY=your_key

# Deploy
eb deploy
```

### Google Cloud Deployment

**Using Cloud Run:**

```bash
# Authenticate
gcloud auth login

# Build and deploy
gcloud run deploy base-oracle \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars OPENAI_API_KEY=sk_...,MORALIS_API_KEY=your_key
```

### Azure Deployment

**Using App Service:**

```bash
# Create resource group
az group create --name base-oracle --location eastus

# Create App Service plan
az appservice plan create \
  --name base-oracle-plan \
  --resource-group base-oracle \
  --sku B1 --is-linux

# Create web app
az webapp create \
  --resource-group base-oracle \
  --plan base-oracle-plan \
  --name base-oracle \
  --runtime "NODE|18-lts"

# Set environment variables
az webapp config appsettings set \
  --resource-group base-oracle \
  --name base-oracle \
  --settings OPENAI_API_KEY=sk_... MORALIS_API_KEY=your_key
```

---

## Post-Deployment

### Health Check

Test your deployment:

```bash
curl https://your-domain.com/api/analytics?metric=tvl
```

### Monitoring

**Vercel:**
- Dashboard at vercel.com
- Real-time analytics
- Error tracking

**Docker/Custom:**
- Set up logging
- Monitor CPU/memory
- Track API usage

### Scaling

**Increase Resources:**
- Vercel: Auto-scales free
- Docker: Use load balancer
- Traditional: Increase instance size

**Rate Limiting:**
Add to API routes:
```typescript
const limit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100 // limit each IP to 100 requests per windowMs
})
```

### Database (Optional)

For advanced features:
- Supabase (PostgreSQL)
- MongoDB Atlas
- Firebase

---

## Custom Domain

### Vercel

```bash
# Add domain
vercel domains add your-domain.com

# Verify DNS
# (Follow Vercel instructions)
```

### Other Platforms

Update DNS records:
```
A Record: xxx.xxx.xxx.xxx (IP address)
CNAME: www -> your-domain.com
```

---

## SSL/HTTPS

Most platforms include free SSL:
- Vercel: Automatic
- Railway: Automatic
- Docker: Use Nginx/Caddy
- Others: Use Let's Encrypt

---

## Backup & Recovery

### Git Backup

```bash
git push origin main
```

### Environment Variables

Store securely:
- Never commit .env files
- Use platform secrets
- Rotate API keys regularly

### Database Backups (if used)

Configure automatic backups:
- Supabase: 7-day retention
- MongoDB: Enable backups
- PostgreSQL: pg_dump daily

---

## Monitoring & Maintenance

### Key Metrics

Monitor:
- API response time
- Error rate
- Rate limiting hits
- API key usage

### Updates

Keep dependencies updated:

```bash
npm update
npm audit
npm audit fix
```

### Performance

Optimize:
- Cache analytics (30s)
- Paginate results
- Compress responses
- Use CDN for assets

---

## Troubleshooting

### App Won't Start
```bash
# Check build
npm run build

# Check node_modules
rm -rf node_modules package-lock.json
npm install

# Check env vars
echo $OPENAI_API_KEY
```

### API Not Responding
```bash
# Check logs
vercel logs
# or
docker logs container_id

# Test endpoint
curl https://your-domain.com/api/chat
```

### High Memory Usage
- Reduce message history
- Add pagination
- Clear caches
- Upgrade instance

### Slow Response Time
- Add caching
- Optimize queries
- Reduce API calls
- Use CDN

---

## Security Checklist

- [ ] Use HTTPS only
- [ ] Rotate API keys
- [ ] Enable rate limiting
- [ ] Validate all inputs
- [ ] Set CORS properly
- [ ] Secure environment variables
- [ ] Monitor for attacks
- [ ] Keep dependencies updated
- [ ] Use security headers
- [ ] Log suspicious activity

---

## Cost Optimization

**Free Tier Services:**
- Vercel: Free tier sufficient
- OpenAI: Pay-as-you-go
- Moralis: Free tier available
- Railway: $5/month base

**Estimate Costs:**
- Small project: $0-20/month
- Medium project: $20-100/month
- Large project: $100+/month

---

## Support

For deployment issues:
1. Check platform documentation
2. Review application logs
3. Test locally first
4. Check API key validity
5. Verify network connectivity

---

## Next Steps

After deployment:
1. Set up monitoring
2. Configure alerts
3. Plan scaling strategy
4. Document setup
5. Train team
6. Monitor performance
