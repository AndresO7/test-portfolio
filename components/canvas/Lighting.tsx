"use client";

export default function Lighting() {
  return (
    <>
      {/* Warm ambient fill */}
      <ambientLight intensity={0.55} color="#fef3c7" />

      {/* Sun – warm directional */}
      <directionalLight
        position={[30, 50, 25]}
        intensity={1.6}
        color="#fff7ed"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={120}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0005}
      />

      {/* Sky-fill from above – soft blue bounce */}
      <hemisphereLight args={["#7dd3fc", "#86efac", 0.35]} />

      {/* Rim / back-light for depth */}
      <directionalLight
        position={[-25, 20, -30]}
        intensity={0.3}
        color="#c4b5fd"
      />
    </>
  );
}
