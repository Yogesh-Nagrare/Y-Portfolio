import { useState } from "react";
import "./styles/global.css";
import LeftNav        from "./components/LeftNav";
import Sidebar        from "./components/Sidebar";
import MainView       from "./components/MainView";
import Toast          from "./components/Toast";
import { useToast }   from "./hooks/usePortfolio";

export default function App() {
  const [activeNav,        setActiveNav]        = useState("collections");
  const [activeCollection, setActiveCollection] = useState("about_me");
  const { toasts, show } = useToast();

  return (
    <div style={{
      width: "100vw", height: "100vh",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      background: "var(--bg)",
    }}>

      {/* ── Title bar ── */}
      <div style={{
        background: "var(--bg3)",
        borderBottom: "1px solid var(--border)",
        padding: "0 16px",
        height: 34,
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexShrink: 0,
      }}>
        {/* macOS traffic lights */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[
            { color: "#e05050", hover: "#f06060" },
            { color: "#c8a020", hover: "#d8b030" },
            { color: "#30a840", hover: "#40b850" },
          ].map((dot, i) => (
            <div
              key={i}
              style={{
                width: 11, height: 11, borderRadius: "50%",
                background: dot.color,
                cursor: "pointer",
                transition: "filter 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.2)"}
              onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
            />
          ))}
        </div>

        {/* Title */}
        <div style={{
          flex: 1, textAlign: "center",
          fontSize: 15.5,
          color: "var(--text3)",
          fontFamily: "var(--mono)",
          letterSpacing: "0.02em",
          userSelect: "none",
        }}>
          MongoDB Compass — Portfolio_DB
        </div>

        {/* Connection indicator */}
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 10.5, color: "var(--text3)",
          fontFamily: "var(--mono)",
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--green)",
          }} />
          Connected
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", width: "100%" }}>
        <LeftNav
          active={activeNav}
          setActive={setActiveNav}
        />
        <Sidebar
          activeCollection={activeCollection}
          setActiveCollection={setActiveCollection}
        />
        <MainView
          collection={activeCollection}
          onAction={(msg, type) => show(msg, type || "success")}
        />
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}