import { DSA_STATS } from "../data/portfolioData";
import { Field, DocHeader, DocActions } from "./DocField";

const PLATFORMS = [
  { name: "LeetCode",     color: "#ffa116", data: DSA_STATS.leetcode,      id: "lc001" },
  { name: "GeeksForGeeks",color: "#2f8d46", data: DSA_STATS.gfg,           id: "gfg01" },
  { name: "InterviewBit", color: "#f15a29", data: DSA_STATS.interviewbit,  id: "ib001" },
];

export default function DsaCollection({ onAction }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Summary doc */}
      <div>
        {[
          { label: "total_solved", val: DSA_STATS.leetcode.solved + DSA_STATS.gfg.solved + DSA_STATS.interviewbit.solved, color: "#00ed64" },
          // { label: "lc_rank",      val: `#${DSA_STATS.leetcode.rank}`, color: "#fbbf24" },
          // { label: "lc_rating",    val: DSA_STATS.leetcode.rating,     color: "#a78bfa" },
        ].map(s => (
          <div key={s.label} style={{ background: "#1c2333", border: "1px solid #2d3748", borderRadius: 6, padding: "10px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, fontFamily: "monospace" }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "#7a8a99", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {PLATFORMS.map((p, i) => (
        <div key={p.id} className="doc-card" style={{ animationDelay: `${i * 80}ms` }}>
          <DocHeader id={p.id} expanded={true} toggle={() => {}} />
          <div style={{ padding: "10px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{p.name}</span>
            </div>

            {/* LeetCode specific: difficulty breakdown */}
            {p.name === "LeetCode" && (
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {[
                  { label: "easy",   val: p.data.easy,   color: "#00b8a3" },
                  { label: "medium", val: p.data.medium, color: "#ffa116" },
                  { label: "hard",   val: p.data.hard,   color: "#ff375f" },
                ].map(d => (
                  <div key={d.label} style={{ flex: 1, background: "#111827", border: `1px solid ${d.color}33`, borderRadius: 5, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: d.color, fontFamily: "monospace" }}>{d.val}</div>
                    <div style={{ fontSize: 10, color: "#7a8a99" }}>{d.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", width: "100%", borderTop: "1px solid #1e2840", marginTop: 8 }}>
              {Object.entries(p.data).map(([k, v]) => (
                <Field key={k} k={k} v={v} />
              ))}
            </div>
          </div>
          <DocActions
            onEdit={() => onAction(`Opening ${p.name} profile...`, "info")}
            onClone={() => onAction("Stats cloned!")}
            onCopy={() => { navigator.clipboard.writeText(JSON.stringify(p.data, null, 2)); onAction(`${p.name} stats copied!`); }}
            onDelete={() => onAction("Your ratings are permanent! 🏆", "error")}
          />
        </div>
      ))}
    </div>
  );
}
