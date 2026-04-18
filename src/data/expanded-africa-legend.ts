export type POIType =
  | "major-city"
  | "monument"
  | "museum"
  | "natural-resource"
  | "historical-site"
  | "beach"
  | "market"
  | "cultural-center";

export interface PointOfInterest {
  id: string;
  name: string;
  type: POIType;
  country: string;
  lat: number;
  lng: number;
  description: string;
  culturalSignificance?: string;

  wikidataId?: string;
  wikipediaUrl?: string;
  googleMapsUrl?: string;
  googlePlaceId?: string;
}

export const POI_TYPE_LABELS: Record<POIType, string> = {
  "major-city": "Major Cities",
  "monument": "Monuments & Landmarks",
  "museum": "Museums",
  "natural-resource": "Natural Sites",
  "historical-site": "Historical Sites",
  "beach": "Beaches & Coasts",
  "market": "Markets",
  "cultural-center": "Cultural Centers",
};

export const POI_TYPE_COLORS: Record<POIType, string> = {
  "major-city": "#ef4444",
  "monument": "#f59e0b",
  "museum": "#3b82f6",
  "natural-resource": "#16a34a",
  "historical-site": "#8b5cf6",
  "beach": "#06b6d4",
  "market": "#10b981",
  "cultural-center": "#ec4899",
};
