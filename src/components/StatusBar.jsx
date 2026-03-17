export default function StatusBar({ collection, shown, total, queryTime }) {
  return (
    <div style={{
      background: "#111827",
      borderTop: "1px solid #2d3748",
      padding: "4px 16px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontSize: 11,
      color: "#7a8a99",
      flexShrink: 0, // Prevents the bar from squishing to 0 height
      width: "100%", // Ensures it takes full width
      boxSizing: "border-box", 
      overflowX: "auto", // IMPORTANT: Allows swiping left/right to see all text on narrow screens
      whiteSpace: "nowrap", // IMPORTANT: Prevents text from breaking into multiple lines
      // Safe area padding ensures it isn't covered by the home indicator on mobile
      paddingBottom: "calc(4px + env(safe-area-inset-bottom))", 
      msOverflowStyle: "none", // Hide scrollbar for IE/Edge
      scrollbarWidth: "none",  // Hide scrollbar for Firefox
    }}>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style> {/* Hide scrollbar for Chrome/Safari */}

      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ed64", boxShadow: "0 0 4px #00ed64", flexShrink: 0 }} />
      
      <span>Connected to <strong style={{ color: "#e2e8f0" }}>Cluster0</strong></span>
      
      <span style={{ color: "#4a5568" }}>|</span>
      
      <span>Displaying <span style={{ color: "#00ed64", fontWeight: 600 }}>{shown}</span> – <span style={{ color: "#00ed64", fontWeight: 600 }}>{total}</span> documents</span>
      
      <span style={{ color: "#4a5568" }}>|</span>
      
      <span>Query time: <span style={{ color: "#e2e8f0" }}>{queryTime}ms</span></span>
      
      <span style={{ 
        marginLeft: "auto", 
        fontFamily: "'JetBrains Mono', monospace", 
        color: "#4a5568",
        paddingLeft: 20 // Extra space for when the user scrolls to the end on mobile
      }}>
        portfolio_db.<span style={{ color: "#00ed64" }}>{collection}</span>
      </span>
    </div>
  );
}