export default async function handler(req: any, res: any) {
  try {
    const query = req?.query?.query;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Missing query" });
      return;
    }

    const endpoint =
      "https://query.wikidata.org/sparql?format=json&query=" +
      encodeURIComponent(query);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    let lastStatus = 500;
    for (let i = 0; i < 4; i++) {
      const r = await fetch(endpoint, {
        headers: {
          Accept: "application/sparql-results+json",
          "User-Agent": "AfricanaPlacesExplorer/1.0",
        },
      });

      lastStatus = r.status;

      if (r.ok) {
        const text = await r.text();
        res.setHeader("Content-Type", "application/sparql-results+json");
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=86400, max-age=300, stale-while-revalidate=604800"
        );
        res.status(200).send(text);
        return;
      }

      if ([429, 500, 502, 503, 504].includes(r.status)) {
        await sleep(350 * Math.pow(2, i));
        continue;
      }

      const errText = await r.text();
      res.status(r.status).send(errText);
      return;
    }

    res.status(502).json({ error: "Wikidata query failed", status: lastStatus });
  } catch (e: any) {
    res.status(502).json({ error: e?.message || "WDQS proxy error" });
  }
}
