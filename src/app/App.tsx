// src/app/App.tsx
import { useState } from "react";
import { EnhancedAfricaMap } from "./components/EnhancedAfricaMap";
import { CultureAIGuide } from "./components/CultureAIGuide";
import { LandingPage } from "./components/LandingPage";
import { Toaster } from "./components/ui/sonner";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

type StoryCategory = "music" | "agriculture" | "scholarship" | "medicine";

const TICKER_ITEMS = [
  "Timbuktu housed one of the world's oldest universities",
  "The Talking Drum carried messages across 500 miles",
  "African farmers taught Americans how to cultivate rice",
  "Imhotep practiced medicine 2,000 years before Hippocrates",
  "The Kingdom of Mali was larger than Western Europe",
  "Yoruba music is the root of Cuban Santería rhythms",
  "Ethiopia's Lalibela built 11 churches carved into solid rock",
  "Great Zimbabwe — engineering without a single blueprint",
];

function Marquee() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ background: "#0F0F0F", overflow: "hidden", flexShrink: 0 }}>
      <div className="marquee-track" style={{ padding: "7px 0" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap", padding: "0 24px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)" }}>
              {item}
            </span>
            <span style={{ color: "#C85530", fontSize: 7 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState("map");
  // Category selected from landing page — passed to map as initialCategory
  const [landingCategory, setLandingCategory] = useState<StoryCategory | null>(null);
  // Key to force-remount the map when a new category is picked from landing
  const [mapKey, setMapKey] = useState(0);
  const [autoOpenStory, setAutoOpenStory] = useState(false);

  const handleEnterFromLanding = (category?: StoryCategory) => {
    setLandingCategory(category ?? null);
    setAutoOpenStory(!!category);
    setMapKey((k) => k + 1); // remount map so initialCategory takes effect
    setShowLanding(false);
    setActiveTab("map");
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", background: "#F7F3ED", fontFamily: "var(--font-body)" }}>
      <Toaster />

      {/* Landing overlay */}
      {showLanding && <LandingPage onEnter={handleEnterFromLanding} />}

      {/* Kente stripe */}
      <div className="kente-stripe" style={{ height: 5, flexShrink: 0 }} />

      {/* Header */}
      <header style={{ flexShrink: 0, background: "#FFFFFF", borderBottom: "2px solid #0F0F0F" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, background: "#C85530", clipPath: "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 15% 100%, 0 85%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#fff", lineHeight: 1 }}>A</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "0.06em", lineHeight: 1, color: "#0F0F0F" }}>AFRICANA</div>
              <div style={{ fontSize: 9, letterSpacing: "0.22em", color: "#999", textTransform: "uppercase", marginTop: 3, fontWeight: 600 }}>Digital Storytelling Archive</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[{ id: "map", label: "Explore" }, { id: "guide", label: "AI Guide" }].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 12,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  padding: "8px 22px",
                  background: active ? "#0F0F0F" : "transparent",
                  color: active ? "#FFFFFF" : "#5a5a5a",
                  border: "2px solid " + (active ? "#0F0F0F" : "transparent"),
                  borderRadius: 4, cursor: "pointer", transition: "all 0.18s",
                }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#0F0F0F"; e.currentTarget.style.borderColor = "#0F0F0F"; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "#5a5a5a"; e.currentTarget.style.borderColor = "transparent"; } }}
                >{tab.label}</button>
              );
            })}
          </nav>

          {/* Tagline + About button */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 12, color: "#999", fontStyle: "italic", fontFamily: "var(--font-serif)" }}>
              Reclaiming the stories Europe tried to erase
            </div>
            <button onClick={() => setShowLanding(true)} style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "5px 12px", borderRadius: 4,
              background: "transparent", border: "1px solid #DDD8CF",
              color: "#BBB", cursor: "pointer", transition: "all 0.18s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C85530"; e.currentTarget.style.color = "#C85530"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDD8CF"; e.currentTarget.style.color = "#BBB"; }}
              title="Show intro page"
            >About</button>
          </div>
        </div>
        <Marquee />
      </header>

      {/* Main */}
      <main style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, minHeight: 0, display: activeTab === "map" ? "flex" : "none", flexDirection: "column" }}>
          {/* key prop remounts map with new initialCategory when coming from landing */}
          <EnhancedAfricaMap key={mapKey} initialCategory={landingCategory} autoOpenStory={autoOpenStory} />
        </div>
        {activeTab === "guide" && (
          <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 28, background: "#F7F3ED" }}>
            <CultureAIGuide projectId={projectId} publicAnonKey={publicAnonKey} />
          </div>
        )}
      </main>
    </div>
  );
}
