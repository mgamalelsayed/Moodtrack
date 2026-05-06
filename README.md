
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
