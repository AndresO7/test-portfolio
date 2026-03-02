"use client";

import { useGameStore } from "@/components/stores/useGameStore";
import { useIsMobile } from "@/lib/useIsMobile";

export default function ControlsHint() {
  const hasMovedOnce = useGameStore((s) => s.hasMovedOnce);
  const isMobile = useIsMobile();

  if (hasMovedOnce) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? "10rem" : "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        textAlign: "center",
        color: "var(--ink)",
        pointerEvents: "none",
        animation: "fadeIn 0.8s ease-out, float 3s ease-in-out 0.8s infinite",
        fontFamily: "var(--font-body), serif",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(180deg, #f5e8cc 0%, #e8d5a8 100%)",
          border: "2px solid var(--wood-border)",
          borderRadius: "12px",
          padding: isMobile ? "0.8rem 1.2rem" : "1rem 1.5rem",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.3), 0 6px 24px rgba(60,40,10,0.35)",
        }}
      >
        {isMobile ? (
          <p
            style={{
              fontSize: "0.82rem",
              fontWeight: 500,
              opacity: 0.8,
            }}
          >
            Usa el joystick para moverte
          </p>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 40px)",
                gridTemplateRows: "repeat(2, 40px)",
                gap: "4px",
                justifyContent: "center",
                marginBottom: "0.6rem",
              }}
            >
              <div />
              <Key label="W" />
              <div />
              <Key label="A" />
              <Key label="S" />
              <Key label="D" />
            </div>
            <p
              style={{
                fontSize: "0.78rem",
                opacity: 0.7,
                fontWeight: 500,
              }}
            >
              Mueve al hamster para explorar
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Key({ label }: { label: string }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        background:
          "linear-gradient(180deg, #d4bc8a 0%, #c0a876 100%)",
        border: "2px solid #8b6914",
        fontSize: "0.8rem",
        fontWeight: 700,
        color: "var(--wood-dark)",
        fontFamily: "var(--font-display), serif",
        boxShadow:
          "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
      }}
    >
      {label}
    </div>
  );
}
