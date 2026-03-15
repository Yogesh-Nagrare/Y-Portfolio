export default function Topbar({ collection, onAdd, onImport, onExport }) {
  return (
    <div style={{
      background: "black", borderBottom: "1px solid #2d3748",
      padding: "0 16px", height: 44,
      display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#7a8a99", flex: 1 }}>
        <span>portfolio_db</span>
        <span style={{ color: "#4a5568" }}>›</span>
        <span style={{ color: "#00ed64", fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>{collection}</span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 6 }}>
        <button className="mg-btn" onClick={onImport}>Import</button>
        <button className="mg-btn" onClick={onExport}>Export</button>
        <button className="mg-btn mg-btn-green" onClick={onAdd}>+ Add Data</button>
      </div>
    </div>
  );
}
