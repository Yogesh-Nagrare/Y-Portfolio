import { useState, useEffect } from "react";

export function useTyping(lines, speed = 45, deleteSpeed = 25, pause = 2200) {
  const [text,     setText]     = useState("");
  const [lineIdx,  setLineIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!lines || lines.length === 0) return;
    const line = lines[lineIdx];
    let t;
    if (!deleting && charIdx < line.length) {
      t = setTimeout(() => { setText(line.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, speed);
    } else if (!deleting && charIdx === line.length) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => { setText(line.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, deleteSpeed);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setLineIdx(i => (i + 1) % lines.length);
    }
    return () => clearTimeout(t);
  }, [charIdx, deleting, lineIdx, lines, speed, deleteSpeed, pause]);

  return text;
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const copy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return { copied, copy };
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };
  return { toasts, show };
}
