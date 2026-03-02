import { Vector3Tuple } from "three";

export interface IslandConfig {
  id: string;
  name: string;
  position: Vector3Tuple;
  radius: number;
  color: string;
  rockColor: string;
  houseColor: string;
  roofColor: string;
}

export interface BridgeConfig {
  from: string;
  to: string;
}

export type SectionId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact";

export interface GameState {
  activeSection: SectionId | null;
  nearSection: SectionId | null;
  isOverlayOpen: boolean;
  hasMovedOnce: boolean;
  isLoading: boolean;
  playerPosition: Vector3Tuple;
  touchInput: [number, number];
  setActiveSection: (section: SectionId | null) => void;
  setNearSection: (section: SectionId | null) => void;
  openOverlay: (section: SectionId) => void;
  closeOverlay: () => void;
  setHasMovedOnce: () => void;
  setIsLoading: (loading: boolean) => void;
  setPlayerPosition: (pos: Vector3Tuple) => void;
  setTouchInput: (input: [number, number]) => void;
}
