"use client";

import { create } from "zustand";
import { GameState, SectionId } from "@/lib/types";
import { SPAWN_POSITION } from "@/lib/constants";

export const useGameStore = create<GameState>((set) => ({
  activeSection: null,
  nearSection: null,
  isOverlayOpen: false,
  hasMovedOnce: false,
  isLoading: true,
  playerPosition: SPAWN_POSITION,

  setActiveSection: (section: SectionId | null) =>
    set({ activeSection: section }),

  setNearSection: (section: SectionId | null) =>
    set({ nearSection: section }),

  openOverlay: (section: SectionId) =>
    set({ activeSection: section, isOverlayOpen: true }),

  closeOverlay: () =>
    set({ activeSection: null, isOverlayOpen: false }),

  setHasMovedOnce: () => set({ hasMovedOnce: true }),

  setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  setPlayerPosition: (pos) => set({ playerPosition: pos }),
}));
