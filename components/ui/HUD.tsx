"use client";

import { useEffect } from "react";
import PortfolioOverlay from "./PortfolioOverlay";
import ControlsHint from "./ControlsHint";
import LoadingScreen from "./LoadingScreen";
import AdventureNav from "./AdventureNav";
import VirtualJoystick from "./VirtualJoystick";
import { useGameStore } from "@/components/stores/useGameStore";
import { useIsMobile } from "@/lib/useIsMobile";

export default function HUD() {
  const isMobile = useIsMobile();

  // Listen for E key → open overlay when near a house (desktop only)
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
      {isMobile && <VirtualJoystick />}
    </>
  );
}
