const ICONS = [
  { id: "collections", label: "Collections", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6H4v2h16V6zm-2-4H6v2h12V2zm4 10H2v10h20V12zm-2 8H4v-6h16v6z"/></svg> },
  { id: "aggregation", label: "Aggregation",  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { id: "schema",      label: "Schema",       svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/></svg> },
  { id: "indexes",     label: "Indexes",      svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14h14v-2H4V6zm16-4H6v14h14V2zm-2 12H8V4h10v10z"/></svg> },
];

export default function LeftNav({ active, setActive }) {
  return (
    <div style={{
      width: 44,
      background: "#111827",
      borderRight: "1px solid #2d3748",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
      gap: 2,
      flexShrink: 0,
    }}>
      {ICONS.map(icon => (
        <button
          key={icon.id}
          title={icon.label}
          onClick={() => setActive(icon.id)}
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s",
            background: active === icon.id ? "rgba(0,237,100,0.15)" : "transparent",
            color: active === icon.id ? "#00ed64" : "#7a8a99",
            outline: active === icon.id ? "1px solid rgba(0,237,100,0.3)" : "none",
          }}
          onMouseEnter={e => {
            if (active !== icon.id) {
              e.currentTarget.style.background = "#1c2333";
              e.currentTarget.style.color = "#e2e8f0";
            }
          }}
          onMouseLeave={e => {
            if (active !== icon.id) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#7a8a99";
            }
          }}
        >
          {icon.svg}
        </button>
      ))}

      <div style={{ width: 24, height: 1, background: "#2d3748", margin: "6px 0" }} />

      {/* Settings at bottom */}
      <button
        title="Settings"
        style={{
          marginTop: "auto",
          width: 32,
          height: 32,
          borderRadius: 6,
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: "transparent",
          color: "#7a8a99",
          transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#1c2333"; e.currentTarget.style.color = "#e2e8f0"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#7a8a99"; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.92c.04-.34.07-.68.07-1.08s-.03-.74-.07-1.08l2.32-1.82c.21-.16.27-.46.13-.7l-2.2-3.8c-.13-.25-.42-.33-.67-.25l-2.74 1.1c-.57-.44-1.18-.81-1.85-1.09L14.3 2.5c-.05-.26-.28-.5-.56-.5h-4.4c-.28 0-.5.24-.56.5l-.41 2.91c-.67.28-1.28.65-1.85 1.09l-2.74-1.1c-.25-.1-.54 0-.67.25l-2.2 3.8c-.14.24-.08.54.13.7l2.32 1.82c-.04.34-.07.69-.07 1.08s.03.74.07 1.08L1.99 13.9c-.21.16-.27.46-.13.7l2.2 3.8c.13.25.42.33.67.25l2.74-1.1c.57.44 1.18.81 1.85 1.09l.41 2.91c.06.26.28.5.56.5h4.4c.28 0 .5-.24.56-.5l.41-2.91c.67-.28 1.28-.65 1.85-1.09l2.74 1.1c.25.1.54 0 .67-.25l2.2-3.8c.14-.24.08-.54-.13-.7l-2.32-1.82z"/>
        </svg>
      </button>
    </div>
  );
}