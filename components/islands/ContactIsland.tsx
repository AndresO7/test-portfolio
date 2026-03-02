"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Lantern({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity =
        2 + Math.sin(state.clock.elapsedTime * 2.5 + position[0] * 2) * 0.5;
    }
  });
  return (
    <group position={position}>
      {/* Post */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 1.4, 6]} />
        <meshStandardMaterial color="#44403c" roughness={0.9} />
      </mesh>
      {/* Cross bar */}
      <mesh position={[0.15, 1.5, 0]}>
        <boxGeometry args={[0.35, 0.04, 0.04]} />
        <meshStandardMaterial color="#44403c" roughness={0.9} />
      </mesh>
      {/* Lantern housing */}
      <mesh position={[0.3, 1.35, 0]}>
        <boxGeometry args={[0.22, 0.3, 0.22]} />
        <meshStandardMaterial
          color="#fbbf24"
          transparent
          opacity={0.65}
          emissive="#fbbf24"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Lantern top */}
      <mesh position={[0.3, 1.55, 0]}>
        <coneGeometry args={[0.14, 0.12, 4]} />
        <meshStandardMaterial color="#57534e" roughness={0.9} />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0.3, 1.35, 0]}
        color="#fbbf24"
        intensity={2}
        distance={5}
      />
    </group>
  );
}

function Mailbox({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#57534e" roughness={0.9} />
      </mesh>
      {/* Main box — rounded look via cylinder */}
      <mesh position={[0, 1.08, 0]} castShadow rotation={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.3]} />
        <meshStandardMaterial color="#dc2626" roughness={0.7} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.56, 0.06, 0.36]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.8} />
      </mesh>
      {/* Flag */}
      <mesh position={[0.3, 1.15, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
    </group>
  );
}

function Bench({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[1.0, 0.06, 0.35]} />
        <meshStandardMaterial color="#a0845c" roughness={0.9} />
      </mesh>
      {/* Legs */}
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.17, 0]}>
          <boxGeometry args={[0.06, 0.34, 0.3]} />
          <meshStandardMaterial color="#7a5c38" roughness={0.95} />
        </mesh>
      ))}
      {/* Backrest */}
      <mesh position={[0, 0.55, -0.14]}>
        <boxGeometry args={[1.0, 0.35, 0.04]} />
        <meshStandardMaterial color="#a0845c" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function ContactIsland() {
  return (
    <group>
      <Lantern position={[-3.5, 0, -2.5]} />
      <Lantern position={[3.5, 0, -1.5]} />
      <Lantern position={[-2.5, 0, 4]} />
      <Lantern position={[3, 0, 3.5]} />

      <Mailbox position={[4.5, 0, 1]} />

      <Bench position={[-4, 0, 1.5]} rotation={0.3} />
      <Bench position={[2, 0, -4]} rotation={-0.6} />

      {/* Welcome mat */}
      <mesh position={[0, 0.06, 3.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 0.7]} />
        <meshStandardMaterial color="#92400e" roughness={0.95} />
      </mesh>

      {/* Flower pot near door */}
      <mesh position={[1.2, 0.2, 2.5]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.4, 8]} />
        <meshStandardMaterial color="#a0522d" roughness={0.9} />
      </mesh>
      <mesh position={[1.2, 0.55, 2.5]}>
        <sphereGeometry args={[0.18, 6, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} flatShading />
      </mesh>
      <mesh position={[-1.2, 0.2, 2.5]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.4, 8]} />
        <meshStandardMaterial color="#a0522d" roughness={0.9} />
      </mesh>
      <mesh position={[-1.2, 0.55, 2.5]}>
        <sphereGeometry args={[0.18, 6, 6]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} flatShading />
      </mesh>
    </group>
  );
}
