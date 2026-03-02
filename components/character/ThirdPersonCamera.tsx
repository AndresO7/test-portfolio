"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/components/stores/useGameStore";
import { CAMERA_OFFSET, CAMERA_LERP } from "@/lib/constants";

const _targetPos = new THREE.Vector3();
const _cameraTarget = new THREE.Vector3();

export default function ThirdPersonCamera() {
  const initialized = useRef(false);

  useFrame((state) => {
    const { playerPosition } = useGameStore.getState();

    _targetPos.set(
      playerPosition[0] + CAMERA_OFFSET[0],
      playerPosition[1] + CAMERA_OFFSET[1],
      playerPosition[2] + CAMERA_OFFSET[2]
    );

    _cameraTarget.set(playerPosition[0], playerPosition[1] + 1, playerPosition[2]);

    if (!initialized.current) {
      state.camera.position.copy(_targetPos);
      initialized.current = true;
    } else {
      state.camera.position.lerp(_targetPos, CAMERA_LERP);
    }

    state.camera.lookAt(_cameraTarget);
  });

  return null;
}
