"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Gear({
  position,
  size = 0.8,
  speed = 0.5,
}: {
  position: [number, number, number];
  size?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <torusGeometry args={[size, size * 0.18, 8, 12]} />
        <meshStandardMaterial
          color="#94a3b8"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      {/* Gear teeth hint */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * size, 0, Math.sin(a) * size]}
          >
            <boxGeometry args={[size * 0.15, size * 0.12, size * 0.15]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

function Monitor({
  position,
  rotation,
  screenColor = "#0ea5e9",
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  screenColor?: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Bezel */}
      <mesh castShadow>
        <boxGeometry args={[1.3, 0.9, 0.08]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[1.1, 0.7, 0.01]} />
        <meshStandardMaterial
          color={screenColor}
          emissive={screenColor}
          emissiveIntensity={0.5}
          roughness={0.1}
        />
      </mesh>
      {/* Code lines on screen */}
      {[0.2, 0.08, -0.04, -0.16].map((y, i) => (
        <mesh key={i} position={[-0.15 + i * 0.05, y, 0.05]}>
          <boxGeometry args={[0.4 + (i % 2) * 0.2, 0.04, 0.005]} />
          <meshStandardMaterial
            color="#0f172a"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
      {/* Stand */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 6]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Screen light */}
      <pointLight
        position={[0, 0, 0.5]}
        color={screenColor}
        intensity={0.4}
        distance={3}
      />
    </group>
  );
}

function ServerRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.6, 1.2, 0.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>
      {/* LED lights */}
      {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
        <mesh key={i} position={[0.2, y, 0.21]}>
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshStandardMaterial
            color={i === 2 ? "#ef4444" : "#4ade80"}
            emissive={i === 2 ? "#ef4444" : "#4ade80"}
            emissiveIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ProjectsIsland() {
  return (
    <group>
      <Gear position={[-4, 1.8, -3]} size={0.9} speed={0.4} />
      <Gear position={[4.5, 2.2, -2]} size={0.6} speed={-0.6} />
      <Gear position={[-3, 2.8, 3.5]} size={0.5} speed={0.8} />

      <Monitor position={[3.5, 1.3, 3.5]} rotation={[0, -0.5, 0]} />
      <Monitor
        position={[-4, 1.3, 2.5]}
        rotation={[0, 0.4, 0]}
        screenColor="#a78bfa"
      />

      <ServerRack position={[4.5, 0.6, 0]} />
      <ServerRack position={[-5, 0.6, -1]} />

      {/* Cable on ground */}
      <mesh position={[1, 0.05, 4]} rotation={[-Math.PI / 2, 0, 0.3]}>
        <torusGeometry args={[0.5, 0.03, 6, 20, Math.PI]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}
