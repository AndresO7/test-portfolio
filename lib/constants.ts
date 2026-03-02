import { IslandConfig, BridgeConfig, SectionId } from "./types";

const PENTAGON_RADIUS = 25;

function pentagonPoint(index: number): [number, number, number] {
  const angle = (index * 2 * Math.PI) / 5 - Math.PI / 2;
  return [
    Math.cos(angle) * PENTAGON_RADIUS,
    0,
    Math.sin(angle) * PENTAGON_RADIUS,
  ];
}

export const ISLANDS: IslandConfig[] = [
  {
    id: "about",
    name: "Sobre M\u00ed",
    position: pentagonPoint(0),
    radius: 9,
    color: "#4ade80",
    rockColor: "#78716c",
    houseColor: "#fef3c7",
    roofColor: "#dc2626",
  },
  {
    id: "projects",
    name: "Proyectos",
    position: pentagonPoint(1),
    radius: 8,
    color: "#60a5fa",
    rockColor: "#6b7280",
    houseColor: "#dbeafe",
    roofColor: "#2563eb",
  },
  {
    id: "skills",
    name: "Habilidades",
    position: pentagonPoint(2),
    radius: 7.5,
    color: "#fbbf24",
    rockColor: "#92400e",
    houseColor: "#fef9c3",
    roofColor: "#d97706",
  },
  {
    id: "experience",
    name: "Experiencia",
    position: pentagonPoint(3),
    radius: 7.5,
    color: "#c084fc",
    rockColor: "#6b21a8",
    houseColor: "#f3e8ff",
    roofColor: "#7c3aed",
  },
  {
    id: "contact",
    name: "Contacto",
    position: pentagonPoint(4),
    radius: 8,
    color: "#fb923c",
    rockColor: "#9a3412",
    houseColor: "#fff7ed",
    roofColor: "#ea580c",
  },
];

export const BRIDGES: BridgeConfig[] = [
  { from: "about", to: "projects" },
  { from: "projects", to: "skills" },
  { from: "skills", to: "experience" },
  { from: "experience", to: "contact" },
  { from: "contact", to: "about" },
];

export const SPAWN_POSITION: [number, number, number] = [
  ISLANDS[0].position[0],
  3,
  ISLANDS[0].position[2] + 5,
];

export const SECTION_META: Record<SectionId, { name: string; icon: string }> = {
  about: { name: "Sobre M\u00ed", icon: "\u{1F4DC}" },
  projects: { name: "Proyectos", icon: "\u2694\uFE0F" },
  skills: { name: "Habilidades", icon: "\u{1F52E}" },
  experience: { name: "Experiencia", icon: "\u{1F3F0}" },
  contact: { name: "Contacto", icon: "\u{1F54A}\uFE0F" },
};

export const FALL_THRESHOLD = -50;
export const MOVE_SPEED = 6;
export const CAMERA_OFFSET: [number, number, number] = [0, 8, 12];
export const CAMERA_LERP = 0.05;
