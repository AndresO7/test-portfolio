"use client";

import { useMemo } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const WALL_SEGMENTS = 20;
const BRIDGE_GAP = 0.4; // radians (~23°) gap in walls for bridge openings

interface FloatingIslandProps {
  position: [number, number, number];
  radius: number;
  color: string;
  rockColor: string;
  bridgeAngles?: number[];
  children?: React.ReactNode;
}

export default function FloatingIsland({
  position,
  radius,
  color,
  rockColor,
  bridgeAngles = [],
  children,
}: FloatingIslandProps) {
  const darkerGrass = useMemo(
    () => "#" + new THREE.Color(color).multiplyScalar(0.7).getHexString(),
    [color],
  );
  const dirtColor = useMemo(
    () =>
      "#" +
      new THREE.Color(rockColor)
        .lerp(new THREE.Color("#8B6914"), 0.4)
        .getHexString(),
    [rockColor],
  );
  const darkRock = useMemo(
    () => "#" + new THREE.Color(rockColor).multiplyScalar(0.65).getHexString(),
    [rockColor],
  );

  const wallSegHalf = radius * Math.sin(Math.PI / WALL_SEGMENTS);

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        {/* Floor collider */}
        <CuboidCollider args={[radius, 0.5, radius]} position={[0, 0, 0]} />

        {/* ── Invisible edge wall colliders (with gaps for bridges) ── */}
        {Array.from({ length: WALL_SEGMENTS }).map((_, i) => {
          const angle = (i / WALL_SEGMENTS) * Math.PI * 2;
          const nearBridge = bridgeAngles.some((ba) => {
            let diff = Math.abs(angle - ba);
            if (diff > Math.PI) diff = 2 * Math.PI - diff;
            return diff < BRIDGE_GAP;
          });
          if (nearBridge) return null;
          return (
            <CuboidCollider
              key={`wall-${i}`}
              args={[wallSegHalf, 1.2, 0.12]}
              position={[
                Math.cos(angle) * radius * 0.92,
                1.2,
                Math.sin(angle) * radius * 0.92,
              ]}
              rotation={[0, Math.PI / 2 - angle, 0]}
            />
          );
        })}

        {/* ══════════ TOP SURFACE (kept as-is) ══════════ */}

        {/* Grass top layer */}
        <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[radius, radius * 0.98, 0.7, 32]} />
          <meshStandardMaterial color={color} roughness={0.85} flatShading />
        </mesh>

        {/* Grass edge lip */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[radius * 0.99, radius * 0.95, 0.2, 32]} />
          <meshStandardMaterial color={darkerGrass} roughness={0.9} />
        </mesh>

        {/* Dirt middle layer */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[radius * 0.95, radius * 0.75, 1.4, 24]} />
          <meshStandardMaterial color={dirtColor} roughness={0.95} flatShading />
        </mesh>

        {/* ══════════ ROCKY BOTTOM (organic rock formation) ══════════ */}

        {/* Upper rock mass — octagonal, wide taper */}
        <mesh position={[0, -2.8, 0]}>
          <cylinderGeometry args={[radius * 0.72, radius * 0.45, 2.6, 8]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>

        {/* Mid rock body — hexagonal, offset for asymmetry */}
        <mesh
          position={[radius * 0.05, -4.8, -radius * 0.04]}
          rotation={[0.06, 0.5, -0.04]}
        >
          <cylinderGeometry args={[radius * 0.42, radius * 0.18, 2.8, 6]} />
          <meshStandardMaterial color={darkRock} roughness={1} flatShading />
        </mesh>

        {/* Bottom rock tip — pentagonal, narrow */}
        <mesh
          position={[-radius * 0.04, -6.5, radius * 0.06]}
          rotation={[0.08, 1.2, 0.06]}
        >
          <cylinderGeometry args={[radius * 0.16, radius * 0.04, 1.8, 5]} />
          <meshStandardMaterial color={darkRock} roughness={1} flatShading />
        </mesh>

        {/* ── Protruding rock chunks (break silhouette) ── */}
        <mesh
          position={[radius * 0.5, -2.2, radius * 0.35]}
          rotation={[0.3, 0.8, 0.2]}
        >
          <dodecahedronGeometry args={[radius * 0.16, 0]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>
        <mesh
          position={[-radius * 0.52, -3.2, -radius * 0.3]}
          rotation={[-0.2, 1.4, -0.15]}
        >
          <dodecahedronGeometry args={[radius * 0.14, 1]} />
          <meshStandardMaterial color={darkRock} roughness={1} flatShading />
        </mesh>
        <mesh
          position={[radius * 0.15, -4.2, radius * 0.48]}
          rotation={[0.4, 0.3, 0.25]}
        >
          <dodecahedronGeometry args={[radius * 0.12, 0]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>
        <mesh
          position={[-radius * 0.38, -5, radius * 0.2]}
          rotation={[0.15, 2.1, -0.1]}
        >
          <dodecahedronGeometry args={[radius * 0.1, 1]} />
          <meshStandardMaterial color={darkRock} roughness={1} flatShading />
        </mesh>

        {/* ── Rock ledges / shelves ── */}
        <mesh
          position={[radius * 0.52, -2, 0]}
          rotation={[0.1, 0.4, 0.3]}
        >
          <boxGeometry args={[radius * 0.28, 0.3, radius * 0.22]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>
        <mesh
          position={[-radius * 0.3, -3.6, radius * 0.42]}
          rotation={[-0.15, 1.0, -0.2]}
        >
          <boxGeometry args={[radius * 0.22, 0.25, radius * 0.18]} />
          <meshStandardMaterial color={darkRock} roughness={1} flatShading />
        </mesh>

        {/* ── Stalactites (hanging rock spires) ── */}
        <mesh
          position={[radius * 0.25, -6.4, radius * 0.15]}
          rotation={[0.12, 0.5, 0.08]}
        >
          <coneGeometry args={[0.35, 2.5, 5]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>
        <mesh
          position={[-radius * 0.3, -5.8, -radius * 0.22]}
          rotation={[-0.1, 0.8, -0.06]}
        >
          <coneGeometry args={[0.25, 1.8, 4]} />
          <meshStandardMaterial color={darkRock} roughness={1} flatShading />
        </mesh>
        <mesh
          position={[0.1, -7.2, -radius * 0.08]}
          rotation={[0.06, 1.5, 0.04]}
        >
          <coneGeometry args={[0.18, 1.3, 4]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>
        <mesh
          position={[radius * 0.12, -5.4, radius * 0.35]}
          rotation={[0.2, 0.2, 0.15]}
        >
          <coneGeometry args={[0.3, 2, 5]} />
          <meshStandardMaterial color={darkRock} roughness={1} flatShading />
        </mesh>
      </RigidBody>

      {/* ── Grass tufts on edges ── */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const r = radius * 0.88;
        return (
          <mesh
            key={`tuft-${i}`}
            position={[Math.cos(angle) * r, 0.6, Math.sin(angle) * r]}
            rotation={[0, angle, 0]}
          >
            <coneGeometry args={[0.12, 0.35, 4]} />
            <meshStandardMaterial color={darkerGrass} flatShading />
          </mesh>
        );
      })}

      {/* ── Small rocks on surface ── */}
      <mesh
        position={[radius * 0.6, 0.55, -radius * 0.5]}
        rotation={[0.3, 0.8, 0.1]}
      >
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#a8a29e" roughness={1} flatShading />
      </mesh>
      <mesh
        position={[-radius * 0.55, 0.54, radius * 0.4]}
        rotation={[0.5, 1.2, -0.2]}
      >
        <dodecahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#a8a29e" roughness={1} flatShading />
      </mesh>

      {/* ── Island contents (house, decorations) ── */}
      <group position={[0, 0.5, 0]}>{children}</group>
    </group>
  );
}
