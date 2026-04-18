# Vercel Deployment Guide

## Quick Deploy

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

## Environment Variables

Add these in Vercel Dashboard -> Settings -> Environment Variables:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

## Build Settings

Vercel will auto-detect:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## API Routes

Serverless functions in `/api` folder:
- `/api/chat` - OpenAI chat endpoint
- `/api/wdqs` - Wikidata SPARQL proxy

## Testing Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deployment Steps

### Method 1: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### Method 2: GitHub Integration

1. Push to GitHub
2. Visit vercel.com/new
3. Import your repository
4. Add environment variables
5. Deploy

## Post-Deployment

1. Verify map loads
2. Test AI chat
3. Check data loading in console
4. Test all features

## Troubleshooting

**Map not loading:**
- Verify VITE_GOOGLE_MAPS_API_KEY is set
- Check Maps JavaScript API is enabled
- Check Places API is enabled

**AI not responding:**
- Verify OPENAI_API_KEY is set
- Check API has credits

**Data not loading:**
- Check browser console
- Verify Wikidata is accessible
- Wait 30-60s for initial load

## Performance

- First build: 2-3 minutes
- Subsequent builds: 1-2 minutes
- Cold start: < 1 second
- Data cache: 7 days in browser

## Monitoring

Check Vercel Dashboard:
- Function logs
- Analytics
- Performance metrics

## Support

Issues? Check:
1. Vercel deployment logs
2. Browser console (F12)
3. Network tab for API calls
