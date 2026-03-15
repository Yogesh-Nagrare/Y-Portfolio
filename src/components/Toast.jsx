export default function Toast({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: t.type === "success" ? "#003930" : t.type === "error" ? "#3b0a0a" : "#1e2840",
          border: `1px solid ${t.type === "success" ? "rgba(0,237,100,0.4)" : t.type === "error" ? "rgba(248,113,113,0.4)" : "rgba(167,139,250,0.4)"}`,
          color: t.type === "success" ? "#00ed64" : t.type === "error" ? "#f87171" : "#a78bfa",
          borderRadius: 6, padding: "10px 16px", fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          animation: "fadeIn 0.3s ease both",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span>{t.type === "success" ? "✓" : t.type === "error" ? "✗" : "ℹ"}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
