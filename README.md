# Africa Culture Web Platform

Modern web platform for exploring African culture, history, and landmarks.

## Features

- Interactive Africa map with 1000+ landmarks
- Dark/Light theme toggle
- Live Google Places reviews
- AI-powered African history guide
- Real-time Wikidata integration
- Multiple map styles (Road/Satellite/Terrain)

## Tech Stack

- React 18 + TypeScript
- Vite build tool
- Google Maps API
- OpenAI API
- Wikidata SPARQL
- Tailwind CSS
- shadcn/ui components

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

Open http://localhost:5173

## API Keys Required

1. Google Maps API (Maps JavaScript + Places API)
2. OpenAI API

See `.env.example` for configuration.

## Deployment

Ready for Vercel deployment. See `DEPLOYMENT.md` for details.

```bash
vercel
```

## Features Guide

### Map
- Search places by name
- Filter by country
- Toggle categories
- Zoom/pan controls
- Click markers for details

### Theme
- Dark mode (default)
- Light mode
- Toggle with Sun/Moon button

### AI Guide
- Ask questions about African history
- Get structured responses
- Cultural information
- Travel advice

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## License

MIT
