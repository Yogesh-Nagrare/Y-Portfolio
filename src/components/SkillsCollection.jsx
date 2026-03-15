import { useState } from "react";
import { Field, DocHeader, DocActions } from "./DocField";
import { SKILLS } from "../data/portfolioData";

const CAT_COLORS = {
  frontend:  "#7dd3fc",
  backend:   "#86efac",
  database:  "#fbbf24",
  devops:    "#f9a8d4",
  languages: "#a78bfa",
};

export default function SkillsCollection({ onAction }) {
  const [expanded, setExpanded] = useState({ 0: true });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {SKILLS.map((skill, i) => (
        <div key={skill.category} className="doc-card" style={{ animationDelay: `${i * 60}ms` }}>
          <DocHeader
            id={`507f191bcf86cd79943900${i + 1}`}
            expanded={!!expanded[i]}
            toggle={() => setExpanded(e => ({ ...e, [i]: !e[i] }))}
          />
          {expanded[i] !== false && (
            <>
              <div style={{ padding: "10px 12px" }}>
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{
                    fontSize: 12, padding: "2px 10px", borderRadius: 20,
                    background: CAT_COLORS[skill.category] + "20",
                    color: CAT_COLORS[skill.category],
                    border: `1px solid ${CAT_COLORS[skill.category]}40`,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                  }}>{skill.category}</span>
                </div>

                {/* Proficiency bar */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#7a8a99" }}>proficiency</span>
                    <span style={{ fontSize: 11, color: CAT_COLORS[skill.category], fontFamily: "'JetBrains Mono',monospace" }}>{skill.proficiency}%</span>
                  </div>
                  <div style={{ background: "#111827", borderRadius: 4, height: 6, overflow: "hidden" }}>
                    <div style={{
                      width: `${skill.proficiency}%`, height: "100%",
                      background: CAT_COLORS[skill.category],
                      borderRadius: 4, transition: "width 1s ease",
                    }} />
                  </div>
                </div>

                {/* Tools */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {skill.tools.map(tool => (
                    <span key={tool} style={{
                      fontSize: 11, padding: "3px 8px", borderRadius: 4,
                      background: "#111827", border: "1px solid #2d3748",
                      color: "#c5d0de", fontFamily: "'JetBrains Mono', monospace",
                    }}>{tool}</span>
                  ))}
                </div>

                {/* Fields */}
                <div style={{ display: "flex", flexDirection: "column", width: "100%", marginTop: 8, borderTop: "1px solid #1e2840" }}>
                  <Field k="years_exp"   v={skill.years} />
                  <Field k="proficiency" v={skill.proficiency} />
                  <Field k="category"    v={skill.category} />
                </div>
              </div>
              <DocActions
                onEdit={() => onAction(`Editing ${skill.category} skills...`, "info")}
                onClone={() => onAction("Skills cloned!")}
                onCopy={() => { navigator.clipboard.writeText(JSON.stringify(skill, null, 2)); onAction("Copied!"); }}
                onDelete={() => onAction("You can't un-learn skills! 😂", "error")}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
