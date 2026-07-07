// ── Edit this file to personalise your entire portfolio ──────

export const USER = {
  name:       "Yogesh Nagrare",
  username:   "yogesh_nagrare",
  // phone:      "+91 9284150677",
  // skill:      "MERN Stack (React, Node.js, Express, MongoDB) | JavaScript | DSA | AI Integration",
  branch:     "Computer Science and Engineering",
  year:       "4th Year",
  role:       "AI Engineer | Full Stack Developer | MERN Stack",
  location:   "Nagpur, India",
  email:      "yogeshnagrare2004@gmail.com",
  phone:      "+91 9284150677",
  website:    "https://y-portfolio-flame.vercel.app/",
  github:     "https://github.com/Yogesh-Nagrare",
  linkedin:   "https://www.linkedin.com/in/yogesh-nagrare4/",
  bio:        "BTech student at YCCE Nagpur passionate about building full-stack web applications and solving DSA problems. I enjoy building developer tools, exploring backend systems and integrating AI into applications.",
  available:  true,
  // experience: 2,                                      // ← uncommented, set your value
  college:    "[YCCE]-Yeshwantrao Chavan College of Engineering,Nagpur",
  resumeUrl:  import.meta.env.VITE_RESUME_URL || "",  // ← fixed env variable name
};

export const SKILLS = [
  { category: "ai_engineer", proficiency: 85, years: 1, tools: ["Vector Databases", "LangChain", "LangGraph", "RAG"] },
  { category: "frontend",  proficiency: 80, years: 2, tools: ["React", "Next.js", "Tailwind", "HTML", "CSS", "JavaScript"] },
  { category: "backend",   proficiency: 82, years: 2, tools: ["Node.js", "Express", "REST API"] },
  { category: "database",  proficiency: 90, years: 2, tools: ["MongoDB", "Redis", "SQL"] },
  { category: "languages", proficiency: 90, years: 3, tools: ["JavaScript", "C++", "C"] },
];

export const PROJECTS = [
  {
    _id: "proj_001",
    name: "AlgoSprint",
    description:
      "Interactive DSA practice platform with timed coding challenges and a built-in multi-language code editor powered by Judge0 API with AI-assisted features.",
    language: "Full Stack with AI integration",
    langColor: "#f1e05a",
    stars: 0,
    forks: 0,
    status: "active",
    topics: ["mern", "ai", "judge0", "code-editor", "dsa"],
    url: "https://github.com/Yogesh-Nagrare/AlgoSprint",
    demo: "https://algo-sprint-iota.vercel.app",
  },
  {
    _id: "proj_002",
    name: "Uchiha Monitor",
    description:
      "API testing and development tool inspired by Postman with request collections, environment variables, and AI-assisted request generation.",
    language: "Full Stack with AI integration",
    langColor: "#f1e05a",
    stars: 0,
    forks: 0,
    status: "active",
    topics: ["mern", "api-testing", "ai", "developer-tool"],
    url: "https://github.com/Yogesh-Nagrare/UchihaMonitor",
    demo: "https://uchiha-monitor.vercel.app",
  },
  {
    _id: "proj_003",
    name: "College Naukri Platform",
    description:
      "Full-stack job portal for college placements where recruiters post jobs and students apply, featuring authentication and role-based dashboards.",
    language: "Full Stack",
    langColor: "#f1e05a",
    stars: 0,
    forks: 0,
    status: "active",
    topics: ["mern", "authentication", "job-portal", "dashboard"],
    url: "https://github.com/Yogesh-Nagrare/Portal-Project",
    demo: "https://ycce-placement-portal.vercel.app/",
  },
];

export const EXPERIENCE = [
  {
    _id:      "exp_001",
    company:  "YCCE",
    role:     "Full Stack Developer",
    type:     "Internship",
    start:    "2025-09",
    end:      "2026-03",
    current:  true,
    location: "Nagpur, India",
    points: [
      " Built a production-grade campus placement portal using the MERN stack following agile practices, connecting 500+ students with verified recruiters through real-time job postings and application tracking.",
      "Architected RBAC for Admin, Recruiter, and Student roles with JWT authentication and middleware validation—reduced unauthorized access incidents to zero and supported 2,000+ daily API requests.",
    ],
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export const DSA_STATS = {
  leetcode: { solved: 321, easy: 114, medium: 174, hard: 33},
  gfg:      { solved: 113, score: 332, basic:15 , easy: 40, medium: 54, hard: 4},
  interviewbit: { solved: 3,},
};

export const COLLECTIONS = [
  { name: "about_me",   count: 1, icon: "👤" },
  { name: "projects",   count: 3, icon: "📦" },
  { name: "skills",     count: 4, icon: "⚡" },
  { name: "experience", count: 1, icon: "💼" },
  { name: "dsa_stats",  count: 3, icon: "🏆" },
  { name: "resume",     count: 1, icon: "📄" },
  { name: "contact",    count: 1, icon: "✉️" },
  { name: "ai_assistant", count: 1, icon: "✦" }
];