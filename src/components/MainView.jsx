import { useState } from "react";
import FilterBar        from "./FilterBar";
import Topbar           from "./Topbar";
import StatusBar        from "./StatusBar";
import AboutCollection  from "./AboutCollection";
import ProjectsCollection from "./ProjectsCollection";
import SkillsCollection from "./SkillsCollection";
import ExperienceCollection from "./ExperienceCollection";
import ResumeCollection from "./ResumeCollection";
import ContactCollection from "./ContactCollection";
import DsaCollection    from "./DsaCollection";
import { COLLECTIONS }  from "../data/portfolioData";

const COLLECTION_DOCS = {
  about_me:   3,
  projects:   6,
  skills:     5,
  experience: 3,
  dsa_stats:  3,
  resume:     1,
  contact:    1,
};

export default function MainView({ collection, onAction }) {
  const [filter,  setFilter]  = useState("");
  const [view,    setView]    = useState("List");
  const [queryTime] = useState(Math.floor(Math.random() * 4) + 1);

  const total = COLLECTION_DOCS[collection] ?? 1;

  const handleFind  = () => onAction(`Querying ${collection} with filter: ${filter || "{}"}`);
  const handleReset = () => { setFilter(""); onAction("Filter cleared"); };
  const handleAdd   = () => onAction(`Opening insert document dialog for ${collection}...`, "info");
  const handleImport = () => onAction("Import feature — drag & drop your JSON file!", "info");
  const handleExport = () => {
    onAction(`Exporting ${collection} as JSON...`);
    // simulate export
    const data = { collection, exportedAt: new Date().toISOString(), documents: total };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${collection}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderCollection = () => {
    switch (collection) {
      case "about_me":   return <AboutCollection onAction={onAction} />;
      case "projects":   return <ProjectsCollection onAction={onAction} />;
      case "skills":     return <SkillsCollection onAction={onAction} />;
      case "experience": return <ExperienceCollection onAction={onAction} />;
      case "dsa_stats":  return <DsaCollection onAction={onAction} />;
      case "resume":     return <ResumeCollection onAction={onAction} />;
      case "contact":    return <ContactCollection onAction={onAction} />;
      default:           return <AboutCollection onAction={onAction} />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", minHeight: 0 }}>
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
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "14px 16px", minHeight: 0 }}>
        {renderCollection()}
      </div>
      <StatusBar collection={collection} shown={total} total={total} queryTime={queryTime} />
    </div>
  );
}
