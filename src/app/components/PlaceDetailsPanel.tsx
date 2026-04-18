// src/app/components/PlaceDetailsPanel.tsx
import { X, MapPin, ExternalLink, Globe, Tag } from "lucide-react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { PointOfInterest, POI_TYPE_LABELS, POI_TYPE_COLORS } from "@/data/expanded-africa-legend";

interface PlaceDetailsPanelProps {
  place: PointOfInterest;
  onClose: () => void;
  enableLiveReviews: boolean;
}

export function PlaceDetailsPanel({ place, onClose }: PlaceDetailsPanelProps) {
  const typeColor  = POI_TYPE_COLORS[place.type];
  const typeLabel  = POI_TYPE_LABELS[place.type];
  const wikiUrl    = place.wikidataId ? `https://www.wikidata.org/wiki/${place.wikidataId}` : null;
  const coordLabel = `${place.lat.toFixed(4)}, ${place.lng.toFixed(4)}`;

  return (
    <>
      <div className="absolute inset-0 z-10" onClick={onClose} />

      <div className="absolute right-0 top-0 bottom-0 z-20 w-[360px] flex flex-col bg-[#0d0d0d] border-l border-white/10 shadow-2xl">

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-white/10 shrink-0">
          <div className="flex-1 min-w-0 pr-3">
            <Badge
              className="mb-2 text-[11px] border-0"
              style={{ background: typeColor + "30", color: typeColor }}
            >
              {typeLabel}
            </Badge>
            <h2 className="text-lg font-semibold text-white leading-tight">{place.name}</h2>
            <p className="text-xs text-white/50 mt-1 flex items-center gap-1">
              <MapPin className="h-3 w-3 shrink-0" />
              {place.country}
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors mt-0.5 shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col gap-0">

            {/* ── Visual banner (type-colored, no broken image) ── */}
            <div
              className="w-full h-44 flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${typeColor}18 0%, ${typeColor}08 100%)`, borderBottom: `1px solid ${typeColor}20` }}
            >
              <div className="flex flex-col items-center gap-3 opacity-60">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: typeColor + "30" }}>
                  <Tag className="h-7 w-7" style={{ color: typeColor }} />
                </div>
                <span className="text-xs" style={{ color: typeColor }}>{typeLabel}</span>
              </div>
            </div>

            <div className="px-5 py-5 space-y-5">

              {/* ── About ── */}
              {place.description && (
                <div>
                  <p className="text-xs font-semibold text-white/90 mb-2">About</p>
                  <p className="text-sm text-white/65 leading-relaxed">{place.description}</p>
                </div>
              )}

              <Separator className="bg-white/8" />

              {/* ── Details ── */}
              <div>
                <p className="text-xs font-semibold text-white/90 mb-3">Details</p>
                <div className="space-y-2.5">

                  {/* Coordinates */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-white/35 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-white/35 mb-0.5">Coordinates</p>
                      <p className="text-xs text-white/70 font-mono">{coordLabel}</p>
                    </div>
                  </div>

                  {/* Wikipedia */}
                  {place.wikipediaUrl && (
                    <div className="flex items-start gap-2.5">
                      <Globe className="h-4 w-4 text-white/35 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] text-white/35 mb-0.5">Wikipedia</p>
                        <a
                          href={place.wikipediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors flex items-center gap-1"
                        >
                          Read full article
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Google Maps */}
                  {place.googleMapsUrl && (
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4 w-4 text-white/35 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] text-white/35 mb-0.5">Google Maps</p>
                        <a
                          href={place.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors flex items-center gap-1"
                        >
                          View on map
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Wikidata */}
                  {wikiUrl && (
                    <div className="flex items-start gap-2.5">
                      <ExternalLink className="h-4 w-4 text-white/35 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] text-white/35 mb-0.5">Source</p>
                        <a
                          href={wikiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/45 hover:text-white/70 hover:underline transition-colors flex items-center gap-1"
                        >
                          Wikidata · {place.wikidataId}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
