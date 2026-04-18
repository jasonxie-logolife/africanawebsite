import { defineConfig, loadEnv } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithRetry(url: string, init: RequestInit, attempts = 4) {
  let lastErr: any = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, init);
      if (res.ok) return res;
      if ([429, 500, 502, 503, 504].includes(res.status)) {
        await sleep(300 * Math.pow(2, i));
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e;
      await sleep(300 * Math.pow(2, i));
    }
  }
  throw lastErr || new Error("Request failed");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [k, v] of Object.entries(env)) {
    if (typeof v === "string") process.env[k] = v;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "dev-api",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url) return next();

            if (req.url.startsWith("/api/wdqs")) {
              try {
                const u = new URL(req.url, "http://localhost");
                const query = u.searchParams.get("query");
                if (!query) {
                  res.statusCode = 400;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Missing query" }));
                  return;
                }

                const endpoint =
                  "https://query.wikidata.org/sparql?format=json&query=" +
                  encodeURIComponent(query);

                const wdRes = await fetchWithRetry(endpoint, {
                  headers: {
                    Accept: "application/sparql-results+json",
                    "User-Agent": "AfricanaPlacesExplorer/1.0 (dev)",
                  },
                });

                res.statusCode = wdRes.status;
                res.setHeader("Content-Type", "application/sparql-results+json");
                res.setHeader("Cache-Control", "public, max-age=300");
                res.end(await wdRes.text());
              } catch (e: any) {
                res.statusCode = 502;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: e?.message || "WDQS proxy error" }));
              }
              return;
            }

            if (req.url.startsWith("/api/chat")) {
              if (req.method !== "POST") {
                res.statusCode = 405;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Method not allowed" }));
                return;
              }

              try {
                const apiKey = process.env.OPENAI_API_KEY;
                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "OPENAI_API_KEY is not set" }));
                  return;
                }

                const chunks: Buffer[] = [];
                await new Promise<void>((resolve) => {
                  req.on("data", (c) => chunks.push(Buffer.from(c)));
                  req.on("end", () => resolve());
                });

                const body = JSON.parse(Buffer.concat(chunks).toString("utf-8") || "{}");
                const messages = Array.isArray(body.messages) ? body.messages : [];
                const system = typeof body.system === "string" ? body.system : "";

                const payload = {
                  model: process.env.OPENAI_MODEL || "gpt-4o-mini",
                  messages: [{ role: "system", content: system }, ...messages],
                };

                const oaiRes = await fetchWithRetry(
                  "https://api.openai.com/v1/chat/completions",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify(payload),
                  },
                  3
                );

                const data = await oaiRes.json();
                const text = data?.choices?.[0]?.message?.content || "";

                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ reply: text }));
              } catch (e: any) {
                res.statusCode = 502;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: e?.message || "Chat proxy error" }));
              }
              return;
            }

            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
