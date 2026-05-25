export const PORTFOLIO_DATA = {
  name: "Abhiram Alla",
  title: "Software Engineer",
  photo: "/profile.jpg",
  location: "Raipur, India",
  phone: "8897428738",
  email: "abhiramalla86@gmail.com",
  github: "https://github.com/Abhiram86",
  linkedin: "https://www.linkedin.com/in/alla-abhiram-0684512ab/",
  education: [
    {
      institution: "International Institute of Information Technology (IIIT), Naya Raipur",
      degree: "B.Tech in Computer Science and Engineering",
      date: "Expected 2027",
      score: "CGPA: 7.9"
    },
    {
      institution: "Telangana",
      degree: "Class XII (CBSE)",
      date: "2023",
      score: "94.9%"
    },
    {
      institution: "Class X (CBSE)",
      degree: "",
      date: "2021",
      score: "96%"
    }
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "C++", "SQL", "Go"],
    frontend: ["React.js", "Next.js", "React Native", "Tailwind CSS", "WebAssembly (WASM)", "TUI Frameworks"],
    backend: ["Node.js", "Express", "Flask", "Systems Programming", "Concurrency", "API Design"],
    ml_data: ["Data Structures", "High-Performance Computing (HPC)", "Data Science", "Machine Learning"]
  },
  experience: [
    {
      company: "Labmentix",
      role: "Full Stack Developer Intern",
      date: "June 2025 – Present",
      points: [
        "Developed scalable multi-tenant web applications in React and Node.js, implementing custom state management and reducing API load times by 22%.",
        "Architected secure storage pipelines and cryptographic signing systems for 'Vaultdrive' and 'Signer', establishing modular, role-based access schemas."
      ]
    },
    {
      company: "Prime Vacations",
      role: "Full Stack Developer Intern",
      date: "October 2025 – January 2026",
      points: [
        "Refactored legacy UI elements and server processing routes, eliminating rendering latency and eliminating critical runtime server bugs under concurrency tests.",
        "Engineered a highly concurrent python-based web scraping platform utilizing automated proxy-rotation engines, ensuring low server resource consumption and sub-second execution latency."
      ]
    }
  ],
  projects: [
    {
      name: "EchoTune",
      date: "May 2026",
      tags: ["Go", "CLI", "TUI"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/echotune" }],
      points: [
        "Designed an interactive, lightweight keyboard-driven Terminal User Interface (TUI) in Go using the Bubbletea framework, implementing concurrent search requests, reducing CPU usage to <3% compared to browser-based utilities."
      ]
    },
    {
      name: "In-Browser WebAssembly Query Engine",
      date: "Jan 2026 - Present",
      tags: ["JavaScript", "Pyodide", "DuckDB"],
      links: [
        { label: "Live", url: "https://datarover.vercel.app/" },
        { label: "GitHub", url: "https://github.com/Abhiram86/datarover" }
      ],
      points: [
        "Engineered an in-browser database execution engine utilizing Pyodide (WASM) and DuckDB, allowing client-side local queries directly on JSON/CSV datasets, removing server compute overhead entirely."
      ]
    },
    {
      name: "Vaultdrive",
      date: "Aug 2025 - Sep 2025",
      tags: ["React", "Node.js"],
      links: [
        { label: "Client", url: "https://github.com/Abhiram86/vaultdrive_client" },
        { label: "Server", url: "https://github.com/Abhiram86/vaultdrive_server" }
      ],
      points: [
        "Built a cloud storage web application enabling users to store and manage files.",
        "Implemented permission controls to support both private file storage and public link sharing."
      ]
    },
    {
      name: "event sync",
      date: "Jul 2025",
      tags: ["React Native", "WebSockets"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/event_sync" }],
      points: [
        "Developed a React Native application for event registration.",
        "Leveraged WebSockets to display live registration updates to users as they join or leave events."
      ]
    },
    {
      name: "Docquer",
      date: "Nov 2024 - Dec 2024",
      tags: ["Chatbot", "Markdown"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/docquer" }],
      points: [
        "Created a customizable chatbot interface supporting bring-your-own API keys.",
        "Implemented a custom Markdown renderer to correctly display complex outputs like tables and code blocks in chat responses."
      ]
    },
    {
      name: "Nakama",
      date: "Aug 2024 - Sep 2024",
      tags: ["Sockets", "Real-time"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/nakama" }],
      points: [
        "Built a real-time socket-based chatting application.",
        "Focused on state synchronization to ensure reliable, error-free bidirectional message delivery between clients."
      ]
    },
    {
      name: "Readit",
      date: "Mar 2024 - May 2025",
      tags: ["Social Media", "Full Stack"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/readit" }],
      points: [
        "Developed a social media platform featuring posts, image handling, and community creation."
      ]
    }
  ],
  achievements: [
    { title: "Publications", desc: "Published 2 peer-reviewed Research papers in IJRSI journal, demonstrating rigorous architectural analysis, technical writing, and problem validation." },
    { title: "Test Ranks", desc: "JEE Advance Rank: 11802 | JEE Mains Rank: 24545" },
    { title: "Expertise", desc: "Parallel Computing, High-Performance Computing (HPC), Engine Optimization, and Computational Infrastructure." }
  ]
};
