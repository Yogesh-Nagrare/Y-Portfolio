import { useState } from "react";
import { COLLECTIONS } from "../data/portfolioData";

export default function Sidebar({ activeCollection, setActiveCollection }) {
  const [dbExpanded, setDbExpanded] = useState(true);

  return (
<div style={{
  width: 220,
  background: "var(--bg2)",
  borderRight: "1px solid var(--border)",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  overflow: "hidden",
  transition: "width 0.25s ease",
}}>
      {/* Header */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #2d3748" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#7a8a99", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>
          Databases
        </div>

        {/* portfolio_db */}
        <div
          onClick={() => setDbExpanded(e => !e)}
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "5px 8px",
            borderRadius: 5, cursor: "pointer", color: "#00ed64",
            background: "#003930", transition: "background 0.15s",
          }}
        >
          <span style={{ fontSize: 14 }}>🍃</span>
          <span style={{ fontSize: 12, fontWeight: 600, flex: 1 }}>portfolio_db</span>
          <span style={{ fontSize: 10, color: "#7a8a99", transform: dbExpanded ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s" }}>▾</span>
        </div>

        {/* Collections */}
        {dbExpanded && (
          <div style={{ paddingLeft: 16, marginTop: 4 }}>
            {COLLECTIONS.map(col => (
              <div
                key={col.name}
                onClick={() => setActiveCollection(col.name)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "4px 8px",
                  borderRadius: 4, cursor: "pointer", transition: "background 0.15s",
                  color: activeCollection === col.name ? "#00ed64" : "#7a8a99",
                  background: activeCollection === col.name ? "rgba(0,237,100,0.08)" : "transparent",
                  fontSize: 12,
                }}
                onMouseEnter={e => { if (activeCollection !== col.name) e.currentTarget.style.background = "#2d3748"; }}
                onMouseLeave={e => { if (activeCollection !== col.name) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                  background: activeCollection === col.name ? "#00ed64" : "#4a5568",
                }} />
                <span style={{ flex: 1, fontFamily: "'JetBrains Mono', monospace" }}>{col.name}</span>
                <span style={{ fontSize: 10, color: "#4a5568" }}>{col.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connection info */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #2d3748" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#7a8a99", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>
          Connections
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", borderRadius: 4, color: "#c5d0de", fontSize: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ed64", flexShrink: 0, boxShadow: "0 0 4px #00ed64" }} />
          localhost:27017
        </div>
      </div>

      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#7a8a99", textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 8 }}>
          Atlas Cluster
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", borderRadius: 4, color: "#c5d0de", fontSize: 12 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ed64", flexShrink: 0, boxShadow: "0 0 4px #00ed64" }} />
          Cluster0 (Atlas)
        </div>
      </div>
    </div>
  );
}
