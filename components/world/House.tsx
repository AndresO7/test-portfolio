"use client";

import { useMemo } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Html, useGLTF } from "@react-three/drei";
import { useGameStore } from "@/components/stores/useGameStore";
import { SECTION_META } from "@/lib/constants";
import { SectionId } from "@/lib/types";
import * as THREE from "three";

const MODEL_PATH = "/house/base_basic_shaded.glb";
const MODEL_SCALE = 2.0;

const HALF_W = 1.55;
const HALF_H = 1.85;
const HALF_D = 1.92;

interface HouseProps {
  sectionId: SectionId;
  label: string;
}

export default function House({ sectionId, label }: HouseProps) {
  const setNearSection = useGameStore((s) => s.setNearSection);
  const nearSection = useGameStore((s) => s.nearSection);
  const isOverlayOpen = useGameStore((s) => s.isOverlayOpen);
  const showTooltip = nearSection === sectionId && !isOverlayOpen;
  const meta = SECTION_META[sectionId];

  const { scene } = useGLTF(MODEL_PATH);

  const clonedScene = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);

  return (
    <group>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[HALF_W, HALF_H, HALF_D]} position={[0, HALF_H, 0]} />
        <primitive object={clonedScene} scale={MODEL_SCALE} />
      </RigidBody>

      {/* ── Wooden sign label ── */}
      <Html
        position={[0, HALF_H * 2 + 1.6, 0]}
        center
        distanceFactor={18}
        sprite
      >
        <div
          style={{
            position: "relative",
            background:
              "repeating-linear-gradient(93deg, transparent, transparent 5px, rgba(0,0,0,0.035) 5px, rgba(0,0,0,0.035) 6px)," +
              "linear-gradient(180deg, #c4a265 0%, #a8884a 30%, #9a7a42 60%, #8b6c3c 100%)",
            border: "2.5px solid #5c3a1e",
            borderRadius: "3px",
            padding: "7px 20px 8px",
            boxShadow:
              "inset 0 2px 0 rgba(255,255,255,0.15)," +
              "inset 0 -2px 0 rgba(0,0,0,0.12)," +
              "0 5px 16px rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {/* Nail head left */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: 10,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #a09080, #605040)",
              border: "1px solid #4a3520",
              boxShadow: "0 1px 2px rgba(0,0,0,0.35)",
            }}
          />
          {/* Nail head right */}
          <div
            style={{
              position: "absolute",
              top: -4,
              right: 10,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #a09080, #605040)",
              border: "1px solid #4a3520",
              boxShadow: "0 1px 2px rgba(0,0,0,0.35)",
            }}
          />

          <span
            style={{
              fontSize: "16px",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
            }}
          >
            {meta.icon}
          </span>
          <span
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "#faf3e3",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
              letterSpacing: "0.05em",
            }}
          >
            {label}
          </span>
        </div>
      </Html>

      {/* ── 3D tooltip when near ── */}
      {showTooltip && (
        <Html position={[0, HALF_H * 2 + 0.2, 2.5]} center distanceFactor={18}>
          <div
            style={{
              background:
                "linear-gradient(180deg, #f5e6c8 0%, #e8d4a8 100%)",
              border: "2px solid #a0845c",
              borderRadius: "10px",
              padding: "8px 16px",
              color: "#4a3520",
              fontFamily: "var(--font-display), serif",
              fontSize: "13px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              boxShadow:
                "0 4px 16px rgba(80, 50, 10, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
              textAlign: "center",
              pointerEvents: "none",
              animation: "float 2s ease-in-out infinite",
              lineHeight: 1.4,
            }}
          >
            Presiona{" "}
            <span
              style={{
                display: "inline-block",
                background: "#4a3520",
                color: "#f5e6c8",
                padding: "1px 7px",
                borderRadius: "4px",
                fontWeight: 700,
                fontSize: "12px",
                margin: "0 2px",
              }}
            >
              E
            </span>{" "}
            para explorar
            <div
              style={{
                position: "absolute",
                bottom: -7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: "7px solid #a0845c",
              }}
            />
          </div>
        </Html>
      )}

      {/* ── Sensor collider ── */}
      <RigidBody type="fixed" colliders={false} sensor>
        <CuboidCollider
          args={[2.8, 2, 2.8]}
          position={[0, 1, 3.2]}
          sensor
          onIntersectionEnter={() => setNearSection(sectionId)}
          onIntersectionExit={() => {
            if (useGameStore.getState().nearSection === sectionId) {
              setNearSection(null);
            }
          }}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
