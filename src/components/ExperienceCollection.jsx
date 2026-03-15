import { useState } from "react";
import { Field, DocHeader, DocActions } from "./DocField";
import { EXPERIENCE } from "../data/portfolioData";

export default function ExperienceCollection({ onAction }) {
  const [expanded, setExpanded] = useState({ 0: true });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {EXPERIENCE.map((exp, i) => (
        <div key={exp._id} className="doc-card" style={{ animationDelay: `${i * 60}ms` }}>
          <DocHeader
            id={exp._id}
            expanded={!!expanded[i]}
            toggle={() => setExpanded(e => ({ ...e, [i]: !e[i] }))}
          />
          {expanded[i] !== false && (
            <>
              <div style={{ padding: "12px 14px" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{exp.role}</span>
                      {exp.current && <span className="collection-badge status-current">current</span>}
                    </div>
                    <span style={{ fontSize: 12, color: "#00ed64" }}>{exp.company}</span>
                    <span style={{ fontSize: 11, color: "#7a8a99", marginLeft: 8 }}>· {exp.location}</span>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: "#7a8a99", fontFamily: "'JetBrains Mono',monospace" }}>{exp.start} → {exp.end ?? "present"}</div>
                    <div style={{ fontSize: 10, color: "#4a5568" }}>{exp.type}</div>
                  </div>
                </div>

                {/* Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
                  {exp.points.map((pt, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, fontSize: 12, color: "#c5d0de", lineHeight: 1.5 }}>
                      <span style={{ color: "#00ed64", flexShrink: 0, fontFamily: "monospace" }}>›</span>
                      {pt}
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{
                      fontSize: 10, padding: "2px 7px", borderRadius: 3,
                      background: "#111827", border: "1px solid #2d3748",
                      color: "#7dd3fc", fontFamily: "'JetBrains Mono',monospace",
                    }}>{t}</span>
                  ))}
                </div>

                {/* Fields */}
                <div style={{ display: "flex", flexDirection: "column", width: "100%", borderTop: "1px solid #1e2840", marginTop: 8 }}>
                  <Field k="company"  v={exp.company} />
                  <Field k="type"     v={exp.type} />
                  <Field k="current"  v={exp.current} />
                  <Field k="location" v={exp.location} />
                </div>
              </div>
              <DocActions
                onEdit={() => onAction(`Editing ${exp.company} record...`, "info")}
                onClone={() => onAction("Experience cloned!")}
                onCopy={() => { navigator.clipboard.writeText(JSON.stringify(exp, null, 2)); onAction("Copied!"); }}
                onDelete={() => onAction("Work history is permanent on the blockchain 😄", "error")}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
