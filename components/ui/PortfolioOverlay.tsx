"use client";

import { useEffect, useCallback } from "react";
import { useGameStore } from "@/components/stores/useGameStore";
import { SECTION_META } from "@/lib/constants";
import { useIsMobile } from "@/lib/useIsMobile";
import AboutContent from "./sections/AboutContent";
import ProjectsContent from "./sections/ProjectsContent";
import SkillsContent from "./sections/SkillsContent";
import ExperienceContent from "./sections/ExperienceContent";
import ContactContent from "./sections/ContactContent";
import { SectionId } from "@/lib/types";

const sectionComponents: Record<SectionId, React.ComponentType> = {
  about: AboutContent,
  projects: ProjectsContent,
  skills: SkillsContent,
  experience: ExperienceContent,
  contact: ContactContent,
};

export default function PortfolioOverlay() {
  const { activeSection, isOverlayOpen, closeOverlay } = useGameStore();
  const isMobile = useIsMobile();

  const handleClose = useCallback(() => closeOverlay(), [closeOverlay]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOverlayOpen) handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOverlayOpen, handleClose]);

  if (!isOverlayOpen || !activeSection) return null;

  const SectionContent = sectionComponents[activeSection];
  const meta = SECTION_META[activeSection];
  const icon = meta.icon;

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        zIndex: 100,
        background: "rgba(30, 20, 10, 0.45)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "fadeIn 0.2s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: isMobile ? "100%" : "540px",
          width: isMobile ? "100%" : "92%",
          maxHeight: isMobile ? "88vh" : "82vh",
          overflowY: "auto",
          borderRadius: isMobile ? "14px 14px 0 0" : "6px",
          position: "relative",
          animation: isMobile
            ? "slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
            : "unroll 0.4s cubic-bezier(0.16, 1, 0.3, 1)",

          /* Parchment background */
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(250,243,227,0.5) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(228,208,155,0.3) 0%, transparent 50%)," +
            "linear-gradient(170deg, #f5e8cc 0%, #e8d5a8 35%, #f0ddb4 65%, #e2cda0 100%)",

          /* Wooden frame */
          border: isMobile ? "2px solid var(--wood-border)" : "3px solid var(--wood-border)",
          borderBottom: isMobile ? "none" : undefined,
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.25)," +
            "inset 0 0 0 4px var(--wood-dark)," +
            "0 8px 40px rgba(40, 25, 5, 0.5)," +
            "0 2px 8px rgba(0,0,0,0.3)",
          color: "var(--ink)",
          fontFamily: "var(--font-body), Georgia, serif",
        }}
      >
        {/* Top decorative bar */}
        <div
          style={{
            height: isMobile ? 36 : 32,
            background:
              "linear-gradient(180deg, #6b4e30 0%, #8b6914 40%, #a0845c 100%)",
            borderBottom: "2px solid #5c3a1e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#f5e8cc",
            fontFamily: "var(--font-display), serif",
            letterSpacing: "0.06em",
            borderRadius: isMobile ? "12px 12px 0 0" : undefined,
          }}
        >
          <span style={{ fontSize: "12px" }}>{icon}</span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {meta.name}
          </span>
          <span style={{ fontSize: "12px" }}>{icon}</span>
        </div>

        <div style={{ padding: isMobile ? "1rem 1.25rem 1.25rem" : "1.5rem 1.75rem 1.75rem" }}>
          {/* Close button */}
          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: isMobile ? "44px" : "42px",
              right: "12px",
              background: "linear-gradient(135deg, #a0845c, #8b6914)",
              border: "2px solid #5c3a1e",
              color: "#f5e8cc",
              width: isMobile ? "32px" : "28px",
              height: isMobile ? "32px" : "28px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: isMobile ? "15px" : "13px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              transition: "transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ✕
          </button>

          <SectionContent />
        </div>

        {/* Bottom decorative bar */}
        <div
          style={{
            height: isMobile ? 28 : 24,
            background:
              "linear-gradient(0deg, #6b4e30 0%, #8b6914 50%, #a0845c 100%)",
            borderTop: "2px solid #5c3a1e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              color: "#d4bc8a",
              letterSpacing: "0.1em",
            }}
          >
            {isMobile ? "Toca fuera para cerrar" : "ESC para cerrar"}
          </span>
        </div>
      </div>
    </div>
  );
}
