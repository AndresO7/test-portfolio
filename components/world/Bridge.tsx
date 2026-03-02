"use client";

import { useMemo } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import * as THREE from "three";

interface BridgeProps {
  from: [number, number, number];
  to: [number, number, number];
  fromRadius: number;
  toRadius: number;
}

export default function Bridge({ from, to, fromRadius, toRadius }: BridgeProps) {
  const { position, rotation, length } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const dir = end.clone().sub(start);

    const startOffset = dir.clone().normalize().multiplyScalar(fromRadius * 0.82);
    const endOffset = dir.clone().normalize().multiplyScalar(-toRadius * 0.82);
    const bridgeStart = start.clone().add(startOffset);
    const bridgeEnd = end.clone().add(endOffset);

    const bridgeDir = bridgeEnd.clone().sub(bridgeStart);
    const bridgeLength = bridgeDir.length();
    const mid = bridgeStart.clone().add(bridgeEnd).multiplyScalar(0.5);
    const angle = Math.atan2(bridgeDir.x, bridgeDir.z);

    return {
      position: [mid.x, 0.35, mid.z] as [number, number, number],
      rotation: [0, angle, 0] as [number, number, number],
      length: bridgeLength,
    };
  }, [from, to, fromRadius, toRadius]);

  const planks = 16;

  return (
    <group position={position} rotation={rotation}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[1.0, 0.15, length / 2]} position={[0, 0, 0]} />

        {/* ── Planks ── */}
        {Array.from({ length: planks }).map((_, i) => {
          const z = -length / 2 + (length / planks) * (i + 0.5);
          const sag = Math.sin((i / (planks - 1)) * Math.PI) * -0.08;
          return (
            <mesh key={i} position={[0, -0.04 + sag, z]} receiveShadow castShadow>
              <boxGeometry
                args={[1.8, 0.08, length / planks - 0.06]}
              />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#b08c5a" : "#9a7a4e"}
                roughness={0.92}
              />
            </mesh>
          );
        })}

        {/* ── Side beams ── */}
        {[-0.9, 0.9].map((x) => (
          <mesh key={`beam-${x}`} position={[x, -0.08, 0]}>
            <boxGeometry args={[0.1, 0.06, length]} />
            <meshStandardMaterial color="#7a5c38" roughness={0.95} />
          </mesh>
        ))}

        {/* ── Posts + rope ── */}
        {Array.from({ length: 6 }).map((_, i) => {
          const z = -length / 2 + (length / 5) * (i + 0.5) - length / 10;
          return (
            <group key={`post-${i}`}>
              {[-0.95, 0.95].map((x) => (
                <group key={`p-${x}`}>
                  {/* Vertical post */}
                  <mesh position={[x, 0.38, z]} castShadow>
                    <boxGeometry args={[0.1, 0.85, 0.1]} />
                    <meshStandardMaterial color="#6b4e30" roughness={0.95} />
                  </mesh>
                  {/* Post cap */}
                  <mesh position={[x, 0.82, z]}>
                    <sphereGeometry args={[0.07, 6, 6]} />
                    <meshStandardMaterial color="#5c3f24" roughness={0.9} />
                  </mesh>
                </group>
              ))}
            </group>
          );
        })}

        {/* ── Rope rails (simple cylinders) ── */}
        {[-0.95, 0.95].map((x) => (
          <mesh key={`rope-${x}`} position={[x, 0.62, 0]}>
            <boxGeometry args={[0.04, 0.04, length * 0.96]} />
            <meshStandardMaterial color="#92703c" roughness={0.8} />
          </mesh>
        ))}
      </RigidBody>
    </group>
  );
}
