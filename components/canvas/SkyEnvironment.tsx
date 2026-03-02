"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Clouds, Cloud, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Gradient sky dome (fog-proof) ---------- */
function GradientSky() {
  const uniforms = useMemo(
    () => ({
      uTopColor: { value: new THREE.Color("#3b82f6") },    // vivid blue zenith
      uMidColor: { value: new THREE.Color("#7dd3fc") },    // sky blue middle
      uBotColor: { value: new THREE.Color("#bae6fd") },    // pale horizon
      uSunColor: { value: new THREE.Color("#fef3c7") },    // warm sun glow
      uSunDir: { value: new THREE.Vector3(0.6, 0.25, 0.6).normalize() },
    }),
    [],
  );

  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[450, 64, 32]} />
      <shaderMaterial
        vertexShader={`
          varying vec3 vWorldPos;
          void main() {
            vec4 wp = modelMatrix * vec4(position, 1.0);
            vWorldPos = wp.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uTopColor;
          uniform vec3 uMidColor;
          uniform vec3 uBotColor;
          uniform vec3 uSunColor;
          uniform vec3 uSunDir;
          varying vec3 vWorldPos;

          void main() {
            vec3 dir = normalize(vWorldPos);
            float h = dir.y;                           // -1 bottom … +1 top

            // Sky gradient: bottom → mid → top
            vec3 sky = mix(uBotColor, uMidColor, smoothstep(0.0, 0.25, h));
            sky = mix(sky, uTopColor, smoothstep(0.25, 0.7, h));

            // Below horizon — darker fade
            vec3 ground = mix(uBotColor, vec3(0.65, 0.78, 0.88), smoothstep(0.0, -0.35, h));
            sky = mix(sky, ground, smoothstep(0.02, -0.05, h));

            // Sun glow near sun direction
            float sunDot = max(dot(dir, uSunDir), 0.0);
            float sunGlow = pow(sunDot, 12.0) * 0.5 + pow(sunDot, 64.0) * 0.4;
            sky += uSunColor * sunGlow;

            gl_FragColor = vec4(sky, 1.0);
          }
        `}
        uniforms={uniforms}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}

/* ---------- Slowly drifting cloud group ---------- */
function DriftingClouds() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.003; // slow panoramic drift
    }
  });

  return (
    <group ref={groupRef}>
      <Clouds material={THREE.MeshBasicMaterial}>
        {/* Upper white fluffy clouds */}
        <Cloud position={[-35, 30, -25]} speed={0.15} opacity={0.7}  bounds={[16, 3, 8]}  volume={8}  color="#ffffff" />
        <Cloud position={[30, 34, 15]}   speed={0.1}  opacity={0.6}  bounds={[20, 3, 10]} volume={10} color="#ffffff" />
        <Cloud position={[5, 28, 35]}    speed={0.18} opacity={0.65} bounds={[14, 2, 6]}  volume={7}  color="#ffffff" />
        <Cloud position={[-20, 38, 20]}  speed={0.12} opacity={0.55} bounds={[18, 3, 9]}  volume={9}  color="#f0f9ff" />
        <Cloud position={[40, 32, -30]}  speed={0.08} opacity={0.5}  bounds={[22, 3, 11]} volume={11} color="#ffffff" />
        <Cloud position={[-45, 36, -10]} speed={0.14} opacity={0.45} bounds={[15, 2, 7]}  volume={6}  color="#f0f9ff" />

        {/* Lower mystical mist under islands */}
        <Cloud position={[-15, -14, -8]}  speed={0.06} opacity={0.25} bounds={[24, 4, 12]} volume={12} color="#e0f2fe" />
        <Cloud position={[12, -18, 8]}    speed={0.04} opacity={0.2}  bounds={[28, 4, 14]} volume={14} color="#e0f2fe" />
        <Cloud position={[0, -24, -15]}   speed={0.05} opacity={0.15} bounds={[22, 5, 10]} volume={10} color="#ddd6fe" />
      </Clouds>
    </group>
  );
}

export default function SkyEnvironment() {
  return (
    <>
      <GradientSky />
      <Stars
        radius={200}
        depth={80}
        count={800}
        factor={3}
        saturation={0.2}
        fade
        speed={0.5}
      />
      <DriftingClouds />
    </>
  );
}
