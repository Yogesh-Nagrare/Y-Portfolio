import { useState } from "react";
import { Field, DocHeader, DocActions } from "./DocField";
import { USER, DSA_STATS } from "../data/portfolioData";
import { useTyping } from "../hooks/usePortfolio";

const TYPING_LINES = [
  '> db.about_me.findOne({ name: "Yogesh Nagrare" })',
  '> db.about_me.find({ open_to_work: true })',
  // '> db.skills.aggregate([{ $sort: { proficiency: -1 } }])',
  '> db.projects.find({ stars: { $gt: 200 } })',
];

export default function AboutCollection({ onAction }) {
  const [expanded, setExpanded] = useState(true);
  const typedText = useTyping(TYPING_LINES);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Terminal query display */}
      <div style={{
        background: "#0d1117", border: "1px solid #2d3748", borderRadius: 6,
        padding: "12px 16px", fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12, color: "#00ed64",
      }}>
        <span style={{ color: "#4a5568" }}>$ </span>
        {typedText}
        <span style={{ display: "inline-block", width: 7, height: 13, background: "#00ed64", marginLeft: 2, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} />
      </div>

      {/* About document */}
      <div className="doc-card">
        <DocHeader id="507f1f77bcf86cd799439001" expanded={expanded} toggle={() => setExpanded(e => !e)} />
        {expanded && (
          <>
            <div style={{ padding: "0", display: "flex", flexDirection: "column", width: "100%" }}>              
              <Field k="name"            v={USER.name} />
              <Field k="branch"          v={USER.branch} />
              <Field k="year"            v={USER.year} />
              <Field k="college"         v={USER.college} />
              <Field k="role"            v={USER.role} />
              <Field k="location"        v={USER.location} />
              <Field k="email"           v={USER.email} />
              {/* <Field k="experience_yrs"  v={USER.experience} /> */}
              <Field k="open_to_work"    v={USER.available} />
              <a><Field k="github"          v={USER.github} /></a>
              <Field k="linkedin"        v={USER.linkedin} />
              <Field k="bio"             v={USER.bio} />
            </div>
            <DocActions
              onEdit={() => onAction("Editing about_me document...")}
              onClone={() => onAction("Document cloned!")}
              onCopy={() => { navigator.clipboard.writeText(JSON.stringify(USER, null, 2)); onAction("Document copied to clipboard!"); }}
              onDelete={() => onAction("Nice try! You can't delete the developer 😄", "error")}
            />
          </>
        )}
      </div>

      {/* DSA Stats card */}
      <div className="doc-card">
        <DocHeader id="507f1f77bcf86cd799439002" expanded={true} toggle={() => {}} />
        <div style={{ padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 6 }}>
          <Field k="platform"        v="LeetCode" />
          <Field k="problems_solved" v={DSA_STATS.leetcode.solved} />
          <Field k="easy"            v={DSA_STATS.leetcode.easy} />
          <Field k="medium"          v={DSA_STATS.leetcode.medium} />
          <Field k="hard"            v={DSA_STATS.leetcode.hard} />
          <Field k="global_rank"     v={DSA_STATS.leetcode.rank} />
          <Field k="contest_rating"  v={DSA_STATS.leetcode.rating} />
          <Field k="current_streak"  v={DSA_STATS.leetcode.streak} />
        </div>
        <DocActions
          onEdit={() => onAction("Opening LeetCode...", "info")}
          onClone={() => onAction("Stats cloned!")}
          onCopy={() => { navigator.clipboard.writeText(JSON.stringify(DSA_STATS, null, 2)); onAction("Stats copied!"); }}
          onDelete={() => onAction("Can't delete achievements! 🏆", "error")}
        />
      </div>

      {/* GFG Stats */}
      <div className="doc-card">
        <DocHeader id="507f1f77bcf86cd799439003" expanded={true} toggle={() => {}} />
        <div style={{ padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 6 }}>
          <Field k="platform"       v="GeeksForGeeks" />
          <Field k="problems_solved" v={DSA_STATS.gfg.solved} />
          <Field k="score"          v={DSA_STATS.gfg.score} />
          <Field k="institute_rank" v={DSA_STATS.gfg.instituteRank} />
          <Field k="max_streak"     v={DSA_STATS.gfg.streak} />
        </div>
        <DocActions
          onEdit={() => onAction("Opening GFG profile...", "info")}
          onClone={() => onAction("Stats cloned!")}
          onCopy={() => { navigator.clipboard.writeText(JSON.stringify(DSA_STATS.gfg, null, 2)); onAction("Copied!"); }}
          onDelete={() => onAction("GFG rank is permanent! 🎯", "error")}
        />
      </div>
    </div>
  );
}
