"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Tree({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 1.8, 8]} />
        <meshStandardMaterial color="#7a5c38" roughness={0.95} />
      </mesh>
      {/* Foliage layers */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <coneGeometry args={[1.1, 1.8, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 3.1, 0]} castShadow>
        <coneGeometry args={[0.8, 1.5, 8]} />
        <meshStandardMaterial color="#22c55e" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 3.75, 0]} castShadow>
        <coneGeometry args={[0.5, 1.1, 7]} />
        <meshStandardMaterial color="#4ade80" roughness={0.85} flatShading />
      </mesh>
    </group>
  );
}

function Flower({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 1.5 + position[0] * 3) * 0.08;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.025, 0.5, 5]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
      {/* Petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.08, 0.55, Math.sin(a) * 0.08]}
          >
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}
      {/* Center */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>
    </group>
  );
}

function Butterfly({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + Math.sin(t * 0.7) * 1.5;
    ref.current.position.y = position[1] + Math.sin(t * 1.2) * 0.4;
    ref.current.position.z = position[2] + Math.cos(t * 0.5) * 1.5;
    ref.current.rotation.y = t * 0.8;
  });
  return (
    <group ref={ref} position={position}>
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, 0.3]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshStandardMaterial color="#f472b6" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, -0.3]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshStandardMaterial color="#f472b6" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function AboutIsland() {
  return (
    <group>
      <Tree position={[-4.5, 0, -3]} scale={1.1} />
      <Tree position={[4, 0, -2.5]} scale={0.9} />
      <Tree position={[-3.5, 0, 3.5]} scale={0.8} />
      <Tree position={[3.5, 0, 4]} scale={1} />
      <Tree position={[5.5, 0, 1]} scale={0.7} />

      <Flower position={[-2, 0, 4.5]} color="#f472b6" />
      <Flower position={[-1, 0, 5]} color="#fb923c" />
      <Flower position={[1, 0, 4.8]} color="#a78bfa" />
      <Flower position={[2.5, 0, 3.5]} color="#facc15" />
      <Flower position={[-4, 0, 1]} color="#f472b6" />
      <Flower position={[5, 0, -1]} color="#60a5fa" />
      <Flower position={[-2.5, 0, -4.5]} color="#fb923c" />

      <Butterfly position={[-1, 2.5, 2]} />
      <Butterfly position={[3, 3, -1]} />

      {/* Pond */}
      <mesh position={[2.5, 0.06, -4.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.3, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          metalness={0.2}
          roughness={0.15}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Pond rim stones */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={`stone-${i}`}
            position={[
              2.5 + Math.cos(a) * 1.35,
              0.12,
              -4.5 + Math.sin(a) * 1.35,
            ]}
            rotation={[0.1, a, 0.2]}
          >
            <dodecahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#a8a29e" roughness={1} flatShading />
          </mesh>
        );
      })}
    </group>
  );
}
