import { useState, useEffect } from "react";
import FilterBar          from "./FilterBar";
import Topbar             from "./Topbar";
import StatusBar          from "./StatusBar";
import AboutCollection    from "./AboutCollection";
import ProjectsCollection from "./ProjectsCollection";
import SkillsCollection   from "./SkillsCollection";
import ExperienceCollection from "./ExperienceCollection";
import ResumeCollection   from "./ResumeCollection";
import ContactCollection  from "./ContactCollection";
import DsaCollection      from "./DsaCollection";
import AiChat             from "./AiChat"; // Imported
import { USER }           from "../data/portfolioData";

const COLLECTION_DOCS = {
  about_me:     3,
  projects:     3,
  skills:       4,
  experience:   1,
  dsa_stats:    3,
  resume:       1,
  contact:      1,
  ai_assistant: 1, // Added
};

// ── Icons ──
const IconFile = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
);
const IconExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);
const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

export default function MainView({ collection, onAction }) {
  const [filter,      setFilter]      = useState("");
  const [view,        setView]        = useState("List");
  const [downloading, setDownloading] = useState(false);
  const [queryTime]                   = useState(Math.floor(Math.random() * 4) + 1);

  // ── AI States ──
  const [aiOpen,    setAiOpen]    = useState(false);
  const [aiPopup,   setAiPopup]   = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const total     = COLLECTION_DOCS[collection] ?? 1;
  const hasResume = USER.resumeUrl && USER.resumeUrl.trim() !== "";
  

  // ── AI Logic ──
  useEffect(() => {
    // const seen = localStorage.getItem("ai_popup_seen");
    // if (!seen) {
      const timer = setTimeout(() => setAiPopup(true), 1500);
      return () => clearTimeout(timer);
    // }
  }, []);

  const dismissPopup = () => {
    setAiPopup(false);
    setPopupDismissed(true);
    // localStorage.setItem("ai_popup_seen", "1");
  };

  const openChat = () => {
  setAiPopup(false);
  setAiOpen(true);
  };

  const handleFind   = () => onAction(`Querying ${collection} with filter: ${filter || "{}"}`);
  const handleReset  = () => { setFilter(""); onAction("Filter cleared"); };
  const handleAdd    = () => onAction(`Opening insert document dialog for ${collection}...`, "info");
  const handleImport = () => onAction("Import feature — drag & drop your JSON file!", "info");
  const handleExport = () => {
    onAction(`Exporting ${collection} as JSON...`);
    const blob = new Blob(
      [JSON.stringify({ collection, exportedAt: new Date().toISOString(), documents: total }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href    = url;
    a.download = `${collection}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewResume = () => {
    if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
    window.open(USER.resumeUrl, "_blank");
    onAction("Resume opened in new tab!");
  };

  const handleDownloadResume = () => {
    if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
    setDownloading(true);
    fetch(USER.resumeUrl)
      .then(res => res.ok ? res.blob() : Promise.reject())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a       = document.createElement("a");
        a.href        = blobUrl;
        a.download    = `${USER.name.replace(" ", "_")}_Resume.pdf`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        setDownloading(false);
        onAction("Resume downloaded! ✓");
      })
      .catch(() => {
        setDownloading(false);
        window.open(USER.resumeUrl, "_blank");
        onAction("Resume opened in new tab!");
      });
  };

  const renderCollection = () => {
    switch (collection) {
      case "about_me":     return <AboutCollection    onAction={onAction} />;
      case "projects":     return <ProjectsCollection onAction={onAction} />;
      case "skills":       return <SkillsCollection   onAction={onAction} />;
      case "experience":   return <ExperienceCollection onAction={onAction} />;
      case "dsa_stats":    return <DsaCollection      onAction={onAction} />;
      case "resume":       return <ResumeCollection   onAction={onAction} />;
      case "contact":      return <ContactCollection  onAction={onAction} />;
      case "ai_assistant": return <AiChat onClose={() => setAiOpen(false)} />; // Full page AI
      default:             return <AboutCollection    onAction={onAction} />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", minHeight: 0, position: "relative" }}>
      
      <Topbar collection={collection} onAdd={handleAdd} onImport={handleImport} onExport={handleExport} />

      <FilterBar filter={filter} setFilter={setFilter} onFind={handleFind} onReset={handleReset} view={view} setView={setView} total={total} shown={total} />

      {/* ── Resume bar ── */}
      {hasResume && collection !== "ai_assistant" && (
        <div style={{ background: "var(--bg3)", borderBottom: "1px solid var(--border)", borderLeft: "2px solid var(--green)", padding: "7px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--mono)", flex: 1, minWidth: 0, overflow: "hidden" }}>
            <span style={{ color: "var(--green)", flexShrink: 0, display: "flex" }}><IconFile /></span>
            <span style={{ color: "var(--syn-key)", fontSize: 11.5 }}>resume</span>
            <span style={{ color: "var(--text2)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>"{USER.name.replace(" ", "_")}_Resume.pdf"</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={handleViewResume} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 3, border: "1px solid var(--border2)", background: "transparent", color: "var(--text2)", cursor: "pointer", fontFamily: "var(--mono)" }}>View</button>
            <button onClick={handleDownloadResume} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 3, border: "1px solid var(--green)", background: "var(--green)", color: "#001a10", cursor: "pointer", fontFamily: "var(--mono)", fontWeight: 600 }}>Download</button>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: collection === "ai_assistant" ? 0 : "14px 16px" }}>
        {renderCollection()}
      </div>

      <StatusBar collection={collection} shown={total} total={total} queryTime={queryTime} />

      {/* ── AI UI FRAGMENTS ── */}
      <>
        {/* ── Welcome popup ── */}
        {aiPopup && !aiOpen && (
          <div style={{
            position: "fixed", bottom: 24, right: 24, width: 300, zIndex: 9999,
            background: "var(--bg2)", border: "1px solid var(--border)", borderLeft: "3px solid #00c853",
            borderRadius: 6, padding: "14px 16px", fontFamily: "var(--mono)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            animation: "fadeSlideIn 0.25s ease",
          }}>
            <button onClick={dismissPopup} style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", border: "1px solid var(--border2)", background: "var(--bg4)", cursor: "pointer", color: "var(--text3)", fontSize: 10 }}>✕</button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00c853" }} />
              <span style={{ color: "#00c853", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em" }}>AI_ASSISTANT</span>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 12, lineHeight: 1.6, color: "var(--text)" }}>
            I’m <span style={{ color: "yellow" }}>Mongo</span>, built to support <span style={{ color: "#00c853" }}>{USER.name.split(" ")[0]}</span>.  
            Here to showcase the work, skills, and vision behind the name.            
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
              {["What projects?", "Tech stack?", "Contact?"].map(q => (
                <span key={q} style={{ fontSize: 10, padding: "2px 7px", border: "1px solid var(--border2)", borderRadius: 3, color: "var(--text3)", cursor: "pointer" }}>{q}</span>
              ))}
            </div>
            <button onClick={openChat} style={{ width: "100%", background: "#00c853", color: "#001a10", border: "none", borderRadius: 3, padding: "7px 0", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
              OPEN CHAT →
            </button>
          </div>
        )}

        {/* ── Floating chat panel (when user is on other pages) ── */}
        {aiOpen && collection !== "ai_assistant" && (
          <div style={{ position: "fixed", bottom: 80, right: 24, width: 340, height: "60vh", zIndex: 9998, animation: "fadeSlideIn 0.2s ease" }}>
            <AiChat mode="popup" onClose={() => setAiOpen(false)} />
          </div>
        )}
      </>

      <style>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}