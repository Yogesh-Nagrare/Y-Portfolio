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
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      gap: 48,
      padding: "40px 24px",
    }}>

      {/* ── Header ── */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: 11,
          color: "var(--text4)",
          fontFamily: "var(--mono)",
          marginBottom: 12,
          letterSpacing: "0.05em",
        }}>
        </div>
        <h2 style={{
          fontSize: 22,
          fontWeight: 600,
          color: "var(--text)",
          fontFamily: "var(--mono)",
          marginBottom: 8,
        }}>
          <span style={{ color: "var(--green)" }}>connect</span>
          <span style={{ color: "var(--text4)" }}>(</span>
          <span style={{ color: "var(--syn-str)" }}>"Yogesh"</span>
          <span style={{ color: "var(--text4)" }}>)</span>
        </h2>
        <p style={{
          fontSize: 13,
          color: "var(--text3)",
          fontFamily: "var(--mono)",
          letterSpacing: "0.01em",
        }}>
          Open to opportunities · collaborations · and conversations
        </p>
      </div>

      {/* ── Link cards grid ── */}
      {/* ── Link cards grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 24,
        width: "100%",
        maxWidth: 560,
      }}>
        {LINKS.map((link, index) => (
          <a
            key={link.key}
            href={link.href}
            target={link.key === "email" || link.key === "phone" ? "_self" : "_blank"}
            rel="noreferrer"
            style={{
              textDecoration: "none",
              // Center the third card across both columns
              ...(index === 2 && {
                gridColumn: "1 / -1",
                justifySelf: "center",
                width: "calc(50% - 12px)", // matches the width of one card (accounts for gap)
              }),
            }}
            onClick={(e) => {
              if (link.key === "email") {
                e.preventDefault();
                navigator.clipboard.writeText(link.val);
                onAction("Email copied to clipboard!");
              }
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: "32px 20px",
                background: "var(--bg2)",
                border: "1px solid rgba(0,237,100,0.35)",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.25s ease",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 0 10px rgba(0,237,100,0.06), 0 0 20px rgba(0,237,100,0.03)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#00ed64";
                e.currentTarget.style.boxShadow   = "0 0 0 1px #00ed64, 0 0 24px rgba(0,237,100,0.22), 0 0 48px rgba(0,237,100,0.10)";
                e.currentTarget.style.background  = "var(--bg4)";
                e.currentTarget.querySelector(".link-icon").style.color  = "#00ed64";
                e.currentTarget.querySelector(".link-icon").style.filter = "drop-shadow(0 0 10px rgba(0,237,100,0.7))";
                e.currentTarget.querySelector(".link-label").style.color = "#00ed64";
                e.currentTarget.querySelector(".link-val").style.color   = "var(--text2)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(0,237,100,0.35)";
                e.currentTarget.style.boxShadow   = "0 0 10px rgba(0,237,100,0.06), 0 0 20px rgba(0,237,100,0.03)";
                e.currentTarget.style.background  = "var(--bg2)";
                e.currentTarget.querySelector(".link-icon").style.color  = "rgba(0,237,100,0.6)";
                e.currentTarget.querySelector(".link-icon").style.filter = "drop-shadow(0 0 4px rgba(0,237,100,0.3))";
                e.currentTarget.querySelector(".link-label").style.color = "var(--text2)";
                e.currentTarget.querySelector(".link-val").style.color   = "var(--text4)";
              }}
            >
              {/* Icon */}
              <div
                className="link-icon"
                style={{
                  color: "var(--text3)",
                  transition: "color 0.25s, filter 0.25s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {link.svg}
              </div>

              {/* Label */}
              <div style={{ textAlign: "center" }}>
                <div
                  className="link-label"
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text2)",
                    fontFamily: "var(--mono)",
                    marginBottom: 5,
                    transition: "color 0.25s",
                    letterSpacing: "0.02em",
                  }}
                >
                  {link.label}
                </div>
                <div
                  className="link-val"
                  style={{
                    fontSize: 10,
                    color: "var(--text4)",
                    fontFamily: "var(--mono)",
                    transition: "color 0.25s",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 160,
                  }}
                >
                  {link.val}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── Footer status ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 11,
        color: "var(--text4)",
        fontFamily: "var(--mono)",
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--green)",
          boxShadow: "0 0 6px rgba(0,237,100,0.8)",
          animation: "pulse 2s ease-in-out infinite",
        }} />
        <span style={{color: "white"}}>available_for_work</span>
        <span style={{ color: "var(--text4)", margin: "0 4px" }}>:</span>
        <span style={{ color: "var(--green)" }}>true</span>
      </div>

    </div>
  );
}


// import { USER } from "../data/portfolioData";

// const LINKS = [
//   {
//     label: "GitHub",
//     key:   "github",
//     val:   USER.github,
//     href:  USER.github,
//     svg: (
//       <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "LinkedIn",
//     key:   "linkedin",
//     val:   USER.linkedin,
//     href:  USER.linkedin,
//     svg: (
//       <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//       </svg>
//     ),
//   },
//   {
//     label: "Email",
//     key:   "email",
//     val:   USER.email,
//     href:  `mailto:${USER.email}`,
//     svg: (
//       <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-.06.006-.119.017-.176l6.528 4.896 5.455 4.092 5.455-4.092 6.528-4.896c.011.057.017.116.017.176zM23.616 4.5l-6.528 4.896-5.088 3.816-5.088-3.816L.384 4.5A1.636 1.636 0 011.636 3.818h20.728c.657 0 1.226.39 1.252.682z"/>
//       </svg>
//     ),
//   },
// ];

// export default function ContactCollection({ onAction }) {
//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       justifyContent: "center",
//       minHeight: "70vh",
//       gap: 48,
//       padding: "40px 24px",
//     }}>

//       {/* ── Header ── */}
//       <div style={{ textAlign: "center" }}>
//         <div style={{
//           fontSize: 11,
//           color: "var(--text4)",
//           fontFamily: "var(--mono)",
//           marginBottom: 12,
//           letterSpacing: "0.05em",
//         }}>
//           {`// db.contact.find({ available: true })`}
//         </div>
//         <h2 style={{
//           fontSize: 22,
//           fontWeight: 600,
//           color: "var(--text)",
//           fontFamily: "var(--mono)",
//           marginBottom: 8,
//         }}>
//           <span style={{ color: "var(--green)" }}>connect</span>
//           <span style={{ color: "var(--text4)" }}>(</span>
//           <span style={{ color: "var(--syn-str)" }}>"Yogesh"</span>
//           <span style={{ color: "var(--text4)" }}>)</span>
//         </h2>
//         <p style={{
//           fontSize: 13,
//           color: "var(--text3)",
//           fontFamily: "var(--mono)",
//           letterSpacing: "0.01em",
//         }}>
//           Open to opportunities · collaborations · and conversations
//         </p>
//       </div>

//       {/* ── Link cards grid ── */}
//       <div style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(2, 1fr)",
//         gap: 24,
//         width: "100%",
//         maxWidth: 560,
//       }}>
//         {LINKS.map((link) => (
//           <a
//             key={link.key}
//             href={link.href}
//             target={link.key === "email" || link.key === "phone" ? "_self" : "_blank"}
//             rel="noreferrer"
//             style={{ textDecoration: "none" }}
//             onClick={(e) => {
//               if (link.key === "email") {
//                 e.preventDefault();
//                 navigator.clipboard.writeText(link.val);
//                 onAction("Email copied to clipboard!");
//               }
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 16,
//                 padding: "32px 20px",
//                 // Set the active "hover" styles as the default
//                 background: "var(--bg4)",
//                 border: "1px solid #00ed64",
//                 borderRadius: 10,
//                 cursor: "pointer",
//                 position: "relative",
//                 overflow: "hidden",
//                 boxShadow: "0 0 0 1px #00ed64, 0 0 24px rgba(0,237,100,0.22), 0 0 48px rgba(0,237,100,0.10)",
//               }}
//             >
//               {/* Icon - Always glowing */}
//               <div
//                 style={{
//                   color: "#00ed64",
//                   filter: "drop-shadow(0 0 10px rgba(0,237,100,0.7))",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 {link.svg}
//               </div>

//               {/* Label & Value - Always active colors */}
//               <div style={{ textAlign: "center" }}>
//                 <div
//                   style={{
//                     fontSize: 13,
//                     fontWeight: 600,
//                     color: "#00ed64", // Active label color
//                     fontFamily: "var(--mono)",
//                     marginBottom: 5,
//                     letterSpacing: "0.02em",
//                   }}
//                 >
//                   {link.label}
//                 </div>
//                 <div
//                   style={{
//                     fontSize: 10,
//                     color: "var(--text2)", // Lighter value color
//                     fontFamily: "var(--mono)",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap",
//                     maxWidth: 160,
//                   }}
//                 >
//                   {link.val}
//                 </div>
//               </div>
//             </div>
//           </a>
//         ))}
//       </div>

//       {/* ── Footer status ── */}
//       <div style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 8,
//         fontSize: 11,
//         color: "var(--text4)",
//         fontFamily: "var(--mono)",
//       }}>
//         <div style={{
//           width: 6, height: 6, borderRadius: "50%",
//           background: "var(--green)",
//           boxShadow: "0 0 6px rgba(0,237,100,0.8)",
//           animation: "pulse 2s ease-in-out infinite",
//         }} />
//         <span>available_for_work</span>
//         <span style={{ color: "var(--text4)", margin: "0 4px" }}>:</span>
//         <span style={{ color: "var(--green)" }}>true</span>
//       </div>

//     </div>
//   );
// }