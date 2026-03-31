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

export default function MainView({ collection, onAction }) {
  const [filter,   setFilter]  = useState("");
  const [view,     setView]    = useState("List");
  const [queryTime]            = useState(Math.floor(Math.random() * 4) + 1);

  const total = COLLECTION_DOCS[collection] ?? 1;

  const hasResume  = USER.resumeUrl && USER.resumeUrl.trim() !== "";

  const handleFind   = () => onAction(`Querying ${collection} with filter: ${filter || "{}"}`);
  const handleReset  = () => { setFilter(""); onAction("Filter cleared"); };
  const handleAdd    = () => onAction(`Opening insert document dialog for ${collection}...`, "info");
  const handleImport = () => onAction("Import feature — drag & drop your JSON file!", "info");
  const handleExport = () => {
    onAction(`Exporting ${collection} as JSON...`);
    const data = { collection, exportedAt: new Date().toISOString(), documents: total };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${collection}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Resume handlers (same logic as ResumeCollection) ──
  const handleViewResume = () => {
    if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
    window.open(USER.resumeUrl, "_blank");
    onAction("Resume opened in new tab!");
  };

  const [downloading, setDownloading] = useState(false);
const handleDownloadResume = () => {
  if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
  setDownloading(true);

  // Fetch the file as a blob to force browser download
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
      // CORS blocked fetch — fallback: open Cloudinary URL with fl_attachment
      setDownloading(false);
      const fallbackUrl = USER.resumeUrl.includes("cloudinary.com")
        ? USER.resumeUrl.replace("/upload/", "/upload")
        : USER.resumeUrl;
      window.open(fallbackUrl, "_blank");
      onAction("Opening resume for download...");
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

      {/* ── Sticky resume bar — visible on every collection ── */}
      {hasResume && (
        <div style={{
          background: "var(--bg3)",
          borderBottom: "1px solid var(--border)",
          padding: "6px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          flexWrap: "wrap",
        }}>
          {/* Label */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 20, fontFamily: "var(--mono)", color: "var(--text3)",
            flex: 1, minWidth: 0,
          }}>
            <span style={{ color: "var(--green)", fontSize: 12 }}>📄</span>
            <span style={{ color: "white" }}>resume</span>
            <span style={{ color: "var(--text4)" }}>:</span>
            <span style={{
              color: "white",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              "{USER.name.split(" ")[0]}_Resume.pdf"
            </span>
            <span style={{
              fontSize: 9, padding: "1px 6px", borderRadius: 3,
              background: "rgba(0,200,83,0.1)",
              color: "#00c853",
              border: "1px solid rgba(0,200,83,0.2)",
              fontFamily: "var(--mono)",
              flexShrink: 0,
            }}>available</span>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button
              onClick={handleViewResume}
              className="mg-btn"
              style={{color:"white", fontSize: 20.5, padding: "3px 10px" }}
            >
              View ↗
            </button>
            <button
              onClick={handleDownloadResume}
              disabled={downloading}
              className="mg-btn mg-btn-green"
              style={{
                fontSize: 10.5,
                padding: "3px 10px",
                opacity: downloading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {downloading
                ? <><span style={{ animation: "pulse 1s infinite" }}>⟳</span> Downloading...</>
                : "↓ Download PDF"
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