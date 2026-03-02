"use client";

import { useGameStore } from "@/components/stores/useGameStore";

export default function LoadingScreen() {
  const isLoading = useGameStore((s) => s.isLoading);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at center, #2a1f14 0%, #1a120a 60%, #0d0804 100%)",
        color: "#f5e8cc",
        fontFamily: "var(--font-display), serif",
      }}
    >
      {/* Ornamental compass / loading indicator */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "3px solid #5c3a1e",
          borderTopColor: "#c8a951",
          animation: "spin 1s linear infinite",
          marginBottom: "2rem",
          boxShadow: "0 0 20px rgba(200,169,81,0.2)",
        }}
      />

      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          marginBottom: "0.5rem",
        }}
      >
        Hamster Adventure
      </h1>
      <p
        style={{
          fontSize: "0.85rem",
          fontFamily: "var(--font-body), serif",
          opacity: 0.5,
          fontWeight: 400,
        }}
      >
        Preparando tu aventura...
      </p>

      {/* Shimmer bar */}
      <div
        style={{
          marginTop: "2rem",
          width: 160,
          height: 3,
          borderRadius: 999,
          overflow: "hidden",
          background: "rgba(200,169,81,0.15)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, #c8a951 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s linear infinite",
          }}
        />
      </div>
    </div>
  );
}
