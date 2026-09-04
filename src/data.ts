export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  date?: string;
  tags: string[];
  links: ProjectLink[];
  points: string[];
  badge?: string;
  highlightMetric?: string;
  architecturePipeline?: string[];
  systemId?: string;
  domain?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  date: string;
  score: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  location?: string;
  points: string[];
  metrics?: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  status: string;
  handle: string;
  photo: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  scholar: string;
  coordinates: {
    lat: string;
    lng: string;
    location: string;
  };
  education: EducationItem[];
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    ml_data: string[];
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  achievements: {
    title: string;
    desc: string;
    badge?: string;
  }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Abhiram Alla",
  title: "Systems & AI Engineer",
  status: "CORE SYSTEMS ACTIVE // 2026",
  handle: "abhiram86",
  photo: "/profile.jpg",
  location: "Raipur, India",
  coordinates: {
    lat: "21.1642° N",
    lng: "81.7828° E",
    location: "Raipur, CG, IN",
  },
  phone: "+91 8897428738",
  email: "abhiramalla86@gmail.com",
  github: "https://github.com/Abhiram86",
  linkedin: "https://www.linkedin.com/in/alla-abhiram-0684512ab/",
  scholar:
    "https://scholar.google.com/citations?hl=en&user=428P4XcAAAAJ&view_op=list_works",
  education: [
    {
      institution:
        "International Institute of Information Technology (IIIT), Naya Raipur",
      degree: "B.Tech in Computer Science and Engineering",
      date: "Expected 2027",
      score: "CGPA: 7.9",
    },
    {
      institution: "Telangana",
      degree: "Class XII (CBSE)",
      date: "2023",
      score: "94.9%",
    },
    {
      institution: "Class X (CBSE)",
      degree: "Secondary Education",
      date: "2021",
      score: "96%",
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "C++", "SQL", "Go"],
    frontend: [
      "React.js",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "WebAssembly (WASM)",
      "TUI Frameworks",
    ],
    backend: [
      "Node.js",
      "Express",
      "Flask",
      "Systems Programming",
      "Concurrency",
      "API Design",
    ],
    ml_data: [
      "Data Structures",
      "High-Performance Computing (HPC)",
      "Data Science",
      "Machine Learning",
    ],
  },
  experience: [
    {
      company: "Labmentix",
      role: "Full Stack Developer Intern",
      date: "June 2025 - August 2025",
      location: "Remote / Hybrid",
      metrics: ["-22% API Latency", "Zero-Trust Signing"],
      points: [
        "Developed scalable multi-tenant web applications in React and Node.js, implementing custom state management and reducing API load times by 22%.",
        "Architected secure storage pipelines and cryptographic signing systems for 'Vaultdrive' and 'Signer', establishing modular, role-based access schemas.",
      ],
    },
    {
      company: "Prime Vacations",
      role: "Full Stack Developer Intern",
      date: "October 2025 – January 2026",
      location: "Remote",
      metrics: ["Sub-second Scrape Execution", "Automated Proxy Mesh"],
      points: [
        "Refactored legacy UI elements and server processing routes, eliminating rendering latency and eliminating critical runtime server bugs under concurrency tests.",
        "Engineered a highly concurrent python-based web scraping platform utilizing automated proxy-rotation engines, ensuring low server resource consumption and sub-second execution latency.",
      ],
    },
  ],
  projects: [
    {
      id: "errand",
      systemId: "SYS-01",
      domain: "ON-DEVICE AGENTIC AI",
      name: "Errand — On-Device AI Agent",
      date: "Aug 2026",
      badge: "FLAGSHIP",
      highlightMetric: "12-Turn ReAct // 200K Context",
      tags: ["Flutter", "LLM Agents", "Tool Calling", "SQLite"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/errand" }],
      architecturePipeline: [
        "Prompt / Intent Stream",
        "ReAct Agent Loop (12 Turns)",
        "Guarded IO & Tavily",
        "Drift/SQLite Persistence",
      ],
      points: [
        "On-device AI agent for Android: custom tool-calling loop over OpenAI-compatible APIs with up to 12 turns per request and live streaming of text and reasoning deltas.",
        "Implemented guarded document reads (PDF/DOCX/XLSX/PPTX), sandboxed storage navigation, web search/fetch (Tavily), and 17 curated Android intents.",
        "Context management against a 200K-char limit; local-first persistence in Drift/SQLite.",
      ],
    },
    {
      id: "transnet",
      systemId: "SYS-02",
      domain: "P2P PROTOCOLS",
      name: "TransNet",
      date: "2026",
      badge: "DISTRIBUTED",
      highlightMetric: "Zero Router // Atomic Writes",
      tags: ["Go", "Kotlin", "React Native", "UDP", "TCP", "P2P"],
      links: [
        {
          label: "Releases",
          url: "https://github.com/Abhiram86/transnet/releases",
        },
      ],
      architecturePipeline: [
        "UDP Broadcast Discovery",
        "P2P Handshake Mesh",
        "Go Gomobile Engine (AAR)",
        "Kotlin Expo Bridge",
        "TCP Byte Stream Pipeline",
      ],
      points: [
        "Peer-to-peer Android file transfer using UDP broadcast for device discovery and TCP for streaming — no internet or router required.",
        "Implemented real-time per-file and aggregate progress bars, cancel/skip controls, and atomic writes (.part files, rename on success, delete on failure).",
        "Built the transfer engine in Go via gomobile AAR, bridged to Expo React Native through Kotlin Expo Modules API.",
      ],
    },
    {
      id: "echotune",
      systemId: "SYS-03",
      domain: "SYSTEMS & TUI",
      name: "EchoTune",
      date: "May 2026",
      badge: "LOW-LEVEL",
      highlightMetric: "<3% CPU Utilization",
      tags: ["Go", "CLI", "TUI"],
      links: [
        { label: "GitHub", url: "https://github.com/Abhiram86/echotune" },
      ],
      architecturePipeline: [
        "Keypress Stdin Loop",
        "Bubbletea Elm State Machine",
        "Concurrent Goroutine Pool",
        "ANSI Terminal Buffer",
      ],
      points: [
        "Designed an interactive, lightweight keyboard-driven Terminal User Interface (TUI) in Go using the Bubbletea framework, implementing concurrent search requests, reducing CPU usage to <3% compared to browser-based utilities.",
      ],
    },
    {
      id: "datarover",
      systemId: "SYS-04",
      domain: "WASM & DATA ENGINES",
      name: "In-Browser WebAssembly Query Engine",
      date: "Jan 2026 - Present",
      badge: "LIVE DEMO",
      highlightMetric: "0ms Server Overhead",
      tags: ["JavaScript", "Pyodide", "DuckDB", "WebAssembly"],
      links: [
        { label: "Live Demo", url: "https://datarover.vercel.app/" },
        { label: "GitHub", url: "https://github.com/Abhiram86/datarover" },
      ],
      architecturePipeline: [
        "Local CSV / JSON Ingestion",
        "Pyodide WASM Runtime",
        "DuckDB In-Memory Execution",
        "Zero-Roundtrip Vector Result",
      ],
      points: [
        "Engineered an in-browser database execution engine utilizing Pyodide (WASM) and DuckDB, allowing client-side local queries directly on JSON/CSV datasets, removing server compute overhead entirely.",
      ],
    },
    {
      id: "vaultdrive",
      systemId: "SYS-05",
      domain: "CRYPTOGRAPHIC STORAGE",
      name: "Vaultdrive",
      date: "Aug 2025 - Sep 2025",
      badge: "STORAGE",
      highlightMetric: "Role-Based ACL & Signatures",
      tags: ["React", "Node.js", "Cryptography", "Storage"],
      links: [
        {
          label: "Client",
          url: "https://github.com/Abhiram86/vaultdrive_client",
        },
        {
          label: "Server",
          url: "https://github.com/Abhiram86/vaultdrive_server",
        },
      ],
      architecturePipeline: [
        "Client Upload Stream",
        "Cryptographic Digest",
        "Chunked Object Storage",
        "Signed Token Access",
      ],
      points: [
        "Built a cloud storage web application enabling users to store and manage files.",
        "Implemented permission controls to support both private file storage and public link sharing.",
      ],
    },
    {
      id: "eventsync",
      systemId: "SYS-06",
      domain: "REAL-TIME SOCKETS",
      name: "Event Sync",
      date: "Jul 2025",
      badge: "SOCKETS",
      highlightMetric: "Sub-50ms Delta Broadcast",
      tags: ["React Native", "WebSockets"],
      links: [
        { label: "GitHub", url: "https://github.com/Abhiram86/event_sync" },
      ],
      architecturePipeline: [
        "Mobile App Client",
        "Persistent WebSocket Tunnel",
        "PubSub Event Broker",
        "Instant State Sync",
      ],
      points: [
        "Developed a React Native application for event registration.",
        "Leveraged WebSockets to display live registration updates to users as they join or leave events.",
      ],
    },
    {
      id: "docquer",
      systemId: "SYS-07",
      domain: "LLM & COMPILERS",
      name: "Docquer",
      date: "Nov 2024 - Dec 2024",
      badge: "TOOLING",
      highlightMetric: "BYO API Key Architecture",
      tags: ["Chatbot", "Markdown", "Custom Parser"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/docquer" }],
      architecturePipeline: [
        "User Query",
        "LLM Streaming API",
        "AST Tokenizer & Lexer",
        "Custom Markdown Tree",
      ],
      points: [
        "Created a customizable chatbot interface supporting bring-your-own API keys.",
        "Implemented a custom Markdown renderer to correctly display complex outputs like tables and code blocks in chat responses.",
      ],
    },
    {
      id: "nakama",
      systemId: "SYS-08",
      domain: "REAL-TIME MESSAGING",
      name: "Nakama",
      date: "Aug 2024 - Sep 2024",
      badge: "SOCKETS",
      highlightMetric: "Zero-Drop State Sync",
      tags: ["Sockets", "Real-time", "State Sync"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/nakama" }],
      architecturePipeline: [
        "Bi-directional Sockets",
        "Message Sequence Ordering",
        "Ack/Retry Heartbeat",
        "Local State Buffer",
      ],
      points: [
        "Built a real-time socket-based chatting application.",
        "Focused on state synchronization to ensure reliable, error-free bidirectional message delivery between clients.",
      ],
    },
    {
      id: "readit",
      systemId: "SYS-09",
      domain: "COMMUNITY PLATFORMS",
      name: "Readit",
      date: "Mar 2024 - May 2025",
      badge: "FULL-STACK",
      highlightMetric: "Dynamic Thread Graphs",
      tags: ["Social Media", "Full Stack", "Relational DB"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/readit" }],
      architecturePipeline: [
        "Client App",
        "Relational Schema",
        "Media Pipeline",
        "Thread Feed Engine",
      ],
      points: [
        "Developed a social media platform featuring posts, image handling, and community creation.",
      ],
    },
  ],
  achievements: [
    {
      title: "Research Publications",
      desc: "Published 2 peer-reviewed Research papers in IJRSI journal, demonstrating rigorous architectural analysis, technical writing, and problem validation.",
      badge: "GOOGLE SCHOLAR",
    },
    {
      title: "Competitive Ranks",
      desc: "JEE Advance Rank: 11,802 | JEE Mains Rank: 24,545",
      badge: "NATIONAL RANK",

    },
    {
      title: "Core Systems Specialization",
      desc: "Parallel Computing, High-Performance Computing (HPC), Engine Optimization, and Computational Infrastructure.",
      badge: "SYSTEMS",
    },
  ],
};
