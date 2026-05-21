export interface Candidate {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  stats: {
    trait: string;
    value: number;
  }[];
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Alex Mercer",
    title: "Full Stack Engineer",
    avatar: "https://i.pravatar.cc/150?u=1",
    bio: "Highly adaptable problem-solver with top-tier spatial reasoning.",
    stats: [
      { trait: "Logic", value: 90 },
      { trait: "Adaptability", value: 85 },
      { trait: "EQ", value: 70 },
      { trait: "Spatial", value: 88 },
      { trait: "Risk", value: 60 },
    ],
  },
  {
    id: "2",
    name: "Jordan Lee",
    title: "UX Designer",
    avatar: "https://i.pravatar.cc/150?u=2",
    bio: "Empathetic designer with exceptional emotional intelligence.",
    stats: [
      { trait: "Logic", value: 75 },
      { trait: "Adaptability", value: 80 },
      { trait: "EQ", value: 95 },
      { trait: "Spatial", value: 82 },
      { trait: "Risk", value: 55 },
    ],
  },
  {
    id: "3",
    name: "Sam Rivera",
    title: "Data Scientist",
    avatar: "https://i.pravatar.cc/150?u=3",
    bio: "Analytical thinker with elite logic and pattern recognition.",
    stats: [
      { trait: "Logic", value: 98 },
      { trait: "Adaptability", value: 70 },
      { trait: "EQ", value: 65 },
      { trait: "Spatial", value: 85 },
      { trait: "Risk", value: 50 },
    ],
  },
  {
    id: "4",
    name: "Taylor Kim",
    title: "Product Manager",
    avatar: "https://i.pravatar.cc/150?u=4",
    bio: "Balanced cognitive profile with strong strategic thinking.",
    stats: [
      { trait: "Logic", value: 80 },
      { trait: "Adaptability", value: 88 },
      { trait: "EQ", value: 85 },
      { trait: "Spatial", value: 75 },
      { trait: "Risk", value: 70 },
    ],
  },
  {
    id: "5",
    name: "Morgan Chen",
    title: "Security Analyst",
    avatar: "https://i.pravatar.cc/150?u=5",
    bio: "Risk-aware specialist with exceptional attention to detail.",
    stats: [
      { trait: "Logic", value: 92 },
      { trait: "Adaptability", value: 65 },
      { trait: "EQ", value: 60 },
      { trait: "Spatial", value: 80 },
      { trait: "Risk", value: 95 },
    ],
  },
  {
    id: "6",
    name: "Casey Park",
    title: "Creative Director",
    avatar: "https://i.pravatar.cc/150?u=6",
    bio: "Visionary creative with outstanding spatial reasoning.",
    stats: [
      { trait: "Logic", value: 70 },
      { trait: "Adaptability", value: 90 },
      { trait: "EQ", value: 88 },
      { trait: "Spatial", value: 95 },
      { trait: "Risk", value: 75 },
    ],
  },
  {
    id: "7",
    name: "Avery Singh",
    title: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/150?u=7",
    bio: "Highly adaptable with strong problem-solving skills.",
    stats: [
      { trait: "Logic", value: 88 },
      { trait: "Adaptability", value: 92 },
      { trait: "EQ", value: 68 },
      { trait: "Spatial", value: 78 },
      { trait: "Risk", value: 65 },
    ],
  },
  {
    id: "8",
    name: "Riley Torres",
    title: "Business Analyst",
    avatar: "https://i.pravatar.cc/150?u=8",
    bio: "Strategic thinker with balanced cognitive strengths.",
    stats: [
      { trait: "Logic", value: 85 },
      { trait: "Adaptability", value: 78 },
      { trait: "EQ", value: 80 },
      { trait: "Spatial", value: 72 },
      { trait: "Risk", value: 68 },
    ],
  },
  {
    id: "9",
    name: "Quinn Davis",
    title: "Startup Founder",
    avatar: "https://i.pravatar.cc/150?u=9",
    bio: "Risk-taker with exceptional adaptability and vision.",
    stats: [
      { trait: "Logic", value: 82 },
      { trait: "Adaptability", value: 95 },
      { trait: "EQ", value: 85 },
      { trait: "Spatial", value: 80 },
      { trait: "Risk", value: 90 },
    ],
  },
  {
    id: "10",
    name: "Skylar Walsh",
    title: "AI Researcher",
    avatar: "https://i.pravatar.cc/150?u=10",
    bio: "Logical genius with strong spatial and analytical abilities.",
    stats: [
      { trait: "Logic", value: 96 },
      { trait: "Adaptability", value: 75 },
      { trait: "EQ", value: 62 },
      { trait: "Spatial", value: 90 },
      { trait: "Risk", value: 58 },
    ],
  },
];