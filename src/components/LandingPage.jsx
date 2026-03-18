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
      }, 400); // Speed of logs
      return () => clearTimeout(timeout);
    }
  }, [logIndex]);

  return (
    <div style={{
      height: "100dvh",
      width: "100vw",
      background: "#001e2b", // MongoDB dark teal
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'JetBrains Mono', monospace",
      color: "#f9fbfa",
      overflow: "hidden"
    }}>
      {/* MongoDB Leaf Animation */}
      <div style={{ position: "relative", marginBottom: 40 }}>
        <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
          <path d="M16 31C16 31 24 24 24 15C24 6 16 1 16 1C16 1 8 6 8 15C8 24 16 31 16 31Z" fill="#00ed64" />
          <path d="M16 31V1" stroke="#00684a" strokeWidth="1.5" />
          <style>{`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(1); opacity: 0.8; }
            }
          `}</style>
        </svg>
        <div style={{
          position: "absolute",
          top: -10, left: -10, right: -10, bottom: -10,
          border: "2px solid #00ed64",
          borderRadius: "50%",
          animation: "pulse 2s infinite ease-in-out"
        }} />
      </div>

      <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 10, letterSpacing: -0.5 }}>
        MongoDB <span style={{ color: "#00ed64" }}>Compass</span><span> - </span><span style={{ color: "#00ed64" }}>Portfolio</span><span>_DB</span>
      </h1>
      
      <div style={{ height: 20 }}>
        <p style={{ 
          fontSize: 13, 
          color: "#8899a6", 
          margin: 0,
          display: "flex",
          alignItems: "center",
          gap: 10
        }}>
          <span style={{ 
            width: 8, height: 8, background: "#00ed64", borderRadius: "50%",
            boxShadow: "0 0 8px #00ed64" 
          }} />
          {LOG_MESSAGES[logIndex]}
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ 
        width: 200, height: 2, background: "#0a303d", 
        marginTop: 30, borderRadius: 1, overflow: "hidden" 
      }}>
        <div style={{ 
          width: `${((logIndex + 1) / LOG_MESSAGES.length) * 100}%`, 
          height: "100%", 
          background: "#00ed64",
          transition: "width 0.3s ease"
        }} />
      </div>
    </div>
  );
}