import React, { useState, useEffect } from "react";

const LOG_MESSAGES = [
  "Initializing connection...",
  "Connecting to Cluster0...",
  "Authenticating user: admin...",
  "Discovering replica set members...",
  "Connecting to portfolio_db...",
  "Loading collections...",
  "Ready."
];

export default function LandingPage() {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    if (logIndex < LOG_MESSAGES.length - 1) {
      const timeout = setTimeout(() => {
        setLogIndex(prev => prev + 1);
      }, 450); 
      return () => clearTimeout(timeout);
    }
  }, [logIndex]);

  return (
    <div style={{
      height: "100dvh",
      width: "100vw",
      background: "#001e2b", 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'JetBrains Mono', monospace",
      color: "#f9fbfa",
      overflow: "hidden",
      padding: "0 20px", // Prevents text hitting edges on mobile
      boxSizing: "border-box"
    }}>
      {/* Animation Styles */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 0.6; }
        }

        @media (max-width: 600px) {
          .landing-title {
            flex-direction: column;
            gap: 4px;
          }
          .title-separator {
            display: none;
          }
          .leaf-svg {
            width: 60px !important;
            height: 60px !important;
          }
        }
      `}</style>

      {/* Pulsing MongoDB Leaf */}
      <div style={{ position: "relative", marginBottom: "5vh" }}>
        <svg className="leaf-svg" width="80" height="80" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C16 31 24 24 24 15C24 6 16 1 16 1C16 1 8 6 8 15C8 24 16 31 16 31Z" fill="#00ed64" />
          <path d="M16 31V1" stroke="#00684a" strokeWidth="1.5" />
        </svg>
        <div style={{
          position: "absolute",
          top: -12, left: -12, right: -12, bottom: -12,
          border: "1.5px solid rgba(0, 237, 100, 0.4)",
          borderRadius: "50%",
          animation: "pulse 2s infinite ease-in-out"
        }} />
      </div>

      {/* Responsive Header */}
      <h1 className="landing-title" style={{ 
        fontSize: "clamp(16px, 5vw, 22px)", 
        fontWeight: 500, 
        marginBottom: 12, 
        letterSpacing: -0.5,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span>MongoDB <span style={{ color: "#00ed64" }}>Compass</span></span>
        <span className="title-separator" style={{ margin: "0 10px", opacity: 0.4 }}>-</span>
        <span style={{ color: "#00ed64" }}>Portfolio<span style={{ color: "#f9fbfa" }}>_DB</span></span>
      </h1>
      
      {/* Connection Logs */}
      <div style={{ height: 24, display: "flex", alignItems: "center" }}>
        <p style={{ 
          fontSize: "clamp(11px, 3.5vw, 13px)", 
          color: "#8899a6", 
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
          whiteSpace: "nowrap"
        }}>
          <span style={{ 
            width: 6, height: 6, background: "#00ed64", borderRadius: "50%",
            boxShadow: "0 0 8px #00ed64", flexShrink: 0
          }} />
          {LOG_MESSAGES[logIndex]}
        </p>
      </div>

      {/* Responsive Progress Bar */}
      <div style={{ 
        width: "min(240px, 60vw)", // Takes 60% of screen width, maxes at 240px
        height: 2, 
        background: "#0a303d", 
        marginTop: 40, 
        borderRadius: 1, 
        overflow: "hidden" 
      }}>
        <div style={{ 
          width: `${((logIndex + 1) / LOG_MESSAGES.length) * 100}%`, 
          height: "100%", 
          background: "#00ed64",
          transition: "width 0.4s ease-out"
        }} />
      </div>
    </div>
  );
}