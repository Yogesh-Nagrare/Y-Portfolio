export function Field({ k, v }) {
  const isUrl = (val) =>
    typeof val === "string" &&
    (val.startsWith("http://") || val.startsWith("https://"));

  const renderVal = (val) => {
    if (val === null)             return <span className="fv-o">null</span>;
    if (typeof val === "boolean") return <span className="fv-b">{val.toString()}</span>;
    if (typeof val === "number")  return <span className="fv-n">{val}</span>;
    if (Array.isArray(val))       return (
      <span className="fv-a">
        [&nbsp;
        {val.map((item, i) => (
          <span key={i}>
            <span style={{ color: "var(--syn-str)" }}>"{item}"</span>
            {i < val.length - 1 && <span style={{ color: "var(--text4)" }}>,&nbsp;</span>}
          </span>
        ))}
        &nbsp;]
      </span>
    );
    if (typeof val === "object")  return <span className="fv-o">{"{ ... }"}</span>;

    if (isUrl(val)) return (
      <a
        href={val}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "var(--syn-str)",
          textDecoration: "none",
          borderBottom: "1px solid rgba(93,184,122,0.3)",
          transition: "color 0.15s, border-color 0.15s",
          fontFamily: "var(--mono)",
          fontSize: 11.5,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = "var(--green)";
          e.currentTarget.style.borderBottomColor = "var(--green)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = "var(--syn-str)";
          e.currentTarget.style.borderBottomColor = "rgba(93,184,122,0.3)";
        }}
      >
        "{val}"
      </a>
    );

    return <span className="fv-s">"{val}"</span>;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 0,
        fontFamily: "var(--mono)",
        fontSize: 12,
        padding: "5px 16px",
        borderBottom: "1px solid var(--border)",
        width: "100%",
        lineHeight: 1.6,
        transition: "background 0.1s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <span className="fk" style={{ minWidth: 170, flexShrink: 0, fontSize: 11.5 }}>{k}</span>
      <span className="fsep" style={{ marginRight: 10, fontSize: 11.5 }}>:</span>
      <span style={{ flex: 1, wordBreak: "break-all", fontSize: 11.5 }}>{renderVal(v)}</span>
    </div>
  );
}

export function DocHeader({ id, expanded, toggle }) {
  return (
    <div
      onClick={toggle}
      style={{
        padding: "7px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "var(--bg4)",
        borderBottom: "1px solid var(--border)",
        cursor: "pointer",
        userSelect: "none",
        transition: "background 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--bg5)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--bg4)"}
    >
      <span style={{ fontSize: 11, color: "var(--text3)", fontFamily: "var(--mono)", letterSpacing: "0.01em" }}>
        _id
        <span style={{ color: "var(--text4)", margin: "0 6px" }}>:</span>
        <span style={{ color: "var(--syn-id)" }}>ObjectId(</span>
        <span style={{ color: "var(--text2)" }}>"{id}"</span>
        <span style={{ color: "var(--syn-id)" }}>)</span>
      </span>
      <span style={{
        marginLeft: "auto", fontSize: 9, color: "var(--text4)",
        transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
        display: "inline-block",
      }}>▾</span>
    </div>
  );
}

export function DocActions({ onEdit, onClone, onCopy, onDelete }) {
  return (
    <div style={{
      padding: "6px 14px",
      borderTop: "1px solid var(--border)",
      display: "flex",
      gap: 5,
      background: "var(--bg3)",
    }}>
      <button
        className="mg-btn mg-btn-outline-green"
        style={{ fontSize: 10.5, padding: "3px 9px" }}
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="mg-btn"
        style={{ fontSize: 10.5, padding: "3px 9px" }}
        onClick={onClone}
      >
        Clone
      </button>
      <button
        className="mg-btn"
        style={{ fontSize: 10.5, padding: "3px 9px" }}
        onClick={onCopy}
      >
        Copy
      </button>
      <button
        onClick={onDelete}
        style={{
          fontSize: 10.5, padding: "3px 9px",
          borderRadius: "var(--radius)",
          border: "1px solid rgba(224,85,85,0.2)",
          background: "transparent",
          color: "var(--red)",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "all 0.15s",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--red-dim)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        Delete
      </button>
    </div>
  );
}