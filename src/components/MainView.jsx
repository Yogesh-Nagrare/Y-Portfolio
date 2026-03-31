import { useState } from "react";
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
import { USER }           from "../data/portfolioData";

const COLLECTION_DOCS = {
  about_me:   3,
  projects:   3,
  skills:     4,
  experience: 1,
  dsa_stats:  3,
  resume:     1,
  contact:    1,
};

// ── Inline SVG icons — no lucide needed ──
const IconFile = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const IconExternalLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

export default function MainView({ collection, onAction }) {
  const [filter,      setFilter]      = useState("");
  const [view,        setView]        = useState("List");
  const [downloading, setDownloading] = useState(false);
  const [queryTime]                   = useState(Math.floor(Math.random() * 4) + 1);

  const total     = COLLECTION_DOCS[collection] ?? 1;
  const hasResume = USER.resumeUrl && USER.resumeUrl.trim() !== "";

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

  // ── View resume ──
  const handleViewResume = () => {
    if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
    window.open(USER.resumeUrl, "_blank");
    onAction("Resume opened in new tab!");
  };

  // ── Download resume ──
  // Strategy: bake fl_attachment into the URL so Cloudinary
  // sends Content-Disposition: attachment — no CORS fetch needed.
const handleDownloadResume = () => {
  if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
  setDownloading(true);

  fetch(USER.resumeUrl)
    .then(res => {
      if (!res.ok) throw new Error("Fetch failed");
      return res.blob();
    })
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const a       = document.createElement("a");
      a.href        = blobUrl;
      a.download    = `${USER.name.replace(" ", "_")}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
      case "about_me":   return <AboutCollection    onAction={onAction} />;
      case "projects":   return <ProjectsCollection onAction={onAction} />;
      case "skills":     return <SkillsCollection   onAction={onAction} />;
      case "experience": return <ExperienceCollection onAction={onAction} />;
      case "dsa_stats":  return <DsaCollection      onAction={onAction} />;
      case "resume":     return <ResumeCollection   onAction={onAction} />;
      case "contact":    return <ContactCollection  onAction={onAction} />;
      default:           return <AboutCollection    onAction={onAction} />;
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      flex: 1, overflow: "hidden", minHeight: 0,
    }}>

      <Topbar
        collection={collection}
        onAdd={handleAdd}
        onImport={handleImport}
        onExport={handleExport}
      />

      <FilterBar
        filter={filter} setFilter={setFilter}
        onFind={handleFind} onReset={handleReset}
        view={view} setView={setView}
        total={total} shown={total}
      />

      {/* ── Resume quick-access bar ── */}
      {hasResume && (
        <div style={{
          background: "var(--bg3)",
          borderBottom: "1px solid var(--border)",
          borderLeft: "2px solid var(--green)",
          padding: "7px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          flexShrink: 0,
          flexWrap: "wrap",
        }}>

          {/* Left — file info */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--mono)",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
          }}>
            <span style={{ color: "var(--green)", flexShrink: 0, display: "flex" }}>
              <IconFile />
            </span>
            <span style={{ color: "var(--syn-key)", fontSize: 11.5, flexShrink: 0 }}>
              resume
            </span>
            <span style={{ color: "var(--text4)", fontSize: 11.5, flexShrink: 0 }}>:</span>
            <span style={{
              color: "var(--text2)",
              fontSize: 11,
              fontFamily: "var(--mono)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              "{USER.name.replace(" ", "_")}_Resume.pdf"
            </span>
            <span style={{
              flexShrink: 0,
              fontSize: 9,
              padding: "1px 6px",
              borderRadius: 3,
              background: "rgba(0,200,83,0.1)",
              color: "#00c853",
              border: "1px solid rgba(0,200,83,0.2)",
              fontFamily: "var(--mono)",
              letterSpacing: "0.04em",
            }}>
              AVAILABLE
            </span>
          </div>

          {/* Right — action buttons */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button
              onClick={handleViewResume}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                padding: "4px 11px",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border2)",
                background: "transparent",
                color: "var(--text2)",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background    = "var(--bg5)";
                e.currentTarget.style.borderColor   = "var(--border3)";
                e.currentTarget.style.color         = "var(--text)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background    = "transparent";
                e.currentTarget.style.borderColor   = "var(--border2)";
                e.currentTarget.style.color         = "var(--text2)";
              }}
            >
              <IconExternalLink /> View
            </button>

            <button
              onClick={handleDownloadResume}
              disabled={downloading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                padding: "4px 11px",
                borderRadius: "var(--radius)",
                border: `1px solid ${downloading ? "var(--border2)" : "var(--green)"}`,
                background: downloading ? "var(--bg4)" : "var(--green)",
                color: downloading ? "var(--text3)" : "#001a10",
                cursor: downloading ? "not-allowed" : "pointer",
                fontFamily: "var(--mono)",
                fontWeight: 600,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                opacity: downloading ? 0.75 : 1,
              }}
              onMouseEnter={e => {
                if (!downloading) e.currentTarget.style.background = "var(--green2)";
              }}
              onMouseLeave={e => {
                if (!downloading) e.currentTarget.style.background = "var(--green)";
              }}
            >
              {downloading
                ? <><span style={{ animation: "pulse 1s infinite", display: "inline-block" }}>⟳</span>&nbsp;Downloading...</>
                : <><IconDownload /> Download PDF</>
              }
            </button>
          </div>
        </div>
      )}

      {/* ── Collection content ── */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        padding: "14px 16px",
        minHeight: 0,
      }}>
        {renderCollection()}
      </div>

      <StatusBar
        collection={collection}
        shown={total}
        total={total}
        queryTime={queryTime}
      />
    </div>
  );
}