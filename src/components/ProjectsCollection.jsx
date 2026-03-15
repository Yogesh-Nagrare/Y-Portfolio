import { useState } from "react";
import { Field, DocHeader, DocActions } from "./DocField";
import { PROJECTS } from "../data/portfolioData";

export default function ProjectsCollection({ onAction }) {
  const [expanded, setExpanded] = useState({});
  const [filter, setFilter] = useState("all");

  const toggle = (id) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.status === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["all","active","archived"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 20, border: "1px solid",
              cursor: "pointer", transition: "all 0.15s", fontFamily: "'JetBrains Mono', monospace",
              borderColor: filter === f ? "#00ed64" : "#2d3748",
              background:  filter === f ? "rgba(0,237,100,0.1)" : "transparent",
              color:       filter === f ? "#00ed64" : "#7a8a99",
            }}
          >{f === "all" ? `all (${PROJECTS.length})` : `${f} (${PROJECTS.filter(p=>p.status===f).length})`}</button>
        ))}
      </div>

      {filtered.map((proj, i) => (
        <div key={proj._id} className="doc-card" style={{ animationDelay: `${i * 50}ms` }}>
          <DocHeader id={proj._id} expanded={!!expanded[proj._id]} toggle={() => toggle(proj._id)} />

          {expanded[proj._id] !== false && (
            <>
              <div style={{ padding: "10px 12px" }}>
                {/* Status + language header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{proj.name}</span>
                  <span className={`collection-badge status-${proj.status}`}>{proj.status}</span>
                  <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#7a8a99" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: proj.langColor }} />
                    {proj.language}
                  </span>
                </div>

                <p style={{ fontSize: 12, color: "#7a8a99", lineHeight: 1.5, marginBottom: 10 }}>{proj.description}</p>

                {/* Fields */}
                <div style={{ display: "flex", flexDirection: "column", width: "100%", borderTop: "1px solid #1e2840", marginBottom: 10 }}>
                  <Field k="stars"    v={proj.stars} />
                  <Field k="forks"    v={proj.forks} />
                  <Field k="status"   v={proj.status} />
                  <Field k="language" v={proj.language} />
                  <Field k="topics"   v={proj.topics} />
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 6 }}>
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noreferrer">
                      <button className="mg-btn mg-btn-outline-green" style={{ fontSize: 11, padding: "3px 10px" }}>
                        Live Demo
                      </button>
                    </a>
                  )}
                  <a href={proj.url} target="_blank" rel="noreferrer">
                    <button className="mg-btn mg-btn-outline-green" style={{ fontSize: 11, padding: "3px 10px" }}>
                      View Code
                    </button>
                  </a>
                </div>
              </div>

              <DocActions
                onEdit={() => onAction(`Opening ${proj.name} editor...`, "info")}
                onClone={() => onAction(`Cloned ${proj.name}!`)}
                onCopy={() => { navigator.clipboard.writeText(JSON.stringify(proj, null, 2)); onAction("Copied to clipboard!"); }}
                onDelete={() => onAction(`${proj.name} is open source, fork it instead! 😄`, "error")}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
