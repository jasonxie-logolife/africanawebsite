// src/app/components/EnhancedAfricaMap.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Skeleton } from "./ui/skeleton";
import { AlertCircle, MapPin, Maximize2, Search, ZoomIn, ZoomOut } from "lucide-react";

// Ref buckets for imperative animated arc lines
type ArcRefs = {
  polylines: google.maps.Polyline[];
  intervals: ReturnType<typeof setInterval>[];
};
import { POIType, PointOfInterest, POI_TYPE_COLORS, POI_TYPE_LABELS } from "@/data/expanded-africa-legend";
import { AfricanCountry, fetchAfricaHighlights, fetchAfricanCountries, fetchCountryPOIs } from "@/data/wikidata-provider";
import { GOOGLE_MAPS_API_KEY } from "@/config/maps";
import { STORIES, CATEGORY_COUNTRIES, CATEGORY_META, DIASPORA_COUNTRY_COORDS, Story, StoryCategory, DiasporaDestination } from "@/data/stories-data";
import { CategoryFilterBar } from "./CategoryFilterBar";
import { StoryPanel } from "./StoryPanel";
import { PlaceDetailsPanel } from "./PlaceDetailsPanel";

const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };
const AFRICA_CENTER = { lat: 1.5, lng: 20.0 };
const GOOGLE_MAPS_LIBRARIES: ["places"] = ["places"];

const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: "all",            elementType: "labels.text.fill",   stylers: [{ color: "#ffffff" }] },
  { featureType: "all",            elementType: "labels.text.stroke", stylers: [{ color: "#000000" }, { lightness: 13 }] },
  { featureType: "administrative", elementType: "geometry.fill",      stylers: [{ color: "#000000" }] },
  { featureType: "administrative", elementType: "geometry.stroke",    stylers: [{ color: "#144b53" }, { lightness: 14 }, { weight: 1.4 }] },
  { featureType: "landscape",      elementType: "all",                stylers: [{ color: "#08304b" }] },
  { featureType: "poi",            elementType: "geometry",           stylers: [{ color: "#0c4152" }, { lightness: 5 }] },
  { featureType: "road.highway",   elementType: "geometry.fill",      stylers: [{ color: "#000000" }] },
  { featureType: "road.highway",   elementType: "geometry.stroke",    stylers: [{ color: "#0b434f" }, { lightness: 25 }] },
  { featureType: "road.arterial",  elementType: "geometry.fill",      stylers: [{ color: "#000000" }] },
  { featureType: "road.arterial",  elementType: "geometry.stroke",    stylers: [{ color: "#0b3d51" }, { lightness: 16 }] },
  { featureType: "road.local",     elementType: "geometry",           stylers: [{ color: "#000000" }] },
  { featureType: "transit",        elementType: "all",                stylers: [{ color: "#146474" }] },
  { featureType: "water",          elementType: "all",                stylers: [{ color: "#021019" }] },
];

function searchLocal(query: string, pois: PointOfInterest[]): PointOfInterest[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return pois
    .filter((p) => `${p.name} ${p.country} ${p.description} ${p.type}`.toLowerCase().includes(q))
    .slice(0, 12);
}

interface EnhancedAfricaMapProps { initialCategory?: import("@/data/stories-data").StoryCategory | null; autoOpenStory?: boolean; }
export function EnhancedAfricaMap({ initialCategory, autoOpenStory }: EnhancedAfricaMapProps = {}) {
  const mapRef  = useRef<google.maps.Map | null>(null);
  const arcRefs = useRef<ArcRefs>({ polylines: [], intervals: [] });

  const clearArcs = useCallback(() => {
    arcRefs.current.intervals.forEach(clearInterval);
    arcRefs.current.polylines.forEach((p) => p.setMap(null));
    arcRefs.current = { polylines: [], intervals: [] };
  }, []);

  const [countries,          setCountries]          = useState<AfricanCountry[]>([]);
  const [loadingCountries,   setLoadingCountries]   = useState(true);
  const [countryError,       setCountryError]       = useState<string | null>(null);
  const [highlights,         setHighlights]         = useState<PointOfInterest[]>([]);
  const [countryPois,        setCountryPois]        = useState<Record<string, PointOfInterest[]>>({});
  const [loadingCountryPois, setLoadingCountryPois] = useState<Record<string, boolean>>({});
  const [selectedCountry,    setSelectedCountry]    = useState("all");
  const [selectedTypes,      setSelectedTypes]      = useState<Set<POIType>>(
    new Set(Object.keys(POI_TYPE_LABELS) as POIType[])
  );
  const [selectedPOI,  setSelectedPOI]  = useState<PointOfInterest | null>(null);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [searchResults,setSearchResults]= useState<PointOfInterest[]>([]);
  const [showSearch,   setShowSearch]   = useState(false);
  const [activeCategory, setActiveCategory] = useState<StoryCategory | null>(initialCategory ?? null);
  const [selectedStory,  setSelectedStory]  = useState<Story | null>(() => {
    // If landing card was clicked, auto-open the story for that category
    if (autoOpenStory && initialCategory) {
      return STORIES.find((s) => s.category === initialCategory) ?? null;
    }
    return null;
  });
  const [sidebarOpen,    setSidebarOpen]    = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingCountries(true);
        setCountryError(null);
        const list = await fetchAfricanCountries();
        if (!cancelled) setCountries(list);
      } catch (e: any) {
        if (!cancelled) setCountryError(e?.message || "Failed to load countries.");
      } finally {
        if (!cancelled) setLoadingCountries(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchAfricaHighlights();
        if (!cancelled) setHighlights(res);
      } catch {
        if (!cancelled) setHighlights([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const selectedCountryObj = useMemo(
    () => selectedCountry === "all" ? null : (countries.find((c) => c.name === selectedCountry) ?? null),
    [countries, selectedCountry]
  );

  useEffect(() => {
    if (!selectedCountryObj) return;
    const key = selectedCountryObj.wikidataId;
    if (countryPois[key]?.length || loadingCountryPois[key]) return;
    let cancelled = false;
    setLoadingCountryPois((p) => ({ ...p, [key]: true }));
    fetchCountryPOIs(selectedCountryObj)
      .then((res) => { if (!cancelled) setCountryPois((p) => ({ ...p, [key]: res })); })
      .catch(() => { if (!cancelled) setCountryPois((p) => ({ ...p, [key]: [] })); })
      .finally(() => { if (!cancelled) setLoadingCountryPois((p) => ({ ...p, [key]: false })); });
    return () => { cancelled = true; };
  }, [selectedCountryObj]); // eslint-disable-line react-hooks/exhaustive-deps

  const capitals = useMemo<PointOfInterest[]>(() =>
    countries
      .filter((c) => c.capital && Number.isFinite(c.capital.lat) && Number.isFinite(c.capital.lng))
      .map((c) => ({
        id: `capital-${c.wikidataId}`, name: c.capital!.name,
        type: "major-city" as POIType, country: c.name,
        lat: c.capital!.lat, lng: c.capital!.lng,
        description: `Capital of ${c.name}.`, wikidataId: c.capital!.wikidataId,
      })),
    [countries]
  );

  const allPOIs = useMemo(() => {
    const base = [...capitals, ...highlights];
    if (selectedCountryObj) {
      return [...base, ...(countryPois[selectedCountryObj.wikidataId] || [])];
    }
    return base;
  }, [capitals, highlights, selectedCountryObj, countryPois]);

  const visiblePOIs = useMemo(() => {
    let filtered = allPOIs;
    if (selectedCountryObj) filtered = filtered.filter((p) => p.country === selectedCountryObj.name);
    return filtered.filter((p) => selectedTypes.has(p.type));
  }, [allPOIs, selectedCountryObj, selectedTypes]);

  const highlightedNames = useMemo(
    () => (activeCategory ? CATEGORY_COUNTRIES[activeCategory] : []),
    [activeCategory]
  );

  const highlightMarkers = useMemo(() => {
    if (!activeCategory) return [];
    return highlightedNames.map((name) => {
      const african = countries.find((c) => c.name === name);
      if (african?.capital) return { name, lat: african.capital.lat, lng: african.capital.lng };
      if (african?.center)  return { name, lat: african.center.lat,  lng: african.center.lng  };
      const coords = DIASPORA_COUNTRY_COORDS[name];
      return coords ? { name, lat: coords.lat, lng: coords.lng } : null;
    }).filter(Boolean) as Array<{ name: string; lat: number; lng: number }>;
  }, [activeCategory, highlightedNames, countries]);

  // ── Auto-fit the map to a set of lat/lng points with padding ──────────────
  const fitToPoints = useCallback((
    points: Array<{ lat: number; lng: number }>,
    paddingPx = 80
  ) => {
    const map = mapRef.current;
    if (!map || points.length === 0) return;
    if (points.length === 1) {
      map.panTo(points[0]);
      map.setZoom(5);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    points.forEach((p) => bounds.extend(p));
    // Right panel is ~370px wide — offset the padding so content isn't hidden behind it
    map.fitBounds(bounds, {
      top:    paddingPx,
      bottom: paddingPx,
      left:   paddingPx,
      right:  paddingPx + 370,
    });
  }, []);

  const handleHighlightClick = useCallback((countryName: string) => {
    if (!activeCategory) return;
    const origin = STORIES.find((s) => s.category === activeCategory && s.originCountry === countryName);
    if (origin) {
      setSelectedStory(origin);
      // Fit to origin + all diaspora destinations
      fitToPoints([
        { lat: origin.originLat, lng: origin.originLng },
        ...origin.diasporaDestinations.map((d) => ({ lat: d.lat, lng: d.lng })),
      ]);
      return;
    }
    const diaspora = STORIES.find(
      (s) => s.category === activeCategory && s.diasporaDestinations.some((d) => d.countryName === countryName)
    );
    if (diaspora) {
      setSelectedStory(diaspora);
      fitToPoints([
        { lat: diaspora.originLat, lng: diaspora.originLng },
        ...diaspora.diasporaDestinations.map((d) => ({ lat: d.lat, lng: d.lng })),
      ]);
    }
  }, [activeCategory, fitToPoints]);

  const handlePOIClick = useCallback((poi: PointOfInterest) => {
    setSelectedPOI(poi);
    setSelectedStory(null);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: poi.lat, lng: poi.lng });
      if ((mapRef.current.getZoom() ?? 4) < 8) mapRef.current.setZoom(10);
    }
  }, []);

  const handleDiasporaSelect = useCallback((dest: DiasporaDestination) => {
    if (!mapRef.current) return;
    mapRef.current.panTo({ lat: dest.lat, lng: dest.lng });
    mapRef.current.setZoom(5);
  }, []);

  const handleCategoryChange = useCallback((cat: StoryCategory | null) => {
    setActiveCategory(cat);
    setSelectedStory(null);
    setSelectedPOI(null);
  }, []);

  // When category changes, fit map to show all highlighted markers ───────────
  useEffect(() => {
    if (!activeCategory || highlightMarkers.length === 0) {
      // Reset to Africa view when category is cleared
      if (!activeCategory && mapRef.current) {
        mapRef.current.setCenter(AFRICA_CENTER);
        mapRef.current.setZoom(4);
      }
      return;
    }
    // Small delay so markers have rendered before we fit
    const id = setTimeout(() => {
      fitToPoints(highlightMarkers, 80);
    }, 150);
    return () => clearTimeout(id);
  }, [activeCategory, highlightMarkers, fitToPoints]);

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); setShowSearch(false); return; }
    setSearchResults(searchLocal(searchQuery, allPOIs));
    setShowSearch(true);
  }, [searchQuery, allPOIs]);


  // ── Animated arc lines (imperative — React Polyline can't do frame-by-frame) ─
  useEffect(() => {
    clearArcs();
    const map = mapRef.current;
    if (!selectedStory || !map) return;

    const color = CATEGORY_META[selectedStory.category].color;

    selectedStory.diasporaDestinations.forEach((dest) => {
      // Base faint line
      const baseLine = new google.maps.Polyline({
        path: [
          { lat: selectedStory.originLat, lng: selectedStory.originLng },
          { lat: dest.lat, lng: dest.lng },
        ],
        geodesic:       true,
        strokeColor:    color,
        strokeOpacity:  0.15,
        strokeWeight:   1.5,
        map,
      });

      // Animated dashes flowing along the route
      const flowLine = new google.maps.Polyline({
        path: [
          { lat: selectedStory.originLat, lng: selectedStory.originLng },
          { lat: dest.lat, lng: dest.lng },
        ],
        geodesic:       true,
        strokeOpacity:  0,       // hide solid stroke; icons do the work
        strokeWeight:   0,
        icons: [
          {
            // flowing dot
            icon: {
              path:          google.maps.SymbolPath.CIRCLE,
              fillColor:     color,
              fillOpacity:   1,
              strokeColor:   "#ffffff",
              strokeWeight:  1.5,
              scale:         5,
            },
            offset: "0%",
          },
          {
            // dashed trail
            icon: {
              path:           "M 0,-1 0,1",
              strokeOpacity:  0.5,
              strokeColor:    color,
              strokeWeight:   2,
              scale:          3,
            },
            offset:  "0",
            repeat:  "18px",
          },
        ],
        map,
      });

      arcRefs.current.polylines.push(baseLine, flowLine);

      // Animate the dot along the line
      let pct = 0;
      const intervalId = setInterval(() => {
        pct = (pct + 0.4) % 100;
        const icons = flowLine.get("icons") as google.maps.IconSequence[];
        icons[0].offset = pct + "%";
        flowLine.set("icons", icons);
      }, 20);

      arcRefs.current.intervals.push(intervalId);
    });

    return () => clearArcs();
  }, [selectedStory, clearArcs]);

  const onLoad    = useCallback((m: google.maps.Map) => { mapRef.current = m; }, []);
  const onUnmount = useCallback(() => { mapRef.current = null; }, []);
  const zoomIn    = useCallback(() => mapRef.current?.setZoom((mapRef.current.getZoom() ?? 4) + 1), []);
  const zoomOut   = useCallback(() => mapRef.current?.setZoom((mapRef.current.getZoom() ?? 4) - 1), []);
  const resetView = useCallback(() => { mapRef.current?.setCenter(AFRICA_CENTER); mapRef.current?.setZoom(4); }, []);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Google Maps API key missing</AlertTitle>
          <AlertDescription>
            Add <code>VITE_GOOGLE_MAPS_API_KEY=your_key</code> to a <code>.env</code> file and restart.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Map failed to load</AlertTitle>
          <AlertDescription>{loadError.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-[#021019]">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-48" />
          <p className="text-xs text-white/40">Loading map…</p>
        </div>
      </div>
    );
  }


  return (
    <div style={{ height: "100%", width: "100%", display: "flex", background: "#0a0e14", position: "relative", overflow: "hidden" }}>

      {/* ── Sidebar toggle ── */}
      <button
        onClick={() => setSidebarOpen((o) => !o)}
        style={{
          position: "absolute",
          left: sidebarOpen ? 290 : 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 30,
          width: 22,
          height: 60,
          background: "#F7F3ED",
          border: "1px solid #DDD8CF",
          borderLeft: "none",
          borderRadius: "0 8px 8px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#5a5a5a",
          fontSize: 12,
          fontWeight: 700,
          transition: "left 0.35s cubic-bezier(0.22,1,0.36,1)",
          flexShrink: 0,
          boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
        }}
        title={sidebarOpen ? "Hide" : "Show filters"}
      >
        {sidebarOpen ? "‹" : "›"}
      </button>

      {/* ── SIDEBAR — cream/light editorial ── */}
      <div style={{
        width: sidebarOpen ? 290 : 0,
        flexShrink: 0,
        overflow: "hidden",
        transition: "width 0.35s cubic-bezier(0.22,1,0.36,1)",
        background: "#F7F3ED",
        borderRight: "2px solid #0F0F0F",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ width: 290, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Sidebar header */}
          <div style={{
            padding: "18px 18px 14px",
            flexShrink: 0,
            background: "#0F0F0F",
          }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "0.1em", color: "#FFFFFF", lineHeight: 1 }}>EXPLORE PLACES</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 5, fontWeight: 600 }}>Filter · Search · Discover</div>
          </div>

          {/* Kente mini-stripe */}
          <div className="kente-stripe" style={{ height: 4, flexShrink: 0 }} />

          {/* Scrollable content */}
          <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "16px 16px 0" }}>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Search style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "#C85530" }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places…"
                style={{
                  width: "100%",
                  padding: "9px 12px 9px 33px",
                  background: "#FFFFFF",
                  border: "1.5px solid #DDD8CF",
                  borderRadius: 6,
                  color: "#0F0F0F",
                  fontSize: 13,
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#C85530")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#DDD8CF")}
              />
              {showSearch && searchResults.length > 0 && (
                <div style={{ position: "absolute", top: "100%", marginTop: 4, width: "100%", background: "#fff", border: "1.5px solid #DDD8CF", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 50, maxHeight: 220, overflow: "auto" }}>
                  {searchResults.map((p) => (
                    <div key={p.id}
                      onClick={() => { handlePOIClick(p); setSearchQuery(""); setShowSearch(false); }}
                      style={{ padding: "9px 13px", cursor: "pointer", borderBottom: "1px solid #F0EBE4", display: "flex", alignItems: "center", gap: 10 }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FDF5F0")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C85530", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#0F0F0F" }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>{p.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Country */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C85530", marginBottom: 7, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "inline-block", width: 14, height: 1.5, background: "#C85530" }} />
                Country
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger style={{ background: "#FFFFFF", border: "1.5px solid #DDD8CF", borderRadius: 6, color: "#0F0F0F", height: 36, fontSize: 12, fontFamily: "var(--font-body)" }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: "#fff", border: "1.5px solid #DDD8CF" }}>
                  <SelectItem value="all" style={{ color: "#0F0F0F" }}>All Countries</SelectItem>
                  {loadingCountries ? (
                    <SelectItem value="__loading" disabled style={{ color: "#999" }}>Loading…</SelectItem>
                  ) : countryError ? (
                    <SelectItem value="__error" disabled style={{ color: "#C85530" }}>Error loading</SelectItem>
                  ) : countries.map((c) => (
                    <SelectItem key={c.wikidataId} value={c.name} style={{ color: "#0F0F0F" }}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* POI Types */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A6B3C", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 14, height: 1.5, background: "#1A6B3C" }} />
                  Place Types
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["All", () => setSelectedTypes(new Set(Object.keys(POI_TYPE_LABELS) as POIType[]))], ["None", () => setSelectedTypes(new Set())]].map(([label, fn]) => (
                    <button key={label as string} onClick={fn as () => void}
                      style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F0F")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
                    >{label as string}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {(Object.keys(POI_TYPE_LABELS) as POIType[]).map((type) => {
                  const active = selectedTypes.has(type);
                  return (
                    <button key={type}
                      onClick={() => setSelectedTypes((prev) => {
                        const next = new Set(prev);
                        next.has(type) ? next.delete(type) : next.add(type);
                        return next;
                      })}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "7px 10px",
                        borderRadius: 6,
                        border: "1.5px solid " + (active ? POI_TYPE_COLORS[type] + "60" : "#DDD8CF"),
                        borderLeft: "3px solid " + (active ? POI_TYPE_COLORS[type] : "#DDD8CF"),
                        background: active ? POI_TYPE_COLORS[type] + "14" : "#FFFFFF",
                        cursor: "pointer", textAlign: "left", transition: "all 0.15s", width: "100%",
                      }}
                    >
                      <div style={{ width: 9, height: 9, borderRadius: "50%", background: active ? POI_TYPE_COLORS[type] : "#CCC", flexShrink: 0, transition: "background 0.15s" }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: active ? "#0F0F0F" : "#777", transition: "color 0.15s" }}>
                        {POI_TYPE_LABELS[type]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Places list */}
            <div style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4860A", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 14, height: 1.5, background: "#D4860A" }} />
                  Places
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#999", background: "#E8E3DC", padding: "2px 8px", borderRadius: 20 }}>
                  {visiblePOIs.length}
                </span>
              </div>

              {visiblePOIs.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0", gap: 8, opacity: 0.5 }}>
                  <MapPin style={{ width: 22, height: 22, color: "#C85530" }} />
                  <p style={{ fontSize: 12, color: "#999", textAlign: "center", margin: 0 }}>No places match filters</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingBottom: 20 }}>
                  {visiblePOIs.map((poi) => {
                    const isActive = selectedPOI?.id === poi.id;
                    return (
                      <div key={poi.id}
                        onClick={() => handlePOIClick(poi)}
                        style={{
                          padding: "10px 11px",
                          borderRadius: 7,
                          border: "1.5px solid " + (isActive ? POI_TYPE_COLORS[poi.type] : "#E8E3DC"),
                          borderLeft: "3px solid " + (isActive ? POI_TYPE_COLORS[poi.type] : "#DDD8CF"),
                          background: isActive ? POI_TYPE_COLORS[poi.type] + "12" : "#FFFFFF",
                          cursor: "pointer", transition: "all 0.15s",
                          boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) { e.currentTarget.style.background = "#FDF8F4"; e.currentTarget.style.borderColor = "#C8B8A8"; }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.borderColor = "#E8E3DC"; }
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 6, background: POI_TYPE_COLORS[poi.type] + "20", border: "1px solid " + POI_TYPE_COLORS[poi.type] + "40", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <MapPin style={{ width: 13, height: 13, color: POI_TYPE_COLORS[poi.type] }} />
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#0F0F0F", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>
                              {poi.name}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: POI_TYPE_COLORS[poi.type], background: POI_TYPE_COLORS[poi.type] + "18", padding: "1px 6px", borderRadius: 3 }}>
                                {POI_TYPE_LABELS[poi.type]}
                              </span>
                              <span style={{ fontSize: 10, color: "#999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{poi.country}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAP AREA ── */}
      <div style={{ flex: 1, position: "relative", minWidth: 0 }}>

        {/* Category filter — floating pill on map */}
        <div style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
          <div style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            border: "2px solid #0F0F0F",
            borderRadius: 50,
            padding: "7px 14px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          }}>
            <CategoryFilterBar activeCategory={activeCategory} onChange={handleCategoryChange} />
          </div>
        </div>

        {/* Map controls */}
        <div style={{ position: "absolute", top: 14, right: 14, zIndex: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ background: "rgba(255,255,255,0.95)", border: "1.5px solid #DDD8CF", borderRadius: 8, padding: "5px 6px", display: "flex", gap: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
            {(["roadmap", "satellite", "terrain"] as const).map((s) => (
              <button key={s} onClick={() => mapRef.current?.setMapTypeId(s)}
                style={{ fontSize: 10, padding: "4px 8px", borderRadius: 5, background: "transparent", border: "none", color: "#5a5a5a", cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", transition: "all 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0F0F0F"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#5a5a5a"; }}
              >
                {s === "roadmap" ? "Road" : s === "satellite" ? "Sat" : "Terrain"}
              </button>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.95)", border: "1.5px solid #DDD8CF", borderRadius: 8, padding: 4, display: "flex", flexDirection: "column", gap: 2, boxShadow: "0 2px 10px rgba(0,0,0,0.15)" }}>
            <Button variant="ghost" size="icon" onClick={zoomIn}    className="w-full h-8 hover:bg-gray-100 rounded-lg" style={{ color: "#0F0F0F" }}><ZoomIn    className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={zoomOut}   className="w-full h-8 hover:bg-gray-100 rounded-lg" style={{ color: "#0F0F0F" }}><ZoomOut   className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={resetView} className="w-full h-8 hover:bg-gray-100 rounded-lg" style={{ color: "#0F0F0F" }}><Maximize2 className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Hint */}
        {activeCategory && !selectedStory && (
          <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none" }}>
            <div style={{ background: "rgba(255,255,255,0.92)", border: "1.5px solid #DDD8CF", borderRadius: 50, padding: "7px 18px", fontSize: 11, color: "#5a5a5a", whiteSpace: "nowrap", fontWeight: 600, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>
              Click a highlighted marker to explore its story
            </div>
          </div>
        )}

        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={AFRICA_CENTER}
          zoom={4}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{ disableDefaultUI: true, gestureHandling: "greedy", scrollwheel: true, styles: DARK_MAP_STYLES }}
        >
          {visiblePOIs.map((poi) => (
            <Marker key={poi.id} position={{ lat: poi.lat, lng: poi.lng }} onClick={() => handlePOIClick(poi)} title={poi.name}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: POI_TYPE_COLORS[poi.type],
                fillOpacity: activeCategory ? 0.2 : (selectedPOI?.id === poi.id ? 1 : 0.8),
                strokeColor: "#ffffff", strokeWeight: selectedPOI?.id === poi.id ? 3 : 1.5,
                scale: selectedPOI?.id === poi.id ? 12 : 7,
              }}
            />
          ))}
          {activeCategory && highlightMarkers.map((hm) => {
            const { color } = CATEGORY_META[activeCategory];
            const isSelected = selectedStory?.originCountry === hm.name ||
              selectedStory?.diasporaDestinations.some((d) => d.countryName === hm.name);
            return (
              <Marker key={`hl-${hm.name}`} position={{ lat: hm.lat, lng: hm.lng }}
                onClick={() => handleHighlightClick(hm.name)} title={hm.name} zIndex={10}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: color, fillOpacity: isSelected ? 1 : 0.75,
                  strokeColor: "#ffffff", strokeWeight: isSelected ? 3 : 2,
                  scale: isSelected ? 18 : 13,
                }}
              />
            );
          })}
        </GoogleMap>

        {selectedStory && (
          <StoryPanel story={selectedStory} onClose={() => setSelectedStory(null)} onDiasporaSelect={handleDiasporaSelect} />
        )}
        {selectedPOI && !selectedStory && (
          <PlaceDetailsPanel place={selectedPOI} onClose={() => setSelectedPOI(null)} enableLiveReviews={false} />
        )}
      </div>
    </div>
  );
}
