import { USER } from "../data/portfolioData";

const LINKS = [
  {
    label: "GitHub",
    key:   "github",
    val:   USER.github,
    href:  USER.github,
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    key:   "linkedin",
    val:   USER.linkedin,
    href:  USER.linkedin,
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    key:   "email",
    val:   USER.email,
    href:  `mailto:${USER.email}`,
    svg: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.06.006-.119.017-.176l6.528 4.896 5.455 4.092 5.455-4.092 6.528-4.896c.011.057.017.116.017.176zM23.616 4.5l-6.528 4.896-5.088 3.816-5.088-3.816L.384 4.5A1.636 1.636 0 011.636 3.818h20.728c.657 0 1.226.39 1.252.682z"/>
      </svg>
    ),
  },
];

export default function ContactCollection({ onAction }) {
  return (
    <>
      {/* Inject responsive styles */}
      <style>{`
        .contact-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
          gap: 40px;
          padding: 40px 24px;
        }
        .contact-grid-inner {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          width: 100%;
          max-width: 520px;
        }
        .contact-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 32px 20px;
          background: var(--bg4);
          border: 1px solid #00ed64;
          border-radius: 10px;
          cursor: pointer;
          width: 100%;
          box-shadow: 0 0 0 1px #00ed64,
                      0 0 24px rgba(0,237,100,0.18),
                      0 0 48px rgba(0,237,100,0.08);
          transition: box-shadow 0.25s ease, background 0.2s ease;
          text-decoration: none;
        }
        .contact-card:hover {
          background: var(--bg5);
          box-shadow: 0 0 0 1px #00ed64,
                      0 0 32px rgba(0,237,100,0.30),
                      0 0 64px rgba(0,237,100,0.14);
        }
        .contact-card-icon {
          color: #00ed64;
          filter: drop-shadow(0 0 8px rgba(0,237,100,0.6));
          display: flex;
          align-items: center;
          justify-content: center;
          transition: filter 0.25s;
        }
        .contact-card:hover .contact-card-icon {
          filter: drop-shadow(0 0 14px rgba(0,237,100,0.9));
        }
        .contact-card-label {
          font-size: 13px;
          font-weight: 600;
          color: #00ed64;
          font-family: var(--mono);
          margin-bottom: 4px;
          letter-spacing: 0.02em;
        }
        .contact-card-val {
          font-size: 10px;
          color: var(--text2);
          font-family: var(--mono);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 160px;
          text-align: center;
        }
        /* Email card spans full width and centers itself */
        .contact-card-email-wrap {
          grid-column: span 2;
          display: flex;
          justify-content: center;
        }
        .contact-card-email-wrap .contact-card {
          max-width: calc(50% - 10px);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .contact-page {
            gap: 28px;
            padding: 24px 16px;
            min-height: 60vh;
          }
          .contact-grid-inner {
            grid-template-columns: 1fr;
            max-width: 100%;
            gap: 14px;
          }
          .contact-card-email-wrap {
            grid-column: span 1;
          }
          .contact-card-email-wrap .contact-card {
            max-width: 100%;
          }
          .contact-card {
            padding: 24px 16px;
            gap: 12px;
          }
          .contact-card-val {
            max-width: 240px;
            font-size: 10px;
          }
        }

        @media (max-width: 380px) {
          .contact-card {
            padding: 20px 12px;
          }
          .contact-card-label {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="contact-page">

        {/* ── Header ── */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{
            fontSize: 22,
            fontWeight: 600,
            color: "var(--text)",
            fontFamily: "var(--mono)",
            marginBottom: 8,
          }}>
            <span style={{ color: "var(--green)" }}>connect</span>
            <span style={{ color: "var(--text4)" }}>(</span>
            <span style={{ color: "var(--syn-str)" }}>"{USER.name.split(" ")[0]}"</span>
            <span style={{ color: "var(--text4)" }}>)</span>
          </h2>
          <p style={{
            fontSize: 12,
            color: "var(--text3)",
            fontFamily: "var(--mono)",
            letterSpacing: "0.01em",
          }}>
            Open to opportunities · collaborations · and conversations
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="contact-grid-inner">
          {LINKS.map((link) => {
            const isEmail = link.key === "email";
            const card = (
              <a
                key={link.key}
                href={link.href}
                target={isEmail ? "_self" : "_blank"}
                rel="noreferrer"
                className="contact-card"
                onClick={isEmail ? (e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(link.val);
                  onAction("Email copied to clipboard!");
                } : undefined}
              >
                <div className="contact-card-icon">{link.svg}</div>
                <div style={{ textAlign: "center" }}>
                  <div className="contact-card-label">{link.label}</div>
                  <div className="contact-card-val">{link.val}</div>
                </div>
              </a>
            );

            if (isEmail) {
              return (
                <div key={link.key} className="contact-card-email-wrap">
                  {card}
                </div>
              );
            }
            return card;
          })}
        </div>

        {/* ── Footer status ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11,
          fontFamily: "var(--mono)",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <div style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: "var(--green)",
            boxShadow: "0 0 6px rgba(0,237,100,0.8)",
            animation: "pulse 2s ease-in-out infinite",
            flexShrink: 0,
          }} />
          <span style={{ color: "var(--text2)" }}>available_for_work</span>
          <span style={{ color: "var(--text4)" }}>:</span>
          <span style={{ color: "var(--green)" }}>true</span>
        </div>

      </div>
    </>
  );
}