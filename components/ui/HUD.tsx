"use client";

import { useEffect } from "react";
import PortfolioOverlay from "./PortfolioOverlay";
import ControlsHint from "./ControlsHint";
import LoadingScreen from "./LoadingScreen";
import AdventureNav from "./AdventureNav";
import { useGameStore } from "@/components/stores/useGameStore";

export default function HUD() {
  // Listen for E key → open overlay when near a house
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "e" || e.key === "E") {
        const { nearSection, isOverlayOpen, openOverlay } =
          useGameStore.getState();
        if (nearSection && !isOverlayOpen) {
          openOverlay(nearSection);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <LoadingScreen />
      <AdventureNav />
      <ControlsHint />
      <PortfolioOverlay />
    </>
  );
}
