"use client";

import { useState } from "react";
import { useGameStore } from "@/components/stores/useGameStore";
import { SECTION_META } from "@/lib/constants";
import { SectionId } from "@/lib/types";
import { useIsMobile } from "@/lib/useIsMobile";

const sections: { id: SectionId; icon: string; name: string }[] = [
  { id: "about", icon: SECTION_META.about.icon, name: SECTION_META.about.name },
  { id: "projects", icon: SECTION_META.projects.icon, name: SECTION_META.projects.name },
  { id: "skills", icon: SECTION_META.skills.icon, name: SECTION_META.skills.name },
  { id: "experience", icon: SECTION_META.experience.icon, name: SECTION_META.experience.name },
  { id: "contact", icon: SECTION_META.contact.icon, name: SECTION_META.contact.name },
];

export default function AdventureNav() {
  const nearSection = useGameStore((s) => s.nearSection);
  const isOverlayOpen = useGameStore((s) => s.isOverlayOpen);
  const isLoading = useGameStore((s) => s.isLoading);
  const openOverlay = useGameStore((s) => s.openOverlay);
  const isMobile = useIsMobile();

  if (isLoading || isOverlayOpen) return null;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        zIndex: 40,
        pointerEvents: "none",
        padding: isMobile ? "8px 10px 0" : "14px 20px 0",
      }}
    >
      {/* ── Logo / left side ── */}
      <div
        style={{
          pointerEvents: "auto",
          animation: "slideDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(180deg, #6b4e30 0%, #8b6914 45%, #7a5d2e 100%)",
            padding: isMobile ? "5px 12px 4px" : "8px 22px 7px",
            borderRadius: "6px",
            border: "2px solid #5c3a1e",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "6px" : "10px",
            boxShadow:
              "0 4px 16px rgba(40, 25, 5, 0.4)," +
              "inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <span style={{ fontSize: isMobile ? "14px" : "18px" }}>
            &#x1F439;
          </span>
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <span
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#f5e8cc",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  lineHeight: 1,
                }}
              >
                Hamster Adventure
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "8px",
                  fontWeight: 700,
                  color: "#c8a951",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Portfolio
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Section links / right side ── */}
      <div
        style={{
          pointerEvents: "auto",
          animation: "slideDown 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both",
        }}
      >
        <div
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(0,0,0,0.02) 6px, rgba(0,0,0,0.02) 7px)," +
              "linear-gradient(180deg, #f5e8cc 0%, #e8d5a8 40%, #dcc89a 100%)",
            border: "2px solid #8b6914",
            borderRadius: "6px",
            padding: isMobile ? "4px 6px" : "6px 10px",
            display: "flex",
            gap: isMobile ? "0px" : "2px",
            alignItems: "center",
            boxShadow:
              "0 4px 16px rgba(40, 25, 5, 0.35)," +
              "inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {sections.map((s, i) => (
            <NavItem
              key={s.id}
              section={s}
              isNear={nearSection === s.id}
              onClick={() => openOverlay(s.id)}
              isLast={i === sections.length - 1}
              compact={isMobile}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ────────────────── Nav Item ────────────────── */

function NavItem({
  section,
  isNear,
  onClick,
  isLast,
  compact,
}: {
  section: { id: SectionId; icon: string; name: string };
  isNear: boolean;
  onClick: () => void;
  isLast: boolean;
  compact: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const active = isNear;
  const scale = pressed ? 0.95 : hovered ? 1.04 : 1;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: compact ? "0px" : "6px",
          background: active
            ? "rgba(200, 169, 81, 0.22)"
            : hovered
              ? "rgba(160, 132, 92, 0.12)"
              : "transparent",
          border: "none",
          cursor: "pointer",
          padding: compact ? "5px 7px" : "6px 12px",
          borderRadius: "5px",
          transition: "all 0.2s ease-out",
          transform: `scale(${scale})`,
          boxShadow: active ? "0 0 10px rgba(200, 169, 81, 0.25)" : "none",
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: compact ? 24 : 28,
            height: compact ? 24 : 28,
            borderRadius: "50%",
            background: active
              ? "radial-gradient(circle at 38% 35%, #dbbe6f, #c8a951 50%, #a08050)"
              : hovered
                ? "radial-gradient(circle at 38% 35%, #c4ad7a, #b8976a 50%, #917750)"
                : "radial-gradient(circle at 38% 35%, #b8976a, #a08660 50%, #8b7355)",
            border: active ? "2px solid #c8a951" : "2px solid #7a5d2e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: compact ? "11px" : "13px",
            boxShadow: active
              ? "0 0 10px rgba(200, 169, 81, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)"
              : "inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 3px rgba(0,0,0,0.25)",
            transition: "all 0.25s ease-out",
            flexShrink: 0,
          }}
        >
          <span style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.2))" }}>
            {section.icon}
          </span>
        </div>

        {/* Label — hidden on mobile */}
        {!compact && (
          <span
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "10.5px",
              fontWeight: 700,
              color: active ? "#4a3520" : hovered ? "#5c3a1e" : "#7a6545",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {section.name}
          </span>
        )}
      </button>

      {/* Separator dot */}
      {!isLast && !compact && (
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#b8976a",
            opacity: 0.5,
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
}
