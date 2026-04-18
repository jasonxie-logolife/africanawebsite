// StoryPanel — light/cream editorial magazine style
import { useEffect, useState } from "react";
import { X, ArrowUpRight, MapPin } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Story, DiasporaDestination, CATEGORY_META } from "@/data/stories-data";

interface StoryPanelProps {
  story: Story | null;
  onClose: () => void;
  onDiasporaSelect: (dest: DiasporaDestination) => void;
}

const PHASE_CFG = [
  { label: "Pre-Colonial", short: "Origin",   color: "#1A6B3C", bg: "#E6F2EC", num: "01" },
  { label: "Diaspora",     short: "Diaspora", color: "#D4860A", bg: "#FDF3E3", num: "02" },
  { label: "Modern Day",   short: "Today",    color: "#C85530", bg: "#F2E8E3", num: "03" },
] as const;

const CAT_COLOR: Record<string, string> = {
  music: "#C85530", agriculture: "#1A6B3C", scholarship: "#1A4A8A", medicine: "#D4860A",
};

export function StoryPanel({ story, onClose, onDiasporaSelect }: StoryPanelProps) {
  const [activePhase, setActivePhase] = useState(0);
  useEffect(() => { setActivePhase(0); }, [story?.id]);

  if (!story) return null;

  const catColor   = CAT_COLOR[story.category] ?? "#C85530";
  const catLabel   = CATEGORY_META[story.category]?.label ?? story.category;
  const phase      = story.phases[activePhase];
  const phaseCfg   = PHASE_CFG[activePhase];
  const showDiaspora = activePhase >= 1 && story.diasporaDestinations.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 10, background: "rgba(0,0,0,0.25)" }} />

      {/* Panel — cream white, editorial magazine */}
      <div className="slide-in-right" style={{
        position: "absolute", right: 0, top: 0, bottom: 0, zIndex: 20,
        width: 520, display: "flex", flexDirection: "column",
        background: "#FFFFFF",
        borderLeft: "2px solid #0F0F0F",
        fontFamily: "var(--font-body)",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.2)",
      }}>

        {/* Top accent bar */}
        <div style={{ height: 4, background: catColor, flexShrink: 0 }} />

        {/* Header — dark ink on white */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #E8E3DC", flexShrink: 0, position: "relative" }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 18,
            background: "#F7F3ED", border: "1px solid #E0DAD0",
            borderRadius: 6, width: 30, height: 30,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#5a5a5a", cursor: "pointer",
          }}><X size={13} /></button>

          {/* Category badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: 4,
              background: catColor + "18", color: catColor,
              border: "1px solid " + catColor + "40",
            }}>{catLabel}</span>
            <span style={{ fontSize: 9, color: "#AAA", letterSpacing: "0.12em", textTransform: "uppercase" }}>Cultural History</span>
          </div>

          {/* Big Bebas title — dark on white */}
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 44, letterSpacing: "0.03em", lineHeight: 1.0,
            color: "#0F0F0F", marginBottom: 10, paddingRight: 36,
          }}>{story.title.toUpperCase()}</h2>

          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#999", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            <MapPin size={11} color={catColor} />
            Origin: {story.originCountry}
          </div>
        </div>

        {/* Phase tabs — on cream background */}
        <div style={{ display: "flex", background: "#F7F3ED", borderBottom: "1px solid #E8E3DC", flexShrink: 0 }}>
          {PHASE_CFG.map((cfg, i) => {
            const isActive = i === activePhase;
            return (
              <button key={cfg.label} onClick={() => setActivePhase(i)} style={{
                flex: 1, padding: "13px 8px 11px",
                background: isActive ? "#FFFFFF" : "transparent",
                border: "none",
                borderTop: "3px solid " + (isActive ? cfg.color : "transparent"),
                borderRight: i < 2 ? "1px solid #E8E3DC" : "none",
                cursor: "pointer", transition: "all 0.18s", textAlign: "center",
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: isActive ? cfg.color : "#CCC", lineHeight: 1, letterSpacing: "0.05em" }}>{cfg.num}</div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: isActive ? cfg.color : "#BBB", marginTop: 3 }}>{cfg.short}</div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <ScrollArea style={{ flex: 1, minHeight: 0 }}>
          <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Image */}
            {phase.imageUrl && (
              <div style={{ borderRadius: 10, overflow: "hidden", height: 240, position: "relative", background: phaseCfg.bg, border: `1px solid ${phaseCfg.color}22` }}>
                {phase.imageUrl.startsWith("TODO") ? (
                  /* Placeholder when no image yet */
                  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, opacity: 0.5 }}>
                    <div style={{ fontSize: 32 }}>🖼️</div>
                    <span style={{ fontSize: 11, color: "#666", fontStyle: "italic" }}>Image coming soon</span>
                  </div>
                ) : (
                  <img
                    src={phase.imageUrl}
                    alt={phase.imageCaption ?? ""}
                    referrerPolicy="no-referrer"
                    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#F0EBE3" }}
                    onError={(e) => {
                      // show placeholder instead of hiding on error
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const placeholder = img.parentElement?.querySelector(".img-placeholder") as HTMLElement;
                      if (placeholder) placeholder.style.display = "flex";
                    }}
                  />
                )}
                {/* Fallback placeholder (shown if img fails to load) */}
                <div className="img-placeholder" style={{ display: "none", width: "100%", height: "100%", position: "absolute", inset: 0, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, background: phaseCfg.bg, opacity: 0.7 }}>
                  <div style={{ fontSize: 28 }}>🖼️</div>
                  <span style={{ fontSize: 11, color: "#666", fontStyle: "italic" }}>Image unavailable</span>
                </div>
                {phase.imageCaption && !phase.imageUrl.startsWith("TODO") && (
                  <p style={{ position: "absolute", bottom: 8, left: 12, right: 12, fontSize: 10, color: "rgba(0,0,0,0.6)", fontStyle: "italic", background: "rgba(255,255,255,0.88)", padding: "3px 8px", borderRadius: 4 }}>{phase.imageCaption}</p>
                )}
              </div>
            )}

            {/* Headline block */}
            <div>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: phaseCfg.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "inline-block", width: 20, height: 1.5, background: phaseCfg.color }} />
                {phase.label}
              </div>
              {/* DM Serif headline on white */}
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 22, color: "#0F0F0F", lineHeight: 1.25, marginBottom: 12, letterSpacing: "-0.01em" }}>
                {phase.headline}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#444", fontWeight: 400 }}>
                {phase.body}
              </p>
            </div>

            {/* Diaspora destinations */}
            {showDiaspora && (
              <div style={{ borderTop: "1px solid #E8E3DC", paddingTop: 16 }}>
                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: PHASE_CFG[1].color, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 20, height: 1.5, background: PHASE_CFG[1].color }} />
                  Where it spread
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {story.diasporaDestinations.map((dest) => (
                    <button key={dest.countryName} onClick={() => onDiasporaSelect(dest)} style={{
                      textAlign: "left", background: "#F7F3ED",
                      border: "1.5px solid #E8E3DC", borderLeft: "3px solid " + PHASE_CFG[1].color,
                      borderRadius: 8, padding: "11px 13px", cursor: "pointer", transition: "all 0.18s", width: "100%",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = PHASE_CFG[1].bg; e.currentTarget.style.borderColor = PHASE_CFG[1].color; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F3ED"; e.currentTarget.style.borderColor = "#E8E3DC"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0F0F0F" }}>{dest.countryName}</span>
                        <ArrowUpRight size={13} color={PHASE_CFG[1].color} />
                      </div>
                      <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5, margin: 0 }}>{dest.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderTop: "1px solid #E8E3DC", flexShrink: 0, background: "#F7F3ED" }}>
          <button onClick={() => setActivePhase((p) => Math.max(0, p - 1))} disabled={activePhase === 0}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: activePhase === 0 ? "transparent" : "#999", background: "none", border: "none", cursor: activePhase === 0 ? "default" : "pointer" }}>
            ← Prev
          </button>
          {/* Progress dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {PHASE_CFG.map((cfg, i) => (
              <button key={i} onClick={() => setActivePhase(i)} style={{
                width: i === activePhase ? 22 : 6, height: 6, borderRadius: 3,
                background: i === activePhase ? cfg.color : "#DDD8CF",
                border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0,
              }} />
            ))}
          </div>
          <button onClick={() => setActivePhase((p) => Math.min(2, p + 1))} disabled={activePhase === 2}
            style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: activePhase === 2 ? "transparent" : "#999", background: "none", border: "none", cursor: activePhase === 2 ? "default" : "pointer" }}>
            Next →
          </button>
        </div>
      </div>
    </>
  );
}
