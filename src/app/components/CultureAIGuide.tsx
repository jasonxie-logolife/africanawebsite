// CultureAIGuide — light editorial magazine style matching the rest of the site
import { useMemo, useRef, useState, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Sparkles, Loader2, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CultureAIGuideProps {
  projectId: string;
  publicAnonKey: string;
}

const STARTER_QUESTIONS = [
  "What was the University of Timbuktu?",
  "How did Yoruba music reach Cuba?",
  "Who was Imhotep and why does he matter?",
  "What crops did enslaved Africans bring to America?",
  "Tell me about the Kingdom of Mali",
  "What is the Great Zimbabwe?",
];

const SYSTEM_PROMPT = `You are an expert African historian, political analyst, and cultural educator for the Africana Digital Storytelling Archive. Your role is to serve as a personal African history tutor, guiding users through the continent's past and present with nuance and depth.

Your responses must follow this structured output format:
Summary: (1–2 sentence overview)
Detailed Explanation: (in-depth answer with examples, context, and stories)
Connections / Context: (link topic to wider African history, culture, or contemporary realities)
Key Facts: (3-5 bullet points of memorable facts)

Only answer questions about Africa and the African diaspora. For off-topic questions, politely redirect to African history.`;

export function CultureAIGuide({ projectId, publicAnonKey }: CultureAIGuideProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to the Africana AI Guide.\n\nAsk me anything about African history, culture, music, science, kingdoms, or the diaspora. I'll give you a structured, in-depth answer.\n\nTry one of the questions below, or ask your own.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, system: SYSTEM_PROMPT }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || err?.error || "AI request failed");
      }

      const data = await res.json();
      const reply = String(data?.reply || "").trim();
      if (!reply) throw new Error("Empty AI response");

      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e: any) {
      toast.error(e?.message || "Failed to generate response");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "I couldn't reach the AI service. Please ensure OPENAI_API_KEY is set in your .env file and restart the dev server.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Parse assistant message into sections
  function renderAssistantMessage(content: string) {
    const lines = content.split("\n");
    const sections: { heading: string | null; body: string[] }[] = [];
    let current: { heading: string | null; body: string[] } = { heading: null, body: [] };

    for (const line of lines) {
      const headingMatch = line.match(/^(Summary|Detailed Explanation|Connections \/ Context|Key Facts|Practical Info[^:]*|Fun Facts[^:]*):\s*(.*)/);
      if (headingMatch) {
        if (current.body.length > 0 || current.heading) sections.push(current);
        current = { heading: headingMatch[1], body: headingMatch[2] ? [headingMatch[2]] : [] };
      } else if (line.trim()) {
        current.body.push(line);
      }
    }
    if (current.body.length > 0 || current.heading) sections.push(current);

    // If no structured sections found, just render plaintext
    if (sections.length === 0 || (sections.length === 1 && !sections[0].heading)) {
      return (
        <p style={{ fontSize: 14, lineHeight: 1.75, color: "#333", margin: 0, whiteSpace: "pre-wrap" }}>
          {content}
        </p>
      );
    }

    const SECTION_COLORS: Record<string, string> = {
      "Summary": "#C85530",
      "Detailed Explanation": "#1A4A8A",
      "Connections / Context": "#1A6B3C",
      "Key Facts": "#D4860A",
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {sections.map((sec, i) => {
          const color = sec.heading ? (SECTION_COLORS[sec.heading] ?? "#5a5a5a") : "#333";
          const body = sec.body.join("\n").trim();
          return (
            <div key={i}>
              {sec.heading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ display: "inline-block", width: 16, height: 2, background: color, borderRadius: 1 }} />
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color, fontFamily: "var(--font-body)" }}>
                    {sec.heading}
                  </span>
                </div>
              )}
              {sec.heading === "Key Facts" || sec.heading === "Fun Facts" ? (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                  {body.split("\n").filter(l => l.trim()).map((fact, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13.5, color: "#333", lineHeight: 1.6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ whiteSpace: "pre-wrap" }}>{fact.replace(/^[-•*]\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "#333", margin: 0, whiteSpace: "pre-wrap" }}>{body}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", height: "100%", display: "flex", flexDirection: "column", gap: 0 }}>

      {/* ── Header ── */}
      <div style={{ background: "#0F0F0F", padding: "22px 32px 18px", flexShrink: 0 }}>
        <div className="kente-stripe" style={{ height: 4, borderRadius: 2, marginBottom: 16 }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <Sparkles style={{ width: 18, height: 18, color: "#E8A020" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: "0.08em", color: "#FFFFFF", lineHeight: 1 }}>
                AFRICANA AI GUIDE
              </span>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0, letterSpacing: "0.06em", fontFamily: "var(--font-body)" }}>
              Powered by AI · Africa-focused history & culture
            </p>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontStyle: "italic", fontFamily: "var(--font-serif)", textAlign: "right", lineHeight: 1.4, maxWidth: 200 }}>
            Ask about kingdoms, music, science, diaspora, food, travel…
          </div>
        </div>
      </div>

      {/* ── Starter questions ── */}
      {messages.length <= 1 && (
        <div style={{ background: "#F7F3ED", borderBottom: "1px solid #E8E3DC", padding: "14px 32px", flexShrink: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C85530", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "inline-block", width: 14, height: 1.5, background: "#C85530" }} />
            Try asking
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {STARTER_QUESTIONS.map((q) => (
              <button key={q} onClick={() => sendMessage(q)}
                style={{
                  fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
                  padding: "7px 14px", borderRadius: 40,
                  background: "#FFFFFF", border: "1.5px solid #DDD8CF",
                  color: "#333", cursor: "pointer", transition: "all 0.18s",
                  display: "flex", alignItems: "center", gap: 5,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C85530"; e.currentTarget.style.color = "#C85530"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#DDD8CF"; e.currentTarget.style.color = "#333"; }}
              >
                <ChevronRight style={{ width: 12, height: 12 }} />
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Messages ── */}
      <div style={{ flex: 1, minHeight: 0, background: "#FFFFFF", overflow: "auto" }}>
        <ScrollArea style={{ height: "100%" }}>
          <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div key={idx} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                  {isUser ? (
                    /* User bubble — dark ink */
                    <div style={{
                      maxWidth: "70%",
                      background: "#0F0F0F",
                      color: "#FFFFFF",
                      borderRadius: "16px 16px 4px 16px",
                      padding: "12px 18px",
                      fontSize: 14,
                      fontWeight: 500,
                      lineHeight: 1.6,
                      fontFamily: "var(--font-body)",
                    }}>
                      {m.content}
                    </div>
                  ) : (
                    /* Assistant — editorial card */
                    <div style={{
                      maxWidth: "100%",
                      background: "#FAFAF8",
                      border: "1.5px solid #E8E3DC",
                      borderLeft: idx === 0 ? "3px solid #C85530" : "3px solid #1A4A8A",
                      borderRadius: "4px 16px 16px 16px",
                      padding: "18px 22px",
                      fontFamily: "var(--font-body)",
                    }}>
                      {idx === 0 ? (
                        <p style={{ fontSize: 14, lineHeight: 1.75, color: "#444", margin: 0 }}>{m.content}</p>
                      ) : (
                        renderAssistantMessage(m.content)
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  background: "#FAFAF8",
                  border: "1.5px solid #E8E3DC",
                  borderLeft: "3px solid #1A4A8A",
                  borderRadius: "4px 16px 16px 16px",
                  padding: "14px 20px",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <Loader2 style={{ width: 16, height: 16, color: "#C85530", animation: "spin 1s linear infinite" }} />
                  <span style={{ fontSize: 13, color: "#999", fontStyle: "italic" }}>Consulting the archive…</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* ── Input bar ── */}
      <div style={{
        flexShrink: 0,
        background: "#FFFFFF",
        borderTop: "2px solid #0F0F0F",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a country, kingdom, monument, historical era, or cultural tradition…"
          disabled={isLoading}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          style={{
            flex: 1,
            padding: "11px 16px",
            background: "#F7F3ED",
            border: "1.5px solid #DDD8CF",
            borderRadius: 8,
            fontSize: 14,
            fontFamily: "var(--font-body)",
            color: "#0F0F0F",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#C85530")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#DDD8CF")}
        />
        <button
          onClick={() => sendMessage()}
          disabled={isLoading || !input.trim()}
          style={{
            width: 44, height: 44,
            background: isLoading || !input.trim() ? "#E8E3DC" : "#0F0F0F",
            border: "none",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: isLoading || !input.trim() ? "default" : "pointer",
            transition: "all 0.18s",
            flexShrink: 0,
          }}
        >
          <Send style={{ width: 16, height: 16, color: isLoading || !input.trim() ? "#AAA" : "#FFFFFF" }} />
        </button>
      </div>

      {/* Footer note */}
      <div style={{ flexShrink: 0, background: "#F7F3ED", borderTop: "1px solid #E8E3DC", padding: "8px 32px" }}>
        <p style={{ fontSize: 10, color: "#AAA", margin: 0, fontWeight: 500, letterSpacing: "0.06em" }}>
          This guide only answers Africa-focused questions · Responses are AI-generated
        </p>
      </div>
    </div>
  );
}
