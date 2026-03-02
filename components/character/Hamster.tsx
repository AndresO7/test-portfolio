"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls, useGLTF } from "@react-three/drei";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useGameStore } from "@/components/stores/useGameStore";
import { SPAWN_POSITION, MOVE_SPEED, FALL_THRESHOLD } from "@/lib/constants";

const MODEL_PATH = "/base_basic_shaded.glb";

// Vertex shader chunk injected into the model's material.
// Based on detailed vertex analysis of the GLB:
//   - Model bbox: X[-0.89, 0.89], Y[0.0, 1.90], Z[-0.56, 0.55]
//   - Arms: Y[0.85, 1.05], |X| > 0.58  (shoulder pivot at X=±0.50, Y=0.95)
//   - Legs: Y < 0.66, split at X=0      (hip pivot at Y=0.63)
//   - Head: Y > 1.20                     (NEVER touched)
const WALK_VERTEX_PREAMBLE = `
  uniform float uTime;
  uniform float uWalking;
`;

const WALK_VERTEX_ANIMATION = `
  // ============ SAFETY: protect head & upper body ============
  // Anything above Y=1.10 must NOT move. Smooth fade from 1.05 to 1.12.
  float safetyMask = 1.0 - smoothstep(1.05, 1.12, position.y);

  float absX = abs(position.x);
  float armSide = sign(position.x);
  float walkSpeed = 10.0;

  // ============ ARM DETECTION ============
  // Arms exist ONLY at Y[0.83..1.07] AND |X| > 0.50
  // Smooth edges to blend with shoulder/torso
  float armYMask = smoothstep(0.80, 0.86, position.y)
                 * (1.0 - smoothstep(1.04, 1.09, position.y));
  float armXMask = smoothstep(0.48, 0.60, absX);
  float isArm = armYMask * armXMask * safetyMask;

  // ============ ARM REST POSE (T-pose → arms down) ============
  // Rotate arm vertices around shoulder pivot in the XY (frontal) plane.
  // This brings arms from horizontal to hanging at the character's sides.
  float shoulderX = armSide * 0.50;
  float shoulderY = 0.95;
  float dx = transformed.x - shoulderX;
  float dy = transformed.y - shoulderY;

  // ~75° downward rotation. Sign flips per side so both arms go down.
  float restAngle = armSide * (-1.3);
  float rc = cos(restAngle);
  float rs = sin(restAngle);
  float restDx = dx * rc - dy * rs;
  float restDy = dx * rs + dy * rc;

  // ============ ARM WALK SWING (forward / back) ============
  // After rest pose, arms hang down. Swing them in the YZ (sagittal)
  // plane around the shoulder for a natural walk cycle.
  float armSwingAngle = sin(uTime * walkSpeed + armSide * 3.14159) * 0.40 * uWalking;
  float sc = cos(armSwingAngle);
  float ss = sin(armSwingAngle);
  // Rotate the rest-posed (dy, z) around the shoulder
  float origZ = transformed.z;
  float swungDy = restDy * sc - origZ * ss;
  float swungDz = restDy * ss + origZ * sc;

  // Apply with smooth blend (isArm = 0 for non-arm vertices → no change)
  transformed.x = mix(transformed.x, shoulderX + restDx, isArm);
  transformed.y = mix(transformed.y, shoulderY + swungDy, isArm);
  transformed.z = mix(transformed.z, swungDz, isArm);

  // ============ LEG ANIMATION ============
  // Legs: Y < 0.66, pivot at hip Y≈0.63.
  // Pendulum effect: max swing at feet (Y=0), zero at hips.
  float legMask = (1.0 - smoothstep(0.55, 0.66, position.y)) * safetyMask;
  float legSide = sign(position.x + 0.001);

  float hipY = 0.63;
  float pendulum = clamp((hipY - position.y) / hipY, 0.0, 1.0);

  // Legs swing opposite to arms on the same side
  float legSwingZ = sin(uTime * walkSpeed - legSide * 3.14159)
                  * 0.20 * uWalking * pendulum;
  transformed.z += legSwingZ * legMask;

  // Slight upward lift when leg swings forward (knee bend feel)
  float legLift = max(0.0, sin(uTime * walkSpeed - legSide * 3.14159))
                * 0.03 * uWalking * pendulum;
  transformed.y += legLift * legMask;
`;

export default function Hamster() {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Group>(null);
  const targetRotation = useRef(0);
  const bobPhase = useRef(0);
  const walkBlend = useRef(0);
  const shaderRef = useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

  const { isOverlayOpen, setHasMovedOnce, setPlayerPosition } = useGameStore();
  const [, getKeys] = useKeyboardControls();

  const { scene } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Inject walk animation into the model's vertex shader
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;

      const mat = child.material as THREE.MeshStandardMaterial;
      mat.onBeforeCompile = (shader) => {
        shader.uniforms.uTime = { value: 0 };
        shader.uniforms.uWalking = { value: 0 };

        shader.vertexShader = shader.vertexShader.replace(
          "#include <common>",
          `#include <common>\n${WALK_VERTEX_PREAMBLE}`
        );

        shader.vertexShader = shader.vertexShader.replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>\n${WALK_VERTEX_ANIMATION}`
        );

        shaderRef.current = shader;
      };
      mat.needsUpdate = true;
    });
  }, [clonedScene]);

  useEffect(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(
        { x: SPAWN_POSITION[0], y: SPAWN_POSITION[1], z: SPAWN_POSITION[2] },
        true
      );
    }
  }, []);

  useFrame((_, delta) => {
    if (!rigidBodyRef.current || !meshRef.current) return;

    const { forward, backward, left, right } = getKeys() as {
      forward: boolean;
      backward: boolean;
      left: boolean;
      right: boolean;
    };

    const pos = rigidBodyRef.current.translation();

    // Fall reset
    if (pos.y < FALL_THRESHOLD) {
      rigidBodyRef.current.setTranslation(
        { x: SPAWN_POSITION[0], y: SPAWN_POSITION[1], z: SPAWN_POSITION[2] },
        true
      );
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      return;
    }

    setPlayerPosition([pos.x, pos.y, pos.z]);

    // Block movement while overlay open
    if (isOverlayOpen) {
      rigidBodyRef.current.setLinvel(
        { x: 0, y: rigidBodyRef.current.linvel().y, z: 0 },
        true
      );
      walkBlend.current = THREE.MathUtils.lerp(walkBlend.current, 0, 0.1);
      if (shaderRef.current) {
        shaderRef.current.uniforms.uWalking.value = walkBlend.current;
        shaderRef.current.uniforms.uTime.value += delta;
      }
      return;
    }

    // Movement input
    const direction = new THREE.Vector3();
    if (forward) direction.z -= 1;
    if (backward) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;

    const moving = direction.length() > 0;

    if (moving) {
      setHasMovedOnce();
      direction.normalize();
      const vel = rigidBodyRef.current.linvel();
      rigidBodyRef.current.setLinvel(
        { x: direction.x * MOVE_SPEED, y: vel.y, z: direction.z * MOVE_SPEED },
        true
      );
      targetRotation.current = Math.atan2(direction.x, direction.z);
    } else {
      const vel = rigidBodyRef.current.linvel();
      rigidBodyRef.current.setLinvel({ x: 0, y: vel.y, z: 0 }, true);
    }

    // Smooth walk blend (drives shader uWalking: 0=idle, 1=walking)
    walkBlend.current = THREE.MathUtils.lerp(
      walkBlend.current,
      moving ? 1 : 0,
      moving ? 0.12 : 0.06
    );

    // Update shader uniforms
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
      shaderRef.current.uniforms.uWalking.value = walkBlend.current;
    }

    // --- Body procedural animation (rotation, bob, sway) ---
    const currentRotY = meshRef.current.rotation.y;
    const diff = targetRotation.current - currentRotY;
    const wrappedDiff = ((diff + Math.PI) % (2 * Math.PI)) - Math.PI;
    meshRef.current.rotation.y += wrappedDiff * 0.1;

    if (moving) {
      bobPhase.current += delta * 10;
      meshRef.current.position.y = Math.sin(bobPhase.current) * 0.04;
      meshRef.current.rotation.z = Math.sin(bobPhase.current * 0.5) * 0.03;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -0.08,
        0.08
      );
    } else {
      bobPhase.current += delta * 1.5;
      meshRef.current.position.y = Math.sin(bobPhase.current) * 0.015;
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.08);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.08);
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="dynamic"
      colliders={false}
      mass={1}
      lockRotations
      linearDamping={0.5}
      position={SPAWN_POSITION}
    >
      <CapsuleCollider args={[0.5, 0.4]} position={[0, 0.95, 0]} />
      <group ref={meshRef}>
        <primitive object={clonedScene} castShadow />
      </group>
    </RigidBody>
  );
}

useGLTF.preload(MODEL_PATH);
