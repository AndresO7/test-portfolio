"use client";

import { useRef, useCallback } from "react";
import { useGameStore } from "@/components/stores/useGameStore";

const SIZE = 130;
const KNOB = 50;
const MAX_DIST = (SIZE - KNOB) / 2;

export default function VirtualJoystick() {
  const baseRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const setTouchInput = useGameStore((s) => s.setTouchInput);
  const setHasMovedOnce = useGameStore((s) => s.setHasMovedOnce);

  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (!baseRef.current) return;
      const rect = baseRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const touch = e.touches[0];
      let dx = touch.clientX - cx;
      let dy = touch.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > MAX_DIST) {
        dx = (dx / dist) * MAX_DIST;
        dy = (dy / dist) * MAX_DIST;
      }
      if (knobRef.current) {
        knobRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
      const nx = dx / MAX_DIST;
      const ny = dy / MAX_DIST;
      if (Math.abs(nx) > 0.15 || Math.abs(ny) > 0.15) {
        setHasMovedOnce();
      }
      setTouchInput([nx, ny]);
    },
    [setTouchInput, setHasMovedOnce],
  );

  const handleEnd = useCallback(() => {
    if (knobRef.current) {
      knobRef.current.style.transform = "translate(0px, 0px)";
    }
    setTouchInput([0, 0]);
  }, [setTouchInput]);

  return (
    <div
      ref={baseRef}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      style={{
        position: "fixed",
        bottom: 28,
        left: 24,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(92, 58, 30, 0.15) 0%, rgba(92, 58, 30, 0.3) 100%)",
        border: "2.5px solid rgba(160, 132, 92, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        touchAction: "none",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.1)",
      }}
    >
      <div
        ref={knobRef}
        style={{
          width: KNOB,
          height: KNOB,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 38% 35%, rgba(200, 169, 81, 0.5), rgba(160, 132, 92, 0.6))",
          border: "2px solid rgba(200, 169, 81, 0.5)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          transition: "transform 0.05s ease-out",
        }}
      />
    </div>
  );
}
