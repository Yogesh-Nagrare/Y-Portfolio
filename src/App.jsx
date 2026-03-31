import { useState,useEffect } from "react";
import "./styles/global.css";
import LandingPage from "./components/LandingPage";
import LeftNav      from "./components/LeftNav";
import Sidebar      from "./components/Sidebar";
import MainView     from "./components/MainView";
import Toast        from "./components/Toast";
import { useToast } from "./hooks/usePortfolio";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeNav,        setActiveNav]        = useState("collections");
  const [activeCollection, setActiveCollection] = useState("about_me");
  const [sidebarOpen,      setSidebarOpen]      = useState(false);
  const { toasts, show } = useToast();

  const handleCollectionChange = (col) => {
    setActiveCollection(col);
    setSidebarOpen(false);
  };
  useEffect(() => {
    // Show landing for 3.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LandingPage />;
  }
  return (
    <div style={{
      width: "100vw", height: "100dvh",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      background: "var(--bg)",
    }}>

      {/* ── Title bar ── */}
      <div style={{
        background: "var(--bg3)",
        borderBottom: "1px solid var(--border)",
        padding: "0 12px",
        height: "var(--titlebar-height)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexShrink: 0,
        zIndex: 60,
      }}>
        {/* Hamburger — mobile only */}
        <button
          className="mobile-menu-btn #30a840"
          onClick={() => setSidebarOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        {/* Traffic lights — hidden on mobile via inline media */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}
          className="traffic-lights">
          {[
            "#e05050", "#c8a020", "#30a840",
          ].map((color, i) => (
            <div key={i} style={{
              width: 11, height: 11, borderRadius: "50%",
              background: color, cursor: "pointer",
              transition: "filter 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.2)"}
              onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
            />
          ))}
        </div>

        {/* Title */}
        <div className="titlebar-text" style={{
          flex: 1, textAlign: "center",
          fontSize: 11.5,
          color: "var(--text3)",
          fontFamily: "var(--mono)",
          letterSpacing: "0.02em",
          userSelect: "none",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          MongoDB Compass — portfolio_db
        </div>

        {/* Connection dot */}
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 10.5, color: "var(--text3)",
          fontFamily: "var(--mono)",
          flexShrink: 0,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--green)",
          }} />
          <span style={{ display: "var(--connected-text-display, inline)" }}>
            Connected
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", width: "100%", position: "relative" }}>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            style={{ display: "block" }}
          />
        )}

        {/* Left icon nav — hidden on mobile via CSS class */}
        <div className="leftnav-desktop">
          <LeftNav active={activeNav} setActive={setActiveNav} />
        </div>

        {/* Sidebar — becomes drawer on mobile */}
        <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
          <Sidebar
            activeCollection={activeCollection}
            setActiveCollection={handleCollectionChange}
          />
        </div>

        {/* Main content */}
        <MainView
          collection={activeCollection}
          onAction={(msg, type) => show(msg, type || "success")}
        />
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}