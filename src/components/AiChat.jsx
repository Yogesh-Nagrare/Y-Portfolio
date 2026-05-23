import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { USER, PROJECTS, SKILLS, EXPERIENCE } from "../data/portfolioData";

// ─── Initialize Gemini (mirrors: const ai = new GoogleGenAI({})) ──────────────
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// ─── Classify Gemini errors so UI shows the real reason ──────────────────────
const classifyGeminiError = (err) => {
  const msg = (err?.message || "") + (err?.toString() || "");

  if (
    msg.includes("API_KEY_INVALID") ||
    msg.includes("PERMISSION_DENIED") ||
    msg.includes("API key expired") ||
    msg.includes("API key not valid") ||
    msg.includes("401") ||
    msg.includes("403")
  ) {
    return {
      code: "AUTH_ERROR",
      userMessage:
        "Gemini API key has expired or is invalid.\nGet a new free key at: https://aistudio.google.com/apikey\nThen update VITE_GEMINI_API_KEY in your .env file.",
    };
  }

  if (
    msg.includes("fetch failed") ||
    msg.includes("ENOTFOUND") ||
    msg.includes("ECONNREFUSED")
  ) {
    return {
      code: "NETWORK_ERROR",
      userMessage:
        "AI service is unreachable.\nThis is a network/firewall issue — not your code.\nTry again in a moment.",
    };
  }

  if (
    msg.includes("429") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("quota")
  ) {
    return {
      code: "QUOTA_ERROR",
      userMessage:
        "Gemini API quota exceeded.\nToo many requests — please wait a minute and try again.",
    };
  }

  if (msg.includes("timeout") || msg.includes("ETIMEDOUT")) {
    return {
      code: "TIMEOUT_ERROR",
      userMessage:
        "AI service timed out.\nThe request took too long — please try again.",
    };
  }

  if (
    msg.includes("not found") ||
    msg.includes("404") ||
    msg.includes("models/")
  ) {
    return {
      code: "MODEL_ERROR",
      userMessage:
        "Gemini model not found.\nChange the model name in AiChat.jsx.",
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    userMessage: `AI service error: ${err?.message || "Unknown error"}`,
  };
};

// ─── Build system prompt from your portfolioData ──────────────────────────────
const buildSystemPrompt = () => `
You are an AI assistant embedded in ${USER.name}'s portfolio website.
Answer questions about ${USER.name} based ONLY on the data below.
Be concise, friendly, and stay in character.
If asked something not in the data, say you don't have that info.
Keep responses short — max 3-4 sentences unless a list is needed.

=== PORTFOLIO DATA ===

NAME: ${USER.name}
TITLE: ${USER.title}
BIO: ${USER.bio}
LOCATION: ${USER.location ?? "Not specified"}
EMAIL: ${USER.email}
GITHUB: ${USER.github}
LINKEDIN: ${USER.linkedin}

SKILLS:
${JSON.stringify(SKILLS, null, 2)}

PROJECTS:
${JSON.stringify(PROJECTS, null, 2)}

EXPERIENCE:
${JSON.stringify(EXPERIENCE, null, 2)}

=== END DATA ===
`.trim();

const SYSTEM_PROMPT = buildSystemPrompt();

const QUICK_QUESTIONS = [
  "What projects has he built?",
  "What are his skills?",
  "How to contact him?",
  "His experience?",
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconSend = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// ─── Typing indicator ─────────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display: "flex", gap: 4, padding: "6px 0" }}>
    {[0, 150, 300].map((delay, i) => (
      <div key={i} style={{
        width: 5, height: 5, borderRadius: "50%",
        background: "var(--text3, #555)",
        animation: `aiDotBlink 1.2s ${delay}ms infinite`,
      }} />
    ))}
  </div>
);

// ─── Error bubble ─────────────────────────────────────────────────────────────
const ErrorBubble = ({ message }) => (
  <div style={{
    fontSize: 11, lineHeight: 1.6,
    color: "#ff5252",
    background: "rgba(255,82,82,0.08)",
    border: "1px solid rgba(255,82,82,0.25)",
    borderRadius: 4, padding: "7px 10px",
    whiteSpace: "pre-wrap", wordBreak: "break-word",
    maxWidth: "82%",
  }}>
    <span style={{
      fontSize: 9, fontWeight: 700,
      letterSpacing: "0.06em",
      display: "block", marginBottom: 4, opacity: 0.7,
    }}>
      ERROR
    </span>
    {message}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export default function AiChat({ mode = "panel", onClose }) {
  const [messages, setMessages] = useState([
  {
    role: "assistant",
    text: `I'm Mongo, built to support ${USER.name.split(" ")[0]}.
Here to showcase the work, skills, and vision behind the name.`,
    
    ui: (
      <>
        I’m <span style={{ color: "yellow" }}>Mongo</span>, built to support{" "}
        <span style={{ color: "#00c853" }}>
          {USER.name.split(" ")[0]}
        </span>.
        <br />
        Here to showcase the work, skills, and vision behind the name.
      </>
    ),

    isError: false,
  },
]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ─── Call Gemini using @google/genai SDK ────────────────────────────────────
  // mirrors:
  //   const response = await ai.models.generateContent({
  //     model: "gemini-2.5-flash", contents: "..."
  //   });
  //   console.log(response.text);
  // ───────────────────────────────────────────────────────────────────────────
  const callGemini = async (question, history) => {
    // Build contents array: history + new question
    // Each turn: { role: "user"|"model", parts: [{ text }] }
    const contents = [
      ...history
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        })),
      { role: "user", parts: [{ text: question }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 350,
        temperature: 0.7,
      },
    });

    if (!response.text) throw new Error("Empty response from Gemini");
    return response.text;
  };

  // ─── Send message ─────────────────────────────────────────────────────────
  const sendMessage = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question, isError: false }]);
    setLoading(true);

    try {
      const reply = await callGemini(question, messages);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply, isError: false },
      ]);
    } catch (err) {
      const { userMessage } = classifyGeminiError(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: userMessage, isError: true },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  // ─── Panel style: popup (fixed bottom-right) vs panel (fills collection) ───
  const panelStyle =
    mode === "popup"
      ? {
          position: "fixed",
          bottom: 80, right: 20,
          width: 340, maxHeight: 480,
          zIndex: 9999,
          borderRadius: 6,
          border: "1px solid var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        }
      : {
          width: "100%",
          height: "100%",
          borderRadius: 0,
          border: "none",
        };

  return (
    <div style={{
      ...panelStyle,
      background: "var(--bg2)",
      display: "flex", flexDirection: "column",
      fontFamily: "var(--mono)",
      overflow: "hidden",
    }}>

      {/* ── Header ── */}
      <div style={{
        background: "var(--bg3)",
        borderBottom: "1px solid #00c853",
        padding: "8px 12px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#00c853", boxShadow: "0 0 6px #00c853",
          }} />
          <span style={{
            color: "yellow", fontSize: 11,
            fontWeight: 700, letterSpacing: "0.07em",
          }}>
            Mongo
          </span>
          <span style={{
            fontSize: 9, padding: "1px 5px",
            border: "1px solid rgba(0,200,83,0.3)",
            borderRadius: 2, color: "var(--text3)",
            letterSpacing: "0.04em",
          }}>
            assistant mode: {mode === "popup" ? "popup" : "embedded"}
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} style={{
            background: "transparent",
            border: "1px solid var(--border2)",
            borderRadius: 3, color: "var(--text3)",
            cursor: "pointer", padding: 0,
            display: "flex", alignItems: "center",
            justifyContent: "center",
            width: 20, height: 20,
          }}>
            <IconX />
          </button>
        )}
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "10px 12px",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
            gap: 7,
            animation: "aiFadeIn 0.2s ease",
          }}>
            {msg.role === "assistant" && (
              <span style={{
                color: msg.isError ? "#ff5252" : "#00c853",
                fontSize: 9, fontWeight: 700,
                flexShrink: 0, marginTop: 3,
              }}>
                {msg.isError ? "ERR›" : "AI›"}
              </span>
            )}

            {msg.isError ? (
              <ErrorBubble message={msg.text} />
            ) : (
              <div style={{
                maxWidth: "82%",
                fontSize: 11.5, lineHeight: 1.65,
                color: msg.role === "user" ? "var(--text3)" : "var(--text)",
                background: msg.role === "user" ? "var(--bg4)" : "transparent",
                padding: msg.role === "user" ? "5px 10px" : 0,
                borderRadius: msg.role === "user" ? 3 : 0,
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>
                {msg.text}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 7 }}>
            <span style={{
              color: "#00c853", fontSize: 9,
              fontWeight: 700, flexShrink: 0, marginTop: 3,
            }}>
              AI›
            </span>
            <TypingDots />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Quick questions (only on fresh chat) ── */}
      {messages.length <= 1 && (
        <div style={{
          padding: "0 12px 8px",
          display: "flex", flexWrap: "wrap", gap: 5,
        }}>
          {QUICK_QUESTIONS.map((q) => (
            <button key={q} onClick={() => sendMessage(q)} style={{
              fontSize: 10, padding: "3px 8px",
              border: "1px solid var(--border2)",
              borderRadius: 3, background: "transparent",
              color: "var(--text3)", cursor: "pointer",
              fontFamily: "var(--mono)",
            }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "8px 10px",
        display: "flex", gap: 6,
        background: "var(--bg3)", flexShrink: 0,
      }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder={`db.ask({ question: "..." })`}
          disabled={loading}
          style={{
            flex: 1, fontFamily: "var(--mono)",
            fontSize: 11, padding: "5px 8px",
            border: "1px solid var(--border2)",
            borderRadius: 3, background: "var(--bg4)",
            color: "var(--text)", outline: "none",
            boxShadow: "0 0 5px rgba(0, 200, 83, 0.1)",
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading || !input.trim()}
          style={{
            padding: "5px 10px",
            background: "#00c853",
            color: input.trim() && !loading ? "#001a10" : "var(--text4)",
            border: `1px solid ${input.trim() && !loading ? "#00c853" : "var(--border2)"}`,
            borderRadius: 3,
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 4,
            fontFamily: "var(--mono)", fontSize: 10,
            fontWeight: 700, transition: "all 0.15s",
          }}
        >
          <IconSend /> RUN
        </button>
      </div>

      <style>{`
        @keyframes aiFadeIn   { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes aiDotBlink { 0%,80%,100% { opacity: 0.2; } 40% { opacity: 1; } }
      `}</style>
    </div>
  );
}