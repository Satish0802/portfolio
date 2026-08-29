export interface Project {
  slug: string;
  name: string;
  role: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    slug: "carbon-ledger",
    name: "Carbon Ledger",
    role: "Creator",
    description:
      "Personal carbon footprint tracker — multi-step calculator, dashboard with donut chart and goal tracking, using real IPCC/IEA emission factors.",
    stack: ["Next.js", "TypeScript", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/Satish0802/carbon-ledger", // replace with actual repo URL
    liveUrl: "", // add live deploy link
    highlight: "IDOR fixed · RBAC hardened",
  },
  {
    slug: "chatwave",
    name: "ChatWave",
    role: "Creator",
    description:
      "Real-time chat app — group channels, private DMs, read receipts, keyword search, media sharing.",
    stack: ["React", "Socket.IO", "MongoDB", "Cloudinary"],
    githubUrl: "https://github.com/Satish0802/chatwave", // replace with actual repo URL
    liveUrl: "",
    highlight: "Real-time · read receipts",
  },
  {
    slug: "ai-itinerary",
    name: "AI Itinerary",
    role: "Contributor",
    description:
      "AI-powered travel itinerary planner. Added natural language processing for user queries, improved recommendation algorithms, and enhanced UI for better user experience.",
    stack: ["React", "Node.js", "Python", "TensorFlow"],

    githubUrl: "https://github.com/Mr-SudAce/QRAttendance_Python_Django",
    liveUrl: "",
    highlight: "map UI, AI integration",
  },
];