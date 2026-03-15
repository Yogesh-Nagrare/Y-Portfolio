// ── Edit this file to personalise your entire portfolio ──────

export const USER = {
  name:       "Yogesh Nagrare",
  username:   "yogesh_nagrare",
  // phone:      "+91 9284150677",
  branch:     "Computer Science and Engineering",
  year:       "3rd Year",
  role:       "Full Stack Developer | MERN Stack",
  location:   "Nagpur, India",
  email:      "yogeshnagrare2004@gmail.com",
  website:    "",
  github:     "https://github.com/Yogesh-Nagrare",
  linkedin:   "https://www.linkedin.com/in/yogesh-nagrare4/",
  bio:        "BTech student at YCCE Nagpur passionate about building full-stack web applications and solving DSA problems. I enjoy building developer tools, exploring backend systems and integrating AI into applications.",
  available:  true,
  // experience: 2,                                      // ← uncommented, set your value
  college:    "YCCE Nagpur",
  resumeUrl:  import.meta.env.VITE_RESUME_URL || "",  // ← fixed env variable name
};

export const SKILLS = [
  { category: "frontend",  proficiency: 80, years: 2, tools: ["React", "Next.js", "Tailwind", "HTML", "CSS", "JavaScript"] },
  { category: "backend",   proficiency: 82, years: 2, tools: ["Node.js", "Express", "REST API"] },
  { category: "database",  proficiency: 90, years: 2, tools: ["MongoDB", "Redis", "SQL"] },
  { category: "languages", proficiency: 90, years: 3, tools: ["JavaScript", "C++"] },
];

export const PROJECTS = [
    {
    _id: "proj_001",
    name:        "AlgoSprint",
    description: "Online code editor similar to LeetCode where users can write and run code in multiple languages using Judge0 API.",
    language:    "JavaScript",
    langColor:   "#f1e05a",
    stars:       0,
    forks:       0,
    status:      "active",
    topics:      ["react", "judge0", "code-editor"],
    url:         "https://github.com/Yogesh-Nagrare/AlgoSprint",
    demo:        "https://algo-sprint-iota.vercel.app",
  },
  {
    _id: "proj_002",
    name:        "Uchiha Monitor",
    description: "Developer API testing tool similar to Postman with request collections, environment variables and AI integration for generating requests.",
    language:    "JavaScript",
    langColor:   "#f1e05a",
    stars:       0,
    forks:       0,
    status:      "active",
    topics:      ["mern", "api-testing", "ai"],
    url:         "https://github.com/Yogesh-Nagrare/UchihaMonitor",
    demo:        "https://uchiha-monitor.vercel.app",
  },
  {
    _id: "proj_003",
    name:        "College Naukri Platform",
    description: "Full stack job portal for college students where recruiters can post jobs and students can apply. Includes authentication, role-based access and job management dashboard.",
    language:    "JavaScript",
    langColor:   "#f1e05a",
    stars:       0,
    forks:       0,
    status:      "active",
    topics:      ["mern", "authentication", "job-portal"],
    url:         "https://github.com/Yogesh-Nagrare/Portal-Project",
    demo:        "https://ycce-placement-portal.vercel.app/",
  },
];

export const EXPERIENCE = [
  {
    _id:      "exp_001",
    company:  "Personal Projects",
    role:     "Full Stack Developer",
    type:     "Self Learning",
    start:    "2023-01",
    end:      null,
    current:  true,
    location: "Nagpur, India",
    points: [
      "Built multiple full stack applications using MERN stack",
      "Integrated external APIs like Judge0 and AI APIs into projects",
      "Practicing Data Structures and Algorithms regularly on coding platforms"
    ],
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
];

export const DSA_STATS = {
  leetcode: { solved: 192, easy: 72, medium: 99, hard: 21},
  gfg:      { solved: 109, score: 316, basic:15 , easy: 40, medium: 50, hard: 4},
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
];