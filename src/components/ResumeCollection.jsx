import { useState } from "react";
import { USER, SKILLS, EXPERIENCE, PROJECTS } from "../data/portfolioData";
import { DSA_STATS } from "../data/portfolioData";

export default function ResumeCollection({ onAction }) {
  const [downloading, setDownloading] = useState(false);

  const hasResume = USER.resumeUrl && USER.resumeUrl.trim() !== "";

  // ── View in new tab ──
  const handleView = () => {
    if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
    window.open(USER.resumeUrl, "_blank");
    onAction("Resume opened in new tab!");
  };

  // ── Force download via fl_attachment ──
  const handleDownload = () => {
    if (!hasResume) { onAction("No resume URL set in portfolioData.js", "error"); return; }
    setDownloading(true);
    const downloadUrl = USER.resumeUrl.replace("/upload/", "/upload/");
    const a       = document.createElement("a");
    a.href        = downloadUrl;
    a.download    = `${USER.name.replace(" ", "_")}_Resume.pdf`;
    a.target      = "_blank";
    a.click();
    setTimeout(() => {
      setDownloading(false);
      onAction("Resume downloaded! ✓");
    }, 800);
  };

  const fields = [
    ["candidate",  USER.name],
    ["role",       USER.role],
    ["email",      USER.email],
    ["college",    USER.college],
    ["branch",     USER.branch],
    ["year",       USER.year],
    ["format",     "PDF"],
    ["hosted_on",  "Cloudinary"],
    ["status",     hasResume ? "available" : "not_uploaded"],
  ];

  const stats = [
    { label: "projects",  val: PROJECTS.length,             color: "var(--syn-key)" },
    { label: "lc_solved", val: DSA_STATS.leetcode.solved,   color: "var(--syn-num)" },
    { label: "gfg_solved",val: DSA_STATS.gfg.solved,        color: "var(--green)"   },
    { label: "lc_easy",   val: DSA_STATS.leetcode.easy,     color: "var(--syn-str)" },
    { label: "lc_medium", val: DSA_STATS.leetcode.medium,   color: "var(--syn-arr)" },
    { label: "lc_hard",   val: DSA_STATS.leetcode.hard,     color: "var(--red)"     },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* ── Resume document card ── */}
      <div className="doc-card">

        {/* Doc header */}
        <div style={{
          padding: "7px 14px",
          background: "var(--bg4)",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>
            _id
            <span style={{ color: "var(--text4)", margin: "0 6px" }}>:</span>
            <span style={{ color: "var(--syn-id)" }}>ObjectId(</span>
            <span style={{ color: "var(--text2)" }}>"resume_507f1f77bcf8"</span>
            <span style={{ color: "var(--syn-id)" }}>)</span>
          </span>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {fields.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex", alignItems: "baseline",
                padding: "5px 16px",
                borderBottom: "1px solid var(--border)",
                fontFamily: "var(--mono)", fontSize: 11.5,
                transition: "background 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ color: "var(--syn-key)", minWidth: 170, flexShrink: 0 }}>{k}</span>
              <span style={{ color: "var(--text4)", marginRight: 10 }}>:</span>
              {typeof v === "number"
                ? <span style={{ color: "var(--syn-num)" }}>{v}</span>
                : k === "status"
                  ? <span style={{ color: hasResume ? "var(--green)" : "var(--red)" }}>"{v}"</span>
                  : <span style={{ color: "var(--syn-str)" }}>"{v}"</span>
              }
            </div>
          ))}

          {/* URL row */}
          <div
            style={{
              display: "flex", alignItems: "baseline",
              padding: "5px 16px",
              borderBottom: "1px solid var(--border)",
              fontFamily: "var(--mono)", fontSize: 11.5,
              transition: "background 0.1s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ color: "var(--syn-key)", minWidth: 170, flexShrink: 0 }}>url</span>
            <span style={{ color: "var(--text4)", marginRight: 10 }}>:</span>
            {hasResume ? (
              <a
                href={USER.resumeUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "var(--syn-str)",
                  fontFamily: "var(--mono)",
                  fontSize: 11.5,
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(93,184,122,0.25)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 420,
                  display: "inline-block",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "var(--green)";
                  e.currentTarget.style.borderBottomColor = "var(--green)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--syn-str)";
                  e.currentTarget.style.borderBottomColor = "rgba(93,184,122,0.25)";
                }}
              >
                "{USER.resumeUrl}"
              </a>
            ) : (
              <span style={{ color: "var(--text4)", fontFamily: "var(--mono)", fontSize: 11.5 }}>
                // set VITE_RESUME_URL in your .env file
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
          background: "var(--bg3)",
          display: "flex",
          gap: 8,
        }}>
          <button
            onClick={handleView}
            disabled={!hasResume}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border2)",
              background: "transparent",
              color: hasResume ? "var(--text)" : "var(--text4)",
              fontSize: 12,
              fontWeight: 500,
              fontFamily: "var(--mono)",
              cursor: hasResume ? "pointer" : "not-allowed",
              transition: "all 0.15s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => { if (hasResume) e.currentTarget.style.background = "var(--bg5)"; }}
            onMouseLeave={e => { if (hasResume) e.currentTarget.style.background = "transparent"; }}
          >
            View Resume ↗
          </button>

          <button
            onClick={handleDownload}
            disabled={!hasResume || downloading}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: "var(--radius)",
              border: `1px solid ${hasResume ? "var(--green)" : "var(--border)"}`,
              background: downloading
                ? "var(--green-bg)"
                : hasResume ? "var(--green)" : "transparent",
              color: downloading
                ? "var(--green)"
                : hasResume ? "#001a10" : "var(--text4)",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--mono)",
              cursor: hasResume && !downloading ? "pointer" : "not-allowed",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => { if (hasResume && !downloading) e.currentTarget.style.background = "var(--green2)"; }}
            onMouseLeave={e => { if (hasResume && !downloading) e.currentTarget.style.background = "var(--green)"; }}
          >
            {downloading
              ? <><span style={{ animation: "pulse 1s infinite" }}>⟳</span> Downloading...</>
              : "↓ Download PDF"
            }
          </button>
        </div>
      </div>

      {/* ── Quick stats pulled from your real data ── */}
      <div className="doc-card">
        <div style={{
          padding: "7px 14px",
          background: "var(--bg4)",
          borderBottom: "1px solid var(--border)",
        }}>
          <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)" }}>
            collection:
            <span style={{ color: "var(--green)", marginLeft: 6 }}>resume.quick_stats</span>
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "var(--border)",
        }}>
          {stats.map(s => (
            <div
              key={s.label}
              style={{
                background: "var(--bg2)",
                padding: "14px 10px",
                textAlign: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg4)"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--bg2)"}
            >
              <div style={{
                fontSize: 20,
                fontWeight: 600,
                color: s.color,
                fontFamily: "var(--mono)",
                marginBottom: 5,
              }}>
                {s.val}
              </div>
              <div style={{
                fontSize: 10,
                color: "var(--text3)",
                fontFamily: "var(--mono)",
                letterSpacing: "0.03em",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}