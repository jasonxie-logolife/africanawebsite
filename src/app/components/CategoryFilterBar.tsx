// CategoryFilterBar — light theme, OkayAfrica-style
import { Music, Wheat, BookOpen, Heart } from "lucide-react";
import { StoryCategory, CATEGORY_META } from "@/data/stories-data";

interface CategoryFilterBarProps {
  activeCategory: StoryCategory | null;
  onChange: (category: StoryCategory | null) => void;
}

const CAT_CFG: Record<StoryCategory, { icon: React.ReactNode; color: string; bg: string; label: string }> = {
  music:       { icon: <Music className="w-3.5 h-3.5" />,    color: "#C85530", bg: "#C85530", label: "Music" },
  agriculture: { icon: <Wheat className="w-3.5 h-3.5" />,    color: "#1A6B3C", bg: "#1A6B3C", label: "Agriculture" },
  scholarship: { icon: <BookOpen className="w-3.5 h-3.5" />, color: "#1A4A8A", bg: "#1A4A8A", label: "Scholarship" },
  medicine:    { icon: <Heart className="w-3.5 h-3.5" />,    color: "#D4860A", bg: "#D4860A", label: "Medicine" },
};

export function CategoryFilterBar({ activeCategory, onChange }: CategoryFilterBarProps) {
  const cats = Object.keys(CATEGORY_META) as StoryCategory[];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {/* ALL */}
      <button onClick={() => onChange(null)} style={{
        fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 11,
        letterSpacing: "0.16em", textTransform: "uppercase",
        padding: "7px 16px", borderRadius: 40,
        background: activeCategory === null ? "#0F0F0F" : "transparent",
        color: activeCategory === null ? "#FFFFFF" : "#5a5a5a",
        border: "1.5px solid " + (activeCategory === null ? "#0F0F0F" : "#DDD8CF"),
        cursor: "pointer", transition: "all 0.18s",
      }}>All</button>

      <div style={{ width: 1, height: 18, background: "#DDD8CF" }} />

      {cats.map((cat) => {
        const { icon, color, bg, label } = CAT_CFG[cat];
        const active = activeCategory === cat;
        return (
          <button key={cat} onClick={() => onChange(active ? null : cat)} style={{
            fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 11,
            letterSpacing: "0.13em", textTransform: "uppercase",
            padding: "7px 14px", borderRadius: 40,
            display: "flex", alignItems: "center", gap: 6,
            background: active ? bg : "transparent",
            color: active ? "#FFFFFF" : "#5a5a5a",
            border: "1.5px solid " + (active ? bg : "#DDD8CF"),
            cursor: "pointer", transition: "all 0.18s",
          }}
          onMouseEnter={(e) => { if (!active) { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; } }}
          onMouseLeave={(e) => { if (!active) { e.currentTarget.style.borderColor = "#DDD8CF"; e.currentTarget.style.color = "#5a5a5a"; } }}
          >
            <span style={{ color: active ? "#fff" : color, display: "flex" }}>{icon}</span>
            {label}
          </button>
        );
      })}
    </div>
  );
}
