"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Lighting from "./Lighting";
import SkyEnvironment from "./SkyEnvironment";
import Hamster from "@/components/character/Hamster";
import ThirdPersonCamera from "@/components/character/ThirdPersonCamera";
import IslandLayout from "@/components/world/IslandLayout";
import HUD from "@/components/ui/HUD";
import { useGameStore } from "@/components/stores/useGameStore";

const keyMap = [
  { name: "forward", keys: ["KeyW", "ArrowUp"] },
  { name: "backward", keys: ["KeyS", "ArrowDown"] },
  { name: "left", keys: ["KeyA", "ArrowLeft"] },
  { name: "right", keys: ["KeyD", "ArrowRight"] },
];

function SceneContent() {
  const setIsLoading = useGameStore((s) => s.setIsLoading);

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <>
      <Lighting />
      <SkyEnvironment />
      <Physics gravity={[0, -20, 0]} debug={false}>
        <Hamster />
        <IslandLayout />
      </Physics>
      <ThirdPersonCamera />
    </>
  );
}

export default function Scene() {
  return (
    <>
      <KeyboardControls map={keyMap}>
        <Canvas
          shadows
          camera={{ fov: 55, near: 0.1, far: 500 }}
          style={{ position: "fixed", inset: 0 }}
          gl={{ antialias: true, toneMapping: 4 }}
        >
          <color attach="background" args={["#7dd3fc"]} />
          <fog attach="fog" args={["#bae6fd", 80, 220]} />
          <Suspense fallback={null}>
            <SceneContent />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      <HUD />
    </>
  );
}
