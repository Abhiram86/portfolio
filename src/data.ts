export interface ProjectLink {
  label: string;
  url: string;
}

export interface BenchmarkRow {
  stage: string;
  change: string;
  rps: number;
  p95Ms: number;
  memoryMb: number;
}

export interface RejectedTradeoff {
  option: string;
  outcome: string;
}

export interface ProjectMedia {
  type: "video" | "image";
  src: string;
  poster?: string;
  caption: string;
  aspect?: "portrait" | "landscape";
}

export interface ProjectItem {
  id: string;
  name: string;
  subtitle?: string;
  date?: string;
  tags: string[];
  links: ProjectLink[];
  points: string[];
  badge?: string;
  highlightMetric?: string;
  architecturePipeline?: string[];
  pipelineNotes?: string[];
  invariants?: string[];
  benchmarks?: BenchmarkRow[];
  rejectedTradeoffs?: RejectedTradeoff[];
  media?: ProjectMedia;
  diagramId?: "ledger" | "errand" | "datarover" | "transnet" | "echotune";
  systemId?: string;
  domain?: string;
  accentColor?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  date: string;
  score: string;
  coursework?: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  location?: string;
  points: string[];
  metrics?: string[];
}

export interface SignalStat {
  label: string;
  value: string;
  detail: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  availability: string;
  status: string;
  handle: string;
  photo: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  scholar: string;
  resumePdf: string;
  coordinates: {
    lat: string;
    lng: string;
    location: string;
  };
  signals: SignalStat[];
  education: EducationItem[];
  skills: {
    languages: string[];
    backend_db: string[];
    frontend_mobile: string[];
    systems_ai: string[];
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
  title: "Full-Stack, Systems & AI Engineer",
  availability: "Open to SWE, Systems & AI Engineering Roles",
  status: "ACTIVE",
  handle: "abhiram86",
  photo: "/profile.jpg",
  location: "India (Open to Relocate)",
  coordinates: {
    lat: "21.1642° N",
    lng: "81.7828° E",
    location: "Naya Raipur, CG, IN",
  },
  phone: "+91 88974 28738",
  email: "abhiramalla86@gmail.com",
  github: "https://github.com/Abhiram86",
  linkedin: "https://www.linkedin.com/in/abhiram-alla/",
  leetcode: "https://leetcode.com/u/abhiramalla86/",
  scholar:
    "https://scholar.google.com/citations?hl=en&user=428P4XcAAAAJ&view_op=list_works",
  resumePdf: "/Abhiram_Alla_Resume.pdf",
  signals: [
    {
      label: "Ledger Peak",
      value: "3,778 req/s",
      detail: "54ms p95 · 340 MB RAM in Go + Postgres",
    },
    {
      label: "Flight Engine",
      value: "-70% Latency",
      detail: "20s to 6s concurrent scraping & ranking",
    },
    {
      label: "Published Work",
      value: "3 Papers",
      detail: "Latest accepted at LION 20 (Springer LNCS)",
    },
    {
      label: "Open Source & DSA",
      value: "109+ ★ · 350+ LC",
      detail: "44 public repos · Top 2.2% JEE Main",
    },
  ],
  education: [
    {
      institution: "IIIT Naya Raipur",
      degree: "B.Tech in Computer Science and Engineering",
      date: "Expected May 2027",
      score: "CGPA: 7.9/10",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Operating Systems",
        "DBMS",
        "Computer Networks",
        "Computer Architecture",
      ],
    },
    {
      institution: "Class XII (CBSE)",
      degree: "Telangana",
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
    languages: [
      "C++",
      "Go",
      "Python",
      "TypeScript",
      "JavaScript",
      "SQL",
      "Kotlin",
      "Dart",
      "Bash",
    ],
    backend_db: [
      "Node.js",
      "Express",
      "Flask",
      "REST",
      "GraphQL",
      "WebSockets",
      "PostgreSQL",
      "Redis",
      "SQLite",
      "Prisma",
      "Drizzle",
      "TCP/UDP",
    ],
    frontend_mobile: [
      "React",
      "Next.js",
      "React Native",
      "Flutter",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
    ],
    systems_ai: [
      "Docker",
      "Linux",
      "Git",
      "GitHub Actions (CI/CD)",
      "k6",
      "Jest",
      "PyTest",
      "LLM Agents",
      "Structured Outputs",
      "PyTorch",
    ],
  },
  experience: [
    {
      company: "Prime Vacations",
      role: "Full Stack Developer Intern",
      date: "Oct 2025 – Jan 2026",
      location: "Remote",
      metrics: [
        "70% faster flight search (20s to 6s)",
        "Zero-delay cached search",
        "Schema-validated LLM booking",
      ],
      points: [
        "Architected a concurrent Python Google Flights scraper and ranking engine with automated proxy rotation and bounded-memory execution, cutting end-to-end latency by 70% (20s to 6s) on a low-cost server.",
        "Engineered a location-aware semantic search service across hotel and activity tabs with response and image caching, eliminating 1–2s debounced search delays for near-instant repeat queries.",
        "Built an LLM structured-output pipeline turning one-line prompts into schema-validated JSON booking payloads, eliminating malformed submissions and manual multi-step form entry.",
        "Refactored legacy React components and Node.js/Express routes to resolve async race conditions and stale-state bugs, improving UI responsiveness and request stability.",
      ],
    },
    {
      company: "Labmentix",
      role: "Full Stack Developer Intern",
      date: "Jun 2025 – Aug 2025",
      location: "Remote",
      metrics: [
        "22% faster repeat-view loads",
        "Multi-tenant RBAC",
        "Per-tenant storage isolation",
      ],
      points: [
        "Built multi-tenant document vaults and e-signing workflows in React and Node.js with granular RBAC, per-tenant storage isolation, and controlled public link sharing.",
        "Reduced repeat-view load times by 22% via client-side query caching and memoized rendering, eliminating redundant API calls.",
      ],
    },
  ],
  projects: [
    {
      id: "ledger-engine",
      systemId: "01",
      domain: "Distributed Transactions & Storage",
      name: "Ledger Engine",
      subtitle: "Double-Entry Financial Core",
      date: "Nov 2026",
      highlightMetric: "3,778 req/s · 54ms p95 · 340 MB RAM",
      accentColor: "#8b5cf6",
      diagramId: "ledger",
      tags: ["Go", "PostgreSQL", "Docker", "k6", "goose"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Abhiram86/ledger_engine",
        },
      ],
      architecturePipeline: [
        "Idempotency-Key Gate",
        "Single-CTE SQL Tx",
        "Ordered Row Locking",
        "36-Conn Pool & WAL Sync",
        "5s Checkpoint Reconcile",
      ],
      invariants: [
        "0 overdrafts (DB check constraint + 409 rejection)",
        "0 deadlocks under colliding k6 load",
        "0 duplicate debits (go test -race verified)",
        "0 reconciliation mismatches across 1,120 accounts",
      ],
      benchmarks: [
        {
          stage: "Baseline",
          change: "Defaults, 3 API instances",
          rps: 1071,
          p95Ms: 310,
          memoryMb: 411,
        },
        {
          stage: "Checkpoint Reconcile",
          change: "postings.seq incremental audit",
          rps: 1761,
          p95Ms: 169,
          memoryMb: 586,
        },
        {
          stage: "Single-CTE + Tuning",
          change: "One-statement SQL, single Go process",
          rps: 2132,
          p95Ms: 96,
          memoryMb: 371,
        },
        {
          stage: "Fair Account Set",
          change: "1,120 accounts, 36-conn pool, sync_commit=on",
          rps: 3778,
          p95Ms: 54,
          memoryMb: 340,
        },
      ],
      rejectedTradeoffs: [
        {
          option: "PgBouncer",
          outcome: "725 req/s vs 1,071 direct — dropped from scope",
        },
        {
          option: "Split Read/Write Pools",
          outcome: "Worse overall req/s & p95 at every ratio (incl. 4/32)",
        },
        {
          option: "Go Group Commit",
          outcome: "1,376–3,445 req/s vs 3,790 unbatched; Postgres already batches",
        },
        {
          option: "synchronous_commit=off",
          outcome: "Excluded from start — durability non-negotiable for financial state",
        },
      ],
      points: [
        "Built an ACID double-entry ledger in Go and PostgreSQL, collapsing row locking, balance checks, postings, and updates into a single CTE SQL transaction verified at 0 overdrafts, 0 deadlocks, and 0 duplicate debits (go test -race, k6).",
        "Sustained 3,778 req/s at 54 ms p95 in 340 MB RAM (synchronous_commit=on, 1,120 accounts) via incremental checkpoint reconciliation and 36-conn pool tuning, cutting baseline p95 latency by 69% (2x throughput).",
        "Profiled WAL fsync (6.5 ms avg) and row-lock contention, benchmarking and rejecting PgBouncer, split read/write pools, and group commit for worse tail latency; added cursor pagination, Idempotency-Key retries, and Docker Compose.",
      ],
    },
    {
      id: "errand",
      systemId: "02",
      domain: "On-Device Agentic AI",
      name: "Errand",
      subtitle: "On-Device Android AI Agent",
      date: "Aug 2026 – Present",
      highlightMetric: "17 OS Intents · Sandboxed Shell · Browser DOM Agent",
      accentColor: "#0ea5e9",
      diagramId: "errand",
      media: {
        type: "video",
        src: "/media/errand-demo.mp4",
        poster: "/media/errand-poster.jpg",
        caption: "Live Android device demo: tool-calling loop, file inspection, and OS intents",
        aspect: "portrait",
      },
      tags: ["Flutter", "Dart", "Kotlin", "SQLite / Drift", "LLM Agents"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/errand" }],
      architecturePipeline: [
        "Streaming Agent Loop",
        "Tool Registry & Safety Gates",
        "Android Intents + Sandboxed Shell",
        "In-App Browser DOM Bridge",
        "Drift SQLite + AES-256-GCM",
      ],
      invariants: [
        "Zero-root execution with no Accessibility service declared",
        "Destructive shell commands gated behind explicit user approval",
        "API keys encrypted with AES-256-GCM separately from SQLite state",
        "Tool outputs >6K chars cached atomically on disk with head/tail slices",
      ],
      points: [
        "Shipped a zero-root Android AI agent (Flutter/Kotlin) exposing OS intents (17 settings targets, system actions), a sandboxed shell with 3-tier safety gates, and an in-app browser agent (DOM control, OAuth handoff) over a 72-turn tool-calling loop with automatic context compaction.",
        "Implemented local-first 7-table SQLite/Drift persistence, AES-256-GCM secret storage, PDF/Office extraction, AlarmManager + JobScheduler background scheduling, and SHA-256 verified OTA self-updates.",
      ],
    },
    {
      id: "datarover",
      systemId: "03",
      domain: "WebAssembly & Data Engines",
      name: "DataRover",
      subtitle: "Zero-Server AI Analytics",
      date: "Jan 2026 – Present",
      highlightMetric: "0ms Backend Compute · DuckDB-WASM + Pyodide",
      accentColor: "#10b981",
      diagramId: "datarover",
      media: {
        type: "image",
        src: "/media/datarover-ui.webp",
        caption: "In-browser DuckDB-WASM SQL workspace paired with AI schema agent",
        aspect: "landscape",
      },
      tags: ["Next.js", "DuckDB-WASM", "Pyodide", "Drizzle", "Vercel AI SDK"],
      links: [
        { label: "Live App", url: "https://datarover.vercel.app/" },
        { label: "GitHub", url: "https://github.com/Abhiram86/datarover" },
      ],
      architecturePipeline: [
        "CSV / Parquet Ingestion",
        "DuckDB-WASM SQL Engine",
        "Pyodide Python Sandbox",
        "Vercel AI Schema Agent",
        "Neon Postgres (Drizzle)",
      ],
      invariants: [
        "Zero backend compute cost for SQL & Python execution over Parquet datasets",
        "SQL mutations gated behind explicit user confirmation toast",
        "Matplotlib plots stripped from LLM context and stored in Supabase plots bucket",
      ],
      points: [
        "Built a browser-native analytics engine executing full SQL (DuckDB-WASM) and Python (Pyodide) over CSV/Excel datasets client-side with zero backend compute cost.",
        "Developed a Next.js and Vercel AI SDK agent that inspects schemas, runs in-browser SQL/Python, and streams insights across persistent PostgreSQL (Drizzle) workspaces.",
      ],
    },
    {
      id: "transnet",
      systemId: "04",
      domain: "Peer-to-Peer Networking",
      name: "TransNet",
      subtitle: "Offline P2P Android File Transfer",
      date: "Jun 2026 – Jul 2026",
      highlightMetric: "Zero Router · Atomic .part Writes · 3 APK Releases",
      accentColor: "#6366f1",
      diagramId: "transnet",
      tags: ["Go", "Kotlin", "React Native", "UDP", "TCP", "gomobile"],
      links: [
        {
          label: "Releases",
          url: "https://github.com/Abhiram86/transnet/releases",
        },
        {
          label: "GitHub",
          url: "https://github.com/Abhiram86/transnet",
        },
      ],
      architecturePipeline: [
        "UDP Broadcast Discovery",
        "Go Engine (gomobile AAR)",
        "Kotlin Expo Modules Bridge",
        "TCP Byte Stream",
        "Atomic .part Rename",
      ],
      invariants: [
        "Zero internet or router infrastructure required",
        "Writes stream to .part temp files, rename on completion, delete on abort",
        "Per-file and aggregate byte progress streamed across native Kotlin bridge",
      ],
      points: [
        "Peer-to-peer Android file transfer using UDP broadcast for device discovery and TCP for streaming — no internet or router required.",
        "Implemented real-time per-file and aggregate progress bars, cancel/skip controls, and atomic writes (.part files, rename on success, delete on failure).",
        "Built the transfer engine in Go via gomobile AAR, bridged to Expo React Native through Kotlin Expo Modules API across 3 tagged APK releases.",
      ],
    },
    {
      id: "echotune",
      systemId: "05",
      domain: "Systems & Terminal UI",
      name: "EchoTune",
      subtitle: "Go Terminal Music Player",
      date: "May 2026",
      highlightMetric: "<3% CPU Utilization · Cross-Platform Go Binary",
      accentColor: "#14b8a6",
      diagramId: "echotune",
      media: {
        type: "video",
        src: "/media/echotune-demo.mp4",
        poster: "/media/echotune-poster.jpg",
        caption: "Bubbletea TUI searching, queueing, and streaming audio in <3% CPU",
        aspect: "landscape",
      },
      tags: ["Go", "Bubbletea", "CLI", "TUI", "mpv", "yt-dlp"],
      links: [
        { label: "GitHub", url: "https://github.com/Abhiram86/echotune" },
      ],
      architecturePipeline: [
        "Stdin Keyboard Loop",
        "Bubbletea Elm State",
        "PlaybackSession Queue",
        "O(1) Local Opus Cache",
        "mpv / yt-dlp Audio Pipe",
      ],
      invariants: [
        "Runs at <3% CPU compared to browser-based media players",
        "Automatic O(1) local file resolution before streaming fallback",
        "Background Opus downloads and persistent local playlists/history",
      ],
      points: [
        "Designed an interactive, keyboard-driven Terminal User Interface (TUI) in Go using Bubbletea with a unified PlaybackSession queue across search, history, downloads, and playlists.",
        "Implemented concurrent search caching and background Opus audio downloads via mpv and yt-dlp, reducing CPU utilization below 3%.",
      ],
    },
    {
      id: "vaultdrive",
      systemId: "06",
      domain: "Cryptographic Storage",
      name: "Vaultdrive",
      date: "Aug 2025 – Sep 2025",
      highlightMetric: "Granular RBAC & Signed Links",
      tags: ["Vite", "TypeScript", "Bun", "Storage"],
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
      points: [
        "Built a cloud storage web application in Vite/TypeScript and Bun/TypeScript with role-based permission controls for private storage and controlled public link sharing.",
      ],
    },
    {
      id: "eventsync",
      systemId: "07",
      domain: "Real-Time Sockets",
      name: "Event Sync",
      date: "Jul 2025",
      highlightMetric: "Live Attendee Sync",
      tags: ["React Native", "GraphQL", "Prisma", "Socket.io"],
      links: [
        { label: "GitHub", url: "https://github.com/Abhiram86/event_sync" },
      ],
      points: [
        "Built a React Native (Expo) + Node.js + GraphQL + Prisma + PostgreSQL event check-in platform with Socket.io live attendee updates and JWT auth.",
      ],
    },
    {
      id: "docquer",
      systemId: "08",
      domain: "LLM & Parsers",
      name: "Docquer",
      date: "Nov 2024 – Dec 2024",
      highlightMetric: "Custom AST Markdown Renderer",
      tags: ["LLM", "Markdown", "AST Parser"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/docquer" }],
      points: [
        "Created a customizable chatbot interface supporting bring-your-own API keys with a custom Markdown renderer for nested tables and code blocks.",
      ],
    },
    {
      id: "nakama",
      systemId: "09",
      domain: "Real-Time Messaging",
      name: "Nakama",
      date: "Aug 2024 – Sep 2024",
      highlightMetric: "Zero-Drop State Sync",
      tags: ["WebSockets", "Real-time", "State Sync"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/nakama" }],
      points: [
        "Built a real-time socket-based chat application focused on reliable bidirectional message ordering and state synchronization.",
      ],
    },
    {
      id: "readit",
      systemId: "10",
      domain: "Community Platforms",
      name: "Readit",
      date: "Mar 2024 – May 2025",
      highlightMetric: "Dynamic Thread Graphs",
      tags: ["Full Stack", "Relational DB", "Media"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/readit" }],
      points: [
        "Developed a social media platform featuring nested posts, image handling, and community creation.",
      ],
    },
  ],
  achievements: [
    {
      title: "Peer-Reviewed Research (LION 20)",
      desc: "Co-authored 3 peer-reviewed papers; latest accepted at LION 20 (Springer LNCS), Milan, Italy (Jun 2026).",
      badge: "Springer LNCS",
    },
    {
      title: "Open Source Maintainer",
      desc: "109+ GitHub stars across 44 public repositories; maintainer of Errand and TransNet (tagged APK releases).",
      badge: "109+ Stars",
    },
    {
      title: "Competitive Exams",
      desc: "Qualified JEE Advanced 2023 (AIR 11,802) and JEE Main 2023 (AIR 24,545, Top 2.2% of 1.1M+ candidates).",
      badge: "Top 2.2%",
    },
    {
      title: "Algorithms & Problem Solving",
      desc: "Solved 350+ Data Structures & Algorithms problems on LeetCode.",
      badge: "350+ LeetCode",
    },
  ],
};
