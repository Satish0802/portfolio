import { publicAssetPath } from "./site";

export interface Project {
  slug: string;
  name: string;
  role: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  highlight?: string;
  snippet?: { label: string; code: string };
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "carbon-ledger",
    name: "Carbon Ledger",
    role: "Creator",
    description:
      "Personal carbon footprint tracker — multi-step calculator, dashboard with donut chart and goal tracking, using real IPCC/IEA emission factors.",
    fullDescription:
      "Carbon Ledger is a personal carbon-emission tracker built to make climate impact tangible. Users sign up (email/password or Google), log activities across categories like transport, energy, and diet, and see their footprint calculated against real IPCC AR6 emission factors rather than rough estimates. A dashboard visualizes trends over time and against personal reduction goals.",
    features: [
      "Multi-step logging flow with category-specific inputs",
      "Dashboard with donut chart breakdown and goal tracking",
      "Email/password + Google OAuth authentication",
      "Security audit caught and fixed an IDOR vulnerability; added RBAC",
    ],
    stack: ["Next.js", "TypeScript", "Express", "MongoDB", "JWT"],
    githubUrl: "https://github.com/Satish0802/carbon-ledger", // confirm exact repo name
    liveUrl: "https://carbon-ledger-phi.vercel.app",
    highlight: "IDOR fixed · RBAC hardened",
    images: [
      publicAssetPath("/projects/carbon-ledger/dashboard.png"),
      publicAssetPath("/projects/carbon-ledger/history.png"),
      publicAssetPath("/projects/carbon-ledger/goals.png"),
      publicAssetPath("/projects/carbon-ledger/calculator.png"),
    ],
    snippet: {
      label: "Emission calculation (server)",
      code: `function calculateEmissions(activity: Activity) {
  const factor = IPCC_FACTORS[activity.category][activity.type];
  return activity.quantity * factor.co2ePerUnit;
}`,
    },
  },
  {
    slug: "chatwave",
    name: "ChatWave",
    role: "Creator",
    description:
      "Real-time chat app — group channels, private DMs, read receipts, keyword search, media sharing.",
    fullDescription:
      "ChatWave is a real-time messaging app supporting group channels and private DMs, built to explore Socket.IO at a production-shaped scale — presence, read receipts, and media messages all need to stay in sync across connected clients without polling.",
    features: [
      "Group channels and private DMs over Socket.IO",
      "Read receipts and live typing indicators",
      "Media sharing via Cloudinary uploads",
      "Keyword search across message history",
    ],
    stack: ["React", "Socket.IO", "MongoDB", "Cloudinary"],
    githubUrl: "https://github.com/Satish0802/chatwave", // replace with actual repo URL
    liveUrl: "",
    highlight: "Real-time · read receipts",
    images: [],
    snippet: {
      label: "Read receipt broadcast (server)",
      code: `socket.on("message:read", ({ messageId, roomId }) => {
  io.to(roomId).emit("message:read:ack", { messageId, userId: socket.userId });
});`,
    },
  },
  {
    slug: "ai-itinerary",
    name: "AI Itinerary",
    role: "Contributor",
    description:
      "Group project built during the MERN Stack class training, made with our instructor — an AI-powered trip itinerary planner.",
    fullDescription:
      "AI Itinerary is a group project from Broadway Infosys' MERN Stack class, built together with our instructor. It generates trip itineraries and includes user accounts and profile management.",
    features: [
      "Built as a team, guided by our instructor",
      "Client/server MERN architecture",
      "User login, registration, and profile avatar upload",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/kaylinkhanal10/ai-itinerary",
    liveUrl: "",
    highlight: "MERN class project",
    images: [],
  },
];