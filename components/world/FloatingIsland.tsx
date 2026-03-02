"use client";

import { useMemo } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

interface FloatingIslandProps {
  position: [number, number, number];
  radius: number;
  color: string;
  rockColor: string;
  children?: React.ReactNode;
}

export default function FloatingIsland({
  position,
  radius,
  color,
  rockColor,
  children,
}: FloatingIslandProps) {
  const darkerGrass = useMemo(
    () => "#" + new THREE.Color(color).multiplyScalar(0.7).getHexString(),
    [color]
  );
  const dirtColor = useMemo(
    () => "#" + new THREE.Color(rockColor).lerp(new THREE.Color("#8B6914"), 0.4).getHexString(),
    [rockColor]
  );

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          args={[radius, 0.5, radius]}
          position={[0, 0, 0]}
        />

        {/* ── Grass top layer ── */}
        <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[radius, radius * 0.98, 0.7, 32]} />
          <meshStandardMaterial color={color} roughness={0.85} flatShading />
        </mesh>

        {/* ── Grass edge lip ── */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[radius * 0.99, radius * 0.95, 0.2, 32]} />
          <meshStandardMaterial color={darkerGrass} roughness={0.9} />
        </mesh>

        {/* ── Dirt middle layer ── */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[radius * 0.95, radius * 0.75, 1.4, 24]} />
          <meshStandardMaterial color={dirtColor} roughness={0.95} flatShading />
        </mesh>

        {/* ── Rocky bottom cone ── */}
        <mesh position={[0, -4.5, 0]}>
          <coneGeometry args={[radius * 0.75, 6, 12]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>

        {/* ── Small stalactite rocks ── */}
        <mesh position={[radius * 0.3, -6.5, radius * 0.2]} rotation={[0.2, 0.5, 0.1]}>
          <coneGeometry args={[0.4, 2, 6]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
        </mesh>
        <mesh position={[-radius * 0.4, -5.8, -radius * 0.3]} rotation={[-0.15, 0.8, -0.1]}>
          <coneGeometry args={[0.3, 1.6, 5]} />
          <meshStandardMaterial color={rockColor} roughness={1} flatShading />
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
      <mesh position={[radius * 0.6, 0.55, -radius * 0.5]} rotation={[0.3, 0.8, 0.1]}>
        <dodecahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#a8a29e" roughness={1} flatShading />
      </mesh>
      <mesh position={[-radius * 0.55, 0.54, radius * 0.4]} rotation={[0.5, 1.2, -0.2]}>
        <dodecahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#a8a29e" roughness={1} flatShading />
      </mesh>

      {/* ── Island contents (house, decorations) ── */}
      <group position={[0, 0.5, 0]}>{children}</group>
    </group>
  );
}
