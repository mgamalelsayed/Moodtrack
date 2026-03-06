# MoodTracks 🎵

AI-powered music discovery. Describe your mood, mix genres, get a curated playlist with one-click links to Spotify, YouTube and Apple Music.

---

## Deploy in 10 minutes

### 1. Upload to GitHub
- Create a new repo called `moodtracks`
- Upload all these files (keep the folder structure)

### 2. Deploy on Vercel (free)
- Go to vercel.com → sign in with GitHub
- Click "Add New Project" → select your `moodtracks` repo
- Click Deploy — done. You get a live URL instantly.

### 3. Add PostHog Analytics (optional but recommended)
- Sign up free at posthog.com
- Copy your Project API Key
- Open `index.html` and replace `YOUR_POSTHOG_KEY` with your real key
- Push the change to GitHub — Vercel redeploys automatically

---

## What gets tracked (PostHog events)
- `playlist_generated` — mood, genres, artists entered
- `playlist_success` — successful generation
- `playlist_error` — failed generations
- `link_clicked` — which platform (Spotify/YouTube/Apple Music) and which track

---

## Tech stack
- React 18 + Vite
- Claude AI API (claude-sonnet-4-20250514)
- PostHog analytics
- Zero backend — fully static, deploys anywhere
