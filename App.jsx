import { useState } from "react";

const MOODS = ["Melancholic", "Euphoric", "Aggressive", "Chill", "Focused", "Romantic", "Dark", "Energized", "Nostalgic", "Tense"];
const GENRES = ["Metal", "Rock", "Hip-Hop", "Electronic", "Dubstep", "Jazz", "Pop", "Classical", "R&B", "Indie", "Drum & Bass", "Trap", "Post-Rock", "Ambient", "Hardcore"];

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208a5.494 5.494 0 0 0-.37 1.548c-.05.475-.078.954-.086 1.432-.002.087-.006.175-.006.262v14.11c.002.09.006.18.009.27.02.505.063 1.01.167 1.506.29 1.38 1.077 2.383 2.32 3.053a5.1 5.1 0 0 0 1.959.554c.462.045.924.072 1.386.073H18.2c.11 0 .22-.002.33-.007.4-.014.8-.044 1.19-.112a5.2 5.2 0 0 0 2.007-.82c1.12-.77 1.81-1.83 2.07-3.17.11-.59.15-1.19.16-1.79V6.124zm-8.977 9.866a.815.815 0 0 1-.33.663.823.823 0 0 1-.74.09L9.864 15.3a.825.825 0 0 1-.553-.78V8.98a.83.83 0 0 1 1.007-.808l4.083.94a.828.828 0 0 1 .64.808l-.024 6.07zM13.85 13.5l-2.49-.573v1.59l2.49.573V13.5zm0-1.58l-2.49-.574V9.99l2.49.574v1.356z"/>
  </svg>
);

const track = (event, props = {}) => {
  if (window.posthog) window.posthog.capture(event, props);
};

const LoadingWave = () => (
  <div style={{ display: "flex", gap: "6px", alignItems: "center", justifyContent: "center", padding: "40px" }}>
    {[0,1,2,3,4].map(i => (
      <div key={i} style={{
        width: "4px", height: "32px", background: "#e8b86d", borderRadius: "2px",
        animation: "wave 1s ease-in-out infinite", animationDelay: `${i * 0.1}s`
      }} />
    ))}
    <style>{`@keyframes wave { 0%, 100% { transform: scaleY(0.4); opacity: 0.5; } 50% { transform: scaleY(1); opacity: 1; } }`}</style>
  </div>
);

const Tag = ({ label, selected, onClick }) => (
  <button onClick={onClick} style={{
    padding: "7px 14px", borderRadius: "20px", cursor: "pointer", fontFamily: "inherit",
    fontSize: "13px", transition: "all 0.15s",
    border: selected ? "1px solid #e8b86d" : "1px solid rgba(255,255,255,0.12)",
    background: selected ? "rgba(232,184,109,0.18)" : "transparent",
    color: selected ? "#e8b86d" : "#888",
    fontWeight: selected ? "600" : "400"
  }}>{label}</button>
);

export default function MoodTracks() {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [moodText, setMoodText] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [artists, setArtists] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generated, setGenerated] = useState(false);

  const toggleMood = (m) => setSelectedMoods(prev =>
    prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]
  );

  const toggleGenre = (g) => setSelectedGenres(prev =>
    prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
  );

  const moodSummary = () => {
    const chips = selectedMoods.join(", ");
    const text = moodText.trim();
    if (chips && text) return `${chips} — ${text}`;
    return chips || text || "";
  };

  const genreSummary = () => selectedGenres.join(" / ") || "";

  const generateTracks = async () => {
    const moodFinal = moodSummary();
    const genreFinal = genreSummary();
    if (!moodFinal && !genreFinal) {
      setError("Describe your mood or pick a genre to get started.");
      return;
    }
    setError("");
    setLoading(true);
    setTracks([]);
    setGenerated(false);

    // Track the generation event
    track("playlist_generated", {
      moods: selectedMoods,
      mood_text: moodText.trim(),
      genres: selectedGenres,
      artists: artists.trim(),
      extra_context: extraContext.trim(),
    });

    const prompt = `You are a world-class music curator. Generate a playlist of 8 tracks based on:
- Mood / Feeling: ${moodFinal || "not specified"}
- Genre Mix: ${genreFinal || "any"}
- Favorite Artists: ${artists || "none"}
- Extra context: ${extraContext || "none"}

The mood may be casual or poetic — interpret it creatively and musically.
If multiple genres are listed, blend them authentically, favoring artists at the real crossover of those sounds.

Return ONLY a valid JSON array with exactly 8 objects, no markdown, no explanation:
[{"title":"Song Title","artist":"Artist Name","album":"Album Name","year":"Year","description":"2 sentences on why this fits","vibe":"short evocative phrase"}]

Mix well-known tracks with deeper cuts. Think like a human who lives and breathes this music.`;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setTracks(parsed);
      setGenerated(true);
      track("playlist_success", { track_count: parsed.length });
    } catch (e) {
      setError("Something went wrong. Please try again.");
      track("playlist_error");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (platform, trackTitle, artist) => {
    track("link_clicked", { platform, track: trackTitle, artist });
  };

  const spotifyLink = (t, a) => `https://open.spotify.com/search/${encodeURIComponent(`${t} ${a}`)}`;
  const youtubeLink = (t, a) => `https://www.youtube.com/results?search_query=${encodeURIComponent(`${t} ${a}`)}`;
  const appleMusicLink = (t, a) => `https://music.apple.com/search?term=${encodeURIComponent(`${t} ${a}`)}`;

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px", padding: "11px 14px",
    color: "#f0ece4", fontSize: "14px", fontFamily: "inherit", outline: "none"
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a", color: "#f0ece4",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "48px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "44px" }}>
          <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#e8b86d", textTransform: "uppercase", marginBottom: "14px", opacity: 0.8 }}>
            AI Music Discovery
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 6vw, 56px)", fontWeight: "700",
            letterSpacing: "-1.5px", lineHeight: 1.1, margin: "0 0 14px",
            background: "linear-gradient(135deg, #f0ece4 30%, #e8b86d 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>MoodTracks</h1>
          <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.6, maxWidth: "400px", margin: "0 auto" }}>
            Describe how you feel. Mix genres freely. Get a curated playlist with one-click links.
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px", padding: "28px 28px 24px", marginBottom: "32px"
        }}>

          {/* Mood */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "3px", color: "#e8b86d", textTransform: "uppercase", marginBottom: "12px" }}>
              Mood <span style={{ color: "#444", textTransform: "none", letterSpacing: 0, fontSize: "12px" }}>— pick one or many, or just type below</span>
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "12px" }}>
              {MOODS.map(m => (
                <Tag key={m} label={m} selected={selectedMoods.includes(m)} onClick={() => toggleMood(m)} />
              ))}
            </div>
            <input
              value={moodText}
              onChange={e => setMoodText(e.target.value)}
              placeholder='Or describe it freely... e.g. "driving alone at 3am feeling empty but alive"'
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(232,184,109,0.4)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>

          {/* Genre */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "3px", color: "#e8b86d", textTransform: "uppercase", marginBottom: "12px" }}>
              Genre Mix <span style={{ color: "#444", textTransform: "none", letterSpacing: 0, fontSize: "12px" }}>— select multiple to blend freely</span>
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {GENRES.map(g => (
                <Tag key={g} label={g} selected={selectedGenres.includes(g)} onClick={() => toggleGenre(g)} />
              ))}
            </div>
            {selectedGenres.length > 1 && (
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#555" }}>
                Blending: <span style={{ color: "#e8b86d", fontWeight: "600" }}>{selectedGenres.join(" / ")}</span>
              </div>
            )}
          </div>

          {/* Artists */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "3px", color: "#e8b86d", textTransform: "uppercase", marginBottom: "10px" }}>
              Artists You Love <span style={{ color: "#444", textTransform: "none", letterSpacing: 0, fontSize: "12px" }}>(optional)</span>
            </label>
            <input
              value={artists}
              onChange={e => setArtists(e.target.value)}
              placeholder="e.g. Bring Me The Horizon, Skrillex, Meshuggah, Periphery"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(232,184,109,0.4)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>

          {/* Extra context */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "11px", letterSpacing: "3px", color: "#e8b86d", textTransform: "uppercase", marginBottom: "10px" }}>
              Extra Context <span style={{ color: "#444", textTransform: "none", letterSpacing: 0, fontSize: "12px" }}>(optional)</span>
            </label>
            <input
              value={extraContext}
              onChange={e => setExtraContext(e.target.value)}
              placeholder="e.g. workout, late night session, need something heavy but melodic"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "rgba(232,184,109,0.4)"; }}
              onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>

          {error && <p style={{ color: "#e07070", fontSize: "13px", marginBottom: "14px" }}>{error}</p>}

          <button
            onClick={generateTracks}
            disabled={loading}
            style={{
              width: "100%", padding: "15px",
              background: loading ? "rgba(232,184,109,0.2)" : "linear-gradient(135deg, #e8b86d, #c9924a)",
              border: "none", borderRadius: "8px",
              color: loading ? "#666" : "#0a0a0a",
              fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase",
              fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit", transition: "opacity 0.2s"
            }}
          >
            {loading ? "Curating your playlist..." : "Generate My Playlist →"}
          </button>
        </div>

        {loading && <LoadingWave />}

        {/* Results */}
        {generated && tracks.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
              <span style={{ fontSize: "11px", letterSpacing: "2px", color: "#555", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {tracks.length} tracks · {genreSummary() || "mixed"} · {(moodSummary() || "your vibe").slice(0, 40)}
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tracks.map((t, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px", padding: "18px 20px",
                  display: "flex", gap: "16px", alignItems: "flex-start"
                }}>
                  <div style={{
                    minWidth: "26px", height: "26px", borderRadius: "50%",
                    border: "1px solid rgba(232,184,109,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", color: "#e8b86d", marginTop: "1px", flexShrink: 0
                  }}>{i + 1}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ marginBottom: "3px" }}>
                      <span style={{ fontSize: "15px", fontWeight: "600", color: "#f0ece4" }}>{t.title}</span>
                      <span style={{ color: "#777", fontSize: "14px" }}> — {t.artist}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#444", marginBottom: "8px" }}>
                      {t.album} · {t.year}
                      {t.vibe && (
                        <span style={{
                          marginLeft: "8px", padding: "2px 8px",
                          background: "rgba(232,184,109,0.09)", borderRadius: "10px",
                          color: "#e8b86d", fontSize: "10px"
                        }}>{t.vibe}</span>
                      )}
                    </div>
                    <p style={{ color: "#777", fontSize: "13px", lineHeight: 1.6, margin: "0 0 12px" }}>
                      {t.description}
                    </p>
                    <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                      {[
                        { href: spotifyLink(t.title, t.artist), label: "Spotify", Icon: SpotifyIcon, color: "#1ed760", bg: "rgba(30,215,96,0.08)", border: "rgba(30,215,96,0.2)" },
                        { href: youtubeLink(t.title, t.artist), label: "YouTube", Icon: YouTubeIcon, color: "#ff4444", bg: "rgba(255,0,0,0.07)", border: "rgba(255,0,0,0.18)" },
                        { href: appleMusicLink(t.title, t.artist), label: "Apple Music", Icon: AppleMusicIcon, color: "#fc3c44", bg: "rgba(252,60,68,0.07)", border: "rgba(252,60,68,0.18)" }
                      ].map(({ href, label, Icon, color, bg, border }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleLinkClick(label, t.title, t.artist)}
                          style={{
                            display: "flex", alignItems: "center", gap: "5px",
                            padding: "5px 11px", borderRadius: "6px",
                            background: bg, border: `1px solid ${border}`,
                            color, fontSize: "12px", textDecoration: "none"
                          }}
                        >
                          <Icon /> {label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "28px" }}>
              <button onClick={generateTracks} style={{
                background: "transparent", border: "1px solid rgba(232,184,109,0.25)",
                color: "#e8b86d", padding: "9px 22px", borderRadius: "6px",
                fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "inherit"
              }}>↻ Regenerate</button>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "56px", color: "#2a2a2a", fontSize: "12px" }}>
          Powered by Claude AI · Spotify · YouTube · Apple Music
        </div>
      </div>
    </div>
  );
}
