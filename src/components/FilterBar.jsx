import { useState } from "react";

export default function FilterBar({ filter, setFilter, onFind, onReset, view, setView, total, shown }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{
      background: "black", borderBottom: "1px solid #2d3748",
      padding: "8px 16px", display: "flex", alignItems: "center",
      gap: 8, flexShrink: 0, flexWrap: "wrap",
    }}>
      <span style={{ fontSize: 11, color: "#7a8a99", whiteSpace: "nowrap" }}>Filter</span>
      <input
        value={filter}
        onChange={e => setFilter(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onFind()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder='{ "field": "value" }'
        style={{
          flex: 1, minWidth: 180,
          background: "#111827",
          border: `1px solid ${focused ? "#00ed64" : "#2d3748"}`,
          borderRadius: 5, padding: "5px 10px",
          color: "#e2e8f0", fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace", outline: "none",
          transition: "border-color 0.2s",
        }}
      />
      <button className="mg-btn" onClick={onFind}>Find</button>
      <button className="mg-btn" onClick={onReset}>Reset</button>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: "#7a8a99" }}>
          {shown} of <span style={{ color: "#00ed64", fontWeight: 600 }}>{total}</span> docs
        </span>
        <div style={{ display: "flex", border: "1px solid #2d3748", borderRadius: 5, overflow: "hidden" }}>
          {["List", "JSON", "Table"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "4px 10px", border: "none", cursor: "pointer",
                fontSize: 11, fontFamily: "inherit",
                background: view === v ? "#00ed64" : "transparent",
                color:      view === v ? "#001e2b" : "#7a8a99",
                fontWeight: view === v ? 600 : 400,
                transition: "all 0.15s",
              }}
            >{v}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
