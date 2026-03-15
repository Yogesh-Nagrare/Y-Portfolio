export default function StatusBar({ collection, shown, total, queryTime }) {
  return (
    <div style={{
      background: "#111827", borderTop: "1px solid #2d3748",
      padding: "4px 16px", display: "flex", alignItems: "center",
      gap: 14, fontSize: 11, color: "#7a8a99", flexShrink: 0,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ed64", boxShadow: "0 0 4px #00ed64", flexShrink: 0 }} />
      <span>Connected to <strong style={{ color: "#e2e8f0" }}>Cluster0</strong></span>
      <span style={{ color: "#4a5568" }}>|</span>
      <span>Displaying <span style={{ color: "#00ed64", fontWeight: 600 }}>{shown}</span> – <span style={{ color: "#00ed64", fontWeight: 600 }}>{total}</span> documents</span>
      <span style={{ color: "#4a5568" }}>|</span>
      <span>Query time: <span style={{ color: "#e2e8f0" }}>{queryTime}ms</span></span>
      <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", color: "#4a5568" }}>
        portfolio_db.<span style={{ color: "#00ed64" }}>{collection}</span>
      </span>
    </div>
  );
}
