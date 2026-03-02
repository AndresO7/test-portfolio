"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Crystal({
  position,
  color,
  height = 1.5,
}: {
  position: [number, number, number];
  color: string;
  height?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0] * 2) * 0.12;
    ref.current.rotation.y += 0.004;
  });
  return (
    <group ref={ref} position={position}>
      {/* Main crystal */}
      <mesh castShadow>
        <octahedronGeometry args={[height * 0.35, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.08}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Inner glow core */}
      <mesh>
        <octahedronGeometry args={[height * 0.18, 0]} />
        <meshStandardMaterial
          color="white"
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Light */}
      <pointLight color={color} intensity={0.5} distance={4} />
    </group>
  );
}

function BookStack({
  position,
  books,
}: {
  position: [number, number, number];
  books: { color: string; width: number }[];
}) {
  let y = 0;
  return (
    <group position={position}>
      {books.map((book, i) => {
        const h = 0.12;
        const el = (
          <group key={i}>
            <mesh position={[0, y + h / 2, 0]} castShadow>
              <boxGeometry args={[book.width, h, 0.5]} />
              <meshStandardMaterial color={book.color} roughness={0.8} />
            </mesh>
            {/* Pages edge */}
            <mesh position={[book.width * 0.05, y + h / 2, 0.26]}>
              <boxGeometry args={[book.width - 0.06, h - 0.02, 0.01]} />
              <meshStandardMaterial color="#fefce8" />
            </mesh>
          </group>
        );
        y += h + 0.01;
        return el;
      })}
    </group>
  );
}

function Potion({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[2]) * 0.03;
    }
  });
  return (
    <group position={position}>
      {/* Bottle */}
      <mesh ref={ref} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.3, 8]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          metalness={0.1}
          roughness={0.05}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.12, 6]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} roughness={0.05} />
      </mesh>
      {/* Cork */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.055, 0.05, 0.06, 6]} />
        <meshStandardMaterial color="#a0845c" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function SkillsIsland() {
  return (
    <group>
      <Crystal position={[-3.5, 1.6, -2.5]} color="#f59e0b" height={2} />
      <Crystal position={[3.5, 1.3, -1.5]} color="#ef4444" height={1.5} />
      <Crystal position={[-2.5, 1.9, 3.5]} color="#8b5cf6" height={1.3} />
      <Crystal position={[2.5, 1.4, 3.5]} color="#06b6d4" height={1.8} />
      <Crystal position={[0, 2, -4]} color="#f472b6" height={1} />

      <BookStack
        position={[4.2, 0, 2]}
        books={[
          { color: "#dc2626", width: 0.7 },
          { color: "#2563eb", width: 0.65 },
          { color: "#16a34a", width: 0.72 },
          { color: "#7c3aed", width: 0.6 },
        ]}
      />
      <BookStack
        position={[-4, 0, 1.5]}
        books={[
          { color: "#ea580c", width: 0.6 },
          { color: "#0891b2", width: 0.68 },
        ]}
      />

      <Potion position={[-4.5, 0.2, -1]} color="#a78bfa" />
      <Potion position={[4.8, 0.2, -1.5]} color="#34d399" />
      <Potion position={[-1.5, 0.2, -4.5]} color="#f472b6" />

      {/* Arcane circle on ground */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.65, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.3}
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}
