"use client";

function Pillar({
  position,
  height = 2,
}: {
  position: [number, number, number];
  height?: number;
}) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.6, 0.24, 0.6]} />
        <meshStandardMaterial color="#e9d5ff" roughness={0.8} />
      </mesh>
      {/* Column */}
      <mesh position={[0, height / 2 + 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, height, 10]} />
        <meshStandardMaterial color="#d8b4fe" roughness={0.7} />
      </mesh>
      {/* Capital */}
      <mesh position={[0, height + 0.3, 0]}>
        <boxGeometry args={[0.55, 0.18, 0.55]} />
        <meshStandardMaterial color="#c084fc" roughness={0.6} />
      </mesh>
      {/* Orb on top */}
      <mesh position={[0, height + 0.55, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial
          color="#e9d5ff"
          emissive="#c084fc"
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function Scroll({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Paper roll */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.75, 8]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.85} />
      </mesh>
      {/* End knobs */}
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <sphereGeometry args={[0.12, 6, 6]} />
          <meshStandardMaterial color="#7a5c38" roughness={0.85} />
        </mesh>
      ))}
      {/* Unrolled part */}
      <mesh position={[0, -0.15, 0.15]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[0.6, 0.3]} />
        <meshStandardMaterial
          color="#fefce8"
          roughness={0.9}
          side={2}
        />
      </mesh>
    </group>
  );
}

function Arch({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Two pillars */}
      <mesh position={[-0.6, 1.0, 0]} castShadow>
        <boxGeometry args={[0.2, 2.0, 0.2]} />
        <meshStandardMaterial color="#d8b4fe" roughness={0.7} />
      </mesh>
      <mesh position={[0.6, 1.0, 0]} castShadow>
        <boxGeometry args={[0.2, 2.0, 0.2]} />
        <meshStandardMaterial color="#d8b4fe" roughness={0.7} />
      </mesh>
      {/* Top beam */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[1.5, 0.2, 0.22]} />
        <meshStandardMaterial color="#c084fc" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function ExperienceIsland() {
  return (
    <group>
      <Pillar position={[-3.5, 0, -3]} height={2.8} />
      <Pillar position={[3.5, 0, -2.5]} height={3.2} />
      <Pillar position={[-4, 0, 2.5]} height={2} />
      <Pillar position={[3.5, 0, 3.5]} height={2.4} />

      <Arch position={[-1, 0, -4]} />

      <Scroll position={[-2.5, 0.35, 4.5]} rotation={0.3} />
      <Scroll position={[4.5, 0.35, 0.5]} rotation={-0.5} />
      <Scroll position={[-4, 0.35, -0.5]} rotation={1.2} />

      {/* Stone path */}
      {[
        [-1.5, 0.04, 3.5],
        [0, 0.04, 4],
        [1.5, 0.04, 3.7],
        [3, 0.04, 3],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos as [number, number, number]}
          rotation={[0, i * 0.7, 0]}
          receiveShadow
        >
          <cylinderGeometry args={[0.3, 0.35, 0.08, 6]} />
          <meshStandardMaterial color="#a8a29e" roughness={1} flatShading />
        </mesh>
      ))}

      {/* Ancient rune circle */}
      <mesh position={[0, 0.03, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.0, 24]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#c084fc"
          emissiveIntensity={0.2}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}
