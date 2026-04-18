// LandingPage.tsx — Light editorial splash screen (OkayAfrica / Afrocritik style)
import { useState, useEffect } from "react";
import { ArrowRight, MapPin, Music, Wheat, BookOpen, Heart } from "lucide-react";

type StoryCategory = "music" | "agriculture" | "scholarship" | "medicine";

interface LandingPageProps {
  onEnter: (category?: StoryCategory) => void;
}

const STORIES: { category: StoryCategory; icon: React.ReactNode; color: string; bgColor: string; borderColor: string; label: string; headline: string; sub: string }[] = [
  {
    category: "music",
    icon: <Music size={16} />,
    color: "#C85530",
    bgColor: "#FDF0EB",
    borderColor: "#C85530",
    label: "Music",
    headline: "How the Yoruba drum crossed the Atlantic",
    sub: "From Nigeria to Cuba, Brazil & beyond",
  },
  {
    category: "agriculture",
    icon: <Wheat size={16} />,
    color: "#1A6B3C",
    bgColor: "#EAF4EE",
    borderColor: "#1A6B3C",
    label: "Agriculture",
    headline: "The Africans who taught America to grow rice",
    sub: "A history buried in plantation records",
  },
  {
    category: "scholarship",
    icon: <BookOpen size={16} />,
    color: "#1A4A8A",
    bgColor: "#E8EFF8",
    borderColor: "#1A4A8A",
    label: "Scholarship",
    headline: "Timbuktu: Africa's city of 25,000 scholars",
    sub: "The oldest university the West forgot",
  },
  {
    category: "medicine",
    icon: <Heart size={16} />,
    color: "#D4860A",
    bgColor: "#FDF4E3",
    borderColor: "#D4860A",
    label: "Medicine",
    headline: "Imhotep: physician 2,000 years before Hippocrates",
    sub: "The man Hippocrates himself credited",
  },
];

const STATS = [
  { number: "54",     label: "Countries" },
  { number: "3,000+", label: "Years of history" },
  { number: "4",      label: "Story threads" },
  { number: "1B+",    label: "Diaspora worldwide" },
];

export function LandingPage({ onEnter }: LandingPageProps) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [hovered, setHovered] = useState<StoryCategory | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = (category?: StoryCategory) => {
    setLeaving(true);
    setTimeout(() => onEnter(category), 550);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "#FFFFFF",
      display: "flex", flexDirection: "column",
      overflow: "auto",
      opacity: leaving ? 0 : (visible ? 1 : 0),
      transition: leaving ? "opacity 0.55s ease" : "opacity 0.7s ease",
      fontFamily: "var(--font-body)",
    }}>

      {/* Kente stripe */}
      <div className="kente-stripe" style={{ height: 5, flexShrink: 0 }} />

      {/* ── Nav bar ── */}
      <div style={{
        padding: "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #E8E3DC", flexShrink: 0,
        background: "#FFFFFF",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "#C85530", clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "#fff", lineHeight: 1 }}>A</span>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "0.07em", color: "#0F0F0F", lineHeight: 1 }}>AFRICANA</div>
            <div style={{ fontSize: 8, letterSpacing: "0.22em", color: "#AAA", textTransform: "uppercase", marginTop: 2, fontWeight: 600 }}>Digital Storytelling Archive</div>
          </div>
        </div>

        <button onClick={() => handleEnter()} style={{
          fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11,
          letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "8px 18px", borderRadius: 4,
          background: "transparent", border: "1.5px solid #DDD8CF",
          color: "#999", cursor: "pointer", transition: "all 0.18s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0F0F0F"; e.currentTarget.style.color = "#0F0F0F"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDD8CF"; e.currentTarget.style.color = "#999"; }}
        >Skip intro →</button>
      </div>

      {/* ── HERO ── */}
      <div style={{ background: "#0F0F0F", padding: "56px 40px 48px", flexShrink: 0, position: "relative", overflow: "hidden" }}>

        {/* Ghost background text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(100px, 16vw, 220px)",
          letterSpacing: "0.06em", lineHeight: 1,
          color: "rgba(255,255,255,0.03)",
          userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap",
        }}>AFRICA</div>

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <span style={{ display: "inline-block", width: 28, height: 2, background: "#C85530", borderRadius: 1 }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", color: "#C85530" }}>
              An Interactive Historical Archive
            </span>
          </div>

          {/* Two-column hero layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }}>
            <div>
              <h1 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(52px, 8vw, 108px)",
                letterSpacing: "0.04em", lineHeight: 0.95,
                color: "#FFFFFF", margin: "0 0 22px",
              }}>
                THE STORIES
                <br />
                <span style={{ color: "#C85530" }}>THEY</span> TRIED
                <br />
                TO ERASE
              </h1>
              <p style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(15px, 1.6vw, 20px)",
                color: "rgba(255,255,255,0.5)",
                maxWidth: 480, lineHeight: 1.65,
                marginBottom: 32, fontStyle: "italic",
              }}>
                Explore 3,000 years of African history, science, music and culture — and trace how it shaped the entire world.
              </p>

              {/* CTA */}
              <button onClick={() => handleEnter()} style={{
                fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 12,
                letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "15px 36px", background: "#C85530", color: "#FFFFFF",
                border: "none", borderRadius: 4, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 10,
                transition: "all 0.2s",
                boxShadow: "0 0 40px rgba(200,85,48,0.35)",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#B04828"; e.currentTarget.style.boxShadow = "0 0 60px rgba(200,85,48,0.55)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#C85530"; e.currentTarget.style.boxShadow = "0 0 40px rgba(200,85,48,0.35)"; }}
              >
                <MapPin size={15} />
                Enter the Archive
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 32px" }}>
              {STATS.map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: "16px 20px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 40, letterSpacing: "0.04em", color: "#E8A020", lineHeight: 1 }}>{s.number}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: 5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Story cards — LIGHT section ── */}
      <div style={{ background: "#F7F3ED", flex: 1, padding: "32px 40px 36px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 20, height: 1.5, background: "#0F0F0F", borderRadius: 1 }} />
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: "#0F0F0F" }}>
              Four threads of history — click to explore
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {STORIES.map((s) => {
              const isHovered = hovered === s.category;
              return (
                <button key={s.category}
                  onClick={() => handleEnter(s.category)}
                  onMouseEnter={() => setHovered(s.category)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    textAlign: "left",
                    background: isHovered ? s.bgColor : "#FFFFFF",
                    border: "1.5px solid " + (isHovered ? s.borderColor : "#E8E3DC"),
                    borderTop: `4px solid ${s.color}`,
                    borderRadius: 8,
                    padding: "20px 18px 18px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-body)",
                    boxShadow: isHovered ? `0 8px 28px rgba(0,0,0,0.1)` : "0 2px 8px rgba(0,0,0,0.04)",
                    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                  }}
                >
                  {/* Category badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: s.color }}>{s.label}</span>
                  </div>

                  {/* Headline */}
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, color: "#0F0F0F", lineHeight: 1.3, marginBottom: 8 }}>
                    {s.headline}
                  </div>
                  <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{s.sub}</div>

                  {/* "Explore →" appears on hover */}
                  <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 5, opacity: isHovered ? 1 : 0, transition: "opacity 0.2s" }}>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: s.color }}>Explore on map</span>
                    <ArrowRight size={12} color={s.color} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
