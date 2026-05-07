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
    languages: ["JavaScript", "TypeScript", "Python", "C++", "SQL"],
    frontend: ["React.js", "Next.js", "React Native", "Expo", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Flask"],
    ml_data: ["PyTorch", "Data Science", "Machine Learning"]
  },
  experience: [
    {
      company: "Labmentix",
      role: "Full Stack Developer Intern",
      date: "June 2025 – August 2026",
      points: [
        "Developed multiple full-stack applications utilizing the MERN stack.",
        "Built and maintained key projects including 'Vaultdrive' and 'Signer', focusing on core functionality and responsive UI."
      ]
    },
    {
      company: "Prime Vacations",
      role: "Full Stack Developer Intern",
      date: "October 2025 – January 2026",
      points: [
        "Resolved UI inconsistencies and backend server bugs to improve platform stability.",
        "Implemented new frontend integrations to enhance overall user experience.",
        "Developed an AI-driven form auto-fill module and engineered a flight data scraping algorithm, effectively balancing operational cost with low latency."
      ]
    }
  ],
  projects: [
    {
      name: "datarover",
      date: "Jan 2026 - Present",
      tags: ["JavaScript", "Pyodide", "DuckDB"],
      links: [{ label: "GitHub", url: "https://github.com/Abhiram86/datarover" }],
      points: [
        "Engineered an in-browser data analysis tool allowing users to query and mutate datasets locally.",
        "Integrated Pyodide (Python WASM bindings) and DuckDB (WASM) for efficient, client-side data processing without relying on external sandbox environments."
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
    { title: "Publications", desc: "Published 2 Research papers in IJRSI journal during B.Tech." },
    { title: "Test Ranks", desc: "JEE Advance Rank: 11802 | JEE Mains Rank: 24545" },
    { title: "Certifications", desc: "Python, Intro To Machine Learning, Intermediate Machine Learning, React For Beginners, Fundamentals Of Accelerated Computing With CUDA Python" }
  ]
};
