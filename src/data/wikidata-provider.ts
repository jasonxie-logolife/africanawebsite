import { PointOfInterest, POIType } from "./expanded-africa-legend";
import { FALLBACK_COUNTRIES, FALLBACK_POIS } from "./fallback-data";

export interface AfricanCountry {
  name: string;
  wikidataId: string;
  description?: string;
  capital?: {
    name: string;
    lat: number;
    lng: number;
    description?: string;
    wikidataId?: string;
  };
  center?: {
    lat: number;
    lng: number;
  };
}

const WDQS_ENDPOINT = "/api/wdqs";
const PREFIXES = `
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wikibase: <http://wikibase.sparql.endpoint#>
PREFIX bd: <http://www.bigdata.com/rdf#>
PREFIX schema: <http://schema.org/>
`;

function parseWktPoint(wkt: string): { lat: number; lng: number } | null {
  const m = /Point\(([-\d.]+)\s+([-\d.]+)\)/.exec(wkt);
  if (!m) return null;
  const lng = Number(m[1]);
  const lat = Number(m[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

function qidFromEntityUri(uri: string): string {
  const m = /\/entity\/(Q\d+)/.exec(uri);
  return m?.[1] || uri;
}

async function sparql<T = any>(query: string): Promise<T[]> {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  
  // Try proxy endpoint first
  const makeProxyUrl = () => {
    const u = new URL(WDQS_ENDPOINT, window.location.origin);
    u.searchParams.set("query", query);
    return u.toString();
  };

  // Direct Wikidata endpoint as fallback
  const makeDirectUrl = () => {
    return "https://query.wikidata.org/sparql?format=json&query=" + encodeURIComponent(query);
  };

  let lastError: any = null;
  
  // Try proxy first (3 attempts)
  for (let i = 0; i < 3; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(makeProxyUrl(), {
        headers: { Accept: "application/sparql-results+json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const bindings = json?.results?.bindings;
        if (!Array.isArray(bindings)) return [];
        return bindings as T[];
      }

      if ([429, 500, 502, 503, 504].includes(res.status)) {
        lastError = new Error(`Wikidata query failed (${res.status})`);
        await sleep(500 * Math.pow(2, i));
        continue;
      }

      throw new Error(`Wikidata query failed (${res.status})`);
    } catch (e: any) {
      lastError = e;
      if (e.name === 'AbortError') {
        lastError = new Error("Wikidata query timeout");
      }
      await sleep(500 * Math.pow(2, i));
    }
  }

  // If proxy failed, try direct Wikidata (2 attempts)
  for (let i = 0; i < 2; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(makeDirectUrl(), {
        headers: { 
          Accept: "application/sparql-results+json",
          "User-Agent": "AfricanaExplorer/1.0"
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const bindings = json?.results?.bindings;
        if (!Array.isArray(bindings)) return [];
        return bindings as T[];
      }

      if ([429, 500, 502, 503, 504].includes(res.status)) {
        await sleep(1000 * Math.pow(2, i));
        continue;
      }
    } catch (e: any) {
      lastError = e;
      await sleep(1000 * Math.pow(2, i));
    }
  }

  throw lastError || new Error("All Wikidata query attempts failed");
}

function getCache(key: string): any | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof (parsed as any).expiresAt !== "number") return null;
    if (Date.now() > (parsed as any).expiresAt) return null;
    return (parsed as any).value;
  } catch {
    return null;
  }
}

function setCache(key: string, value: any, ttlMs: number) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        expiresAt: Date.now() + ttlMs,
      })
    );
  } catch {
    return;
  }
}
export async function fetchAfricanCountries(): Promise<AfricanCountry[]> {
  const cacheKey = "africana_wdqs_countries_v3";
  const cached = getCache(cacheKey);
  if (cached) return cached as AfricanCountry[];

  const query = `${PREFIXES}
SELECT ?country ?countryLabel ?capital ?capitalLabel ?capitalCoord WHERE {
  ?country wdt:P30 wd:Q15 .
  ?country wdt:P31 wd:Q3624078 .
  OPTIONAL { 
    ?country wdt:P36 ?capital .
    ?capital wdt:P625 ?capitalCoord .
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 60
`;

  try {
    const rows = await sparql<any>(query);
    const countries: AfricanCountry[] = [];

    for (const r of rows) {
      const countryUri = r.country?.value;
      const capitalUri = r.capital?.value;
      if (!countryUri) continue;

      const countryName = r.countryLabel?.value || qidFromEntityUri(countryUri);
      const countryQid = qidFromEntityUri(countryUri);

      const capitalName = r.capitalLabel?.value;
      const capitalCoordWkt = r.capitalCoord?.value;
      const capCoord = capitalCoordWkt ? parseWktPoint(capitalCoordWkt) : null;

      const c: AfricanCountry = {
        name: countryName,
        wikidataId: countryQid,
        description: `Country in Africa`,
        center: capCoord || undefined,
      };

      if (capitalName && capCoord) {
        c.capital = {
          name: capitalName,
          lat: capCoord.lat,
          lng: capCoord.lng,
          description: `Capital of ${countryName}`,
          wikidataId: capitalUri ? qidFromEntityUri(capitalUri) : undefined,
        };
      }

      countries.push(c);
    }

    const unique = new Map<string, AfricanCountry>();
    for (const c of countries) {
      if (!unique.has(c.wikidataId)) unique.set(c.wikidataId, c);
    }

    const list = Array.from(unique.values()).sort((a, b) => a.name.localeCompare(b.name));
    
    if (list.length === 0) {
      setCache(cacheKey, FALLBACK_COUNTRIES, 1 * 60 * 60 * 1000);
      return FALLBACK_COUNTRIES;
    }
    
    setCache(cacheKey, list, 30 * 24 * 60 * 60 * 1000);
    return list;
  } catch (error) {
    setCache(cacheKey, FALLBACK_COUNTRIES, 1 * 60 * 60 * 1000);
    return FALLBACK_COUNTRIES;
  }
}

function countryPOICacheKey(countryQid: string) {
  return `africana_wdqs_pois_v2_${countryQid}`;
}

export async function fetchCountryPOIs(country: AfricanCountry): Promise<PointOfInterest[]> {
  const cacheKey = countryPOICacheKey(country.wikidataId);
  const cached = getCache(cacheKey);
  if (cached) return cached as PointOfInterest[];

  const query = `${PREFIXES}
SELECT ?item ?itemLabel ?itemDescription ?coord ?article ?category WHERE {
  VALUES ?country { wd:${country.wikidataId} }

  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31/wdt:P279* wd:Q33506 .
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("museum" AS ?category)
    } LIMIT 100
  }
  UNION
  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31/wdt:P279* wd:Q4989906 .
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("monument" AS ?category)
    } LIMIT 100
  }
  UNION
  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31/wdt:P279* wd:Q515 .
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("major-city" AS ?category)
    } LIMIT 80
  }
  UNION
  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31/wdt:P279* wd:Q9259 .
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("historical-site" AS ?category)
    } LIMIT 100
  }
  UNION
  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31/wdt:P279* wd:Q40080 .
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("beach" AS ?category)
    } LIMIT 80
  }
  UNION
  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31/wdt:P279* wd:Q37654 .
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("market" AS ?category)
    } LIMIT 80
  }
  UNION
  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord .
      ?item wdt:P31/wdt:P279* ?inst .
      VALUES ?inst { wd:Q46169 wd:Q34038 wd:Q8502 wd:Q23397 wd:Q658 wd:Q4421 }
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("natural-resource" AS ?category)
    } LIMIT 100
  }
  UNION
  {
    SELECT ?item ?coord ?article ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord .
      ?item wdt:P31/wdt:P279* ?inst .
      VALUES ?inst { wd:Q2424752 wd:Q1007870 wd:Q24354 wd:Q18127 }
      OPTIONAL { ?article schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
      BIND("cultural-center" AS ?category)
    } LIMIT 100
  }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
`;

  const rows = await sparql<any>(query);

  const pois: PointOfInterest[] = [];
  const seen = new Set<string>();

  for (const r of rows) {
    const itemUri = r.item?.value;
    const coordWkt = r.coord?.value;
    const category = (r.category?.value as POIType | undefined) || undefined;
    if (!itemUri || !coordWkt || !category) continue;

    const coord = parseWktPoint(coordWkt);
    if (!coord) continue;

    const qid = qidFromEntityUri(itemUri);
    const key = `${qid}-${category}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const name = r.itemLabel?.value || qid;
    const desc = r.itemDescription?.value || "";
    const article = r.article?.value as string | undefined;

    pois.push({
      id: `${country.wikidataId}-${qid}-${category}`,
      name,
      type: category,
      country: country.name,
      lat: coord.lat,
      lng: coord.lng,
      description: desc || `Point of interest in ${country.name}.`,
      wikidataId: qid,
      wikipediaUrl: article,
    });
  }

  setCache(cacheKey, pois, 7 * 24 * 60 * 60 * 1000);
  return pois;
}

export async function fetchAfricaHighlights(): Promise<PointOfInterest[]> {
  const cacheKey = "africana_wdqs_highlights_v3";
  const cached = getCache(cacheKey);
  if (cached) return cached as PointOfInterest[];

  const query = `${PREFIXES}
SELECT ?item ?itemLabel ?coord ?countryLabel ?category WHERE {
  ?country wdt:P30 wd:Q15 .
  ?country wdt:P31 wd:Q3624078 .

  {
    SELECT ?item ?coord ?country ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31 wd:Q4989906 .
      BIND("monument" AS ?category)
    } LIMIT 100
  }
  UNION
  {
    SELECT ?item ?coord ?country ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31 wd:Q33506 .
      BIND("museum" AS ?category)
    } LIMIT 80
  }
  UNION
  {
    SELECT ?item ?coord ?country ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31 wd:Q9259 .
      BIND("historical-site" AS ?category)
    } LIMIT 100
  }
  UNION
  {
    SELECT ?item ?coord ?country ?category WHERE {
      ?item wdt:P17 ?country ; wdt:P625 ?coord ; wdt:P31 wd:Q8502 .
      BIND("natural-resource" AS ?category)
    } LIMIT 80
  }

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 400
`;

  try {
    const rows = await sparql<any>(query);
    const pois: PointOfInterest[] = [];
    const seen = new Set<string>();

    for (const r of rows) {
      const itemUri = r.item?.value;
      const coordWkt = r.coord?.value;
      const category = (r.category?.value as POIType | undefined) || undefined;
      const countryLabel = r.countryLabel?.value as string | undefined;
      if (!itemUri || !coordWkt || !category || !countryLabel) continue;
      const coord = parseWktPoint(coordWkt);
      if (!coord) continue;
      const qid = qidFromEntityUri(itemUri);
      const key = `${qid}-${category}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const name = r.itemLabel?.value || qid;

      pois.push({
        id: `africa-${qid}-${category}`,
        name,
        type: category,
        country: countryLabel,
        lat: coord.lat,
        lng: coord.lng,
        description: `${category} in ${countryLabel}`,
        wikidataId: qid,
      });
    }

    if (pois.length === 0) {
      setCache(cacheKey, FALLBACK_POIS, 1 * 60 * 60 * 1000); // Cache for 1 hour
      return FALLBACK_POIS;
    }

    setCache(cacheKey, pois, 14 * 24 * 60 * 60 * 1000);
    return pois;
  } catch (error) {
    setCache(cacheKey, FALLBACK_POIS, 1 * 60 * 60 * 1000); // Cache for 1 hour
    return FALLBACK_POIS;
  }
}
