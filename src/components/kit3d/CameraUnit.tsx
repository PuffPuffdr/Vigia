import { useMemo } from "react";
import { Box, Cylinder, Sphere } from "@react-three/drei";
import * as THREE from "three";
import type { CameraType } from "./cameraSpots";

const ACCENT = "#6ee7ff";
const BODY_LIGHT = "#eef1f5";
const LENS_DARK = "#12151b";

interface CameraUnitProps {
  type: CameraType;
  mount: [number, number, number];
  lookAt: [number, number, number];
}

/**
 * Renders one camera body oriented to face `lookAt`, plus its translucent
 * vision cone. Everything is modeled pointing "backward" along local +Y
 * (the mount/lens sits at the local origin); a quaternion then rotates that
 * local -Y axis to align with the real look direction.
 */
export default function CameraUnit({ type, mount, lookAt }: CameraUnitProps) {
  const { quaternion, coneLength, coneRadius } = useMemo(() => {
    const mountVec = new THREE.Vector3(...mount);
    const lookVec = new THREE.Vector3(...lookAt);
    const direction = lookVec.clone().sub(mountVec).normalize();
    const distance = mountVec.distanceTo(lookVec);
    const length = Math.max(1, distance * 1.05);

    return {
      quaternion: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction),
      coneLength: length,
      coneRadius: length * 0.52,
    };
  }, [mount, lookAt]);

  return (
    <group position={mount} quaternion={quaternion}>
      <CameraBody type={type} />
      <mesh position={[0, -coneLength / 2, 0]}>
        <coneGeometry args={[coneRadius, coneLength, 24, 1, true]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.12}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function CameraBody({ type }: { type: CameraType }) {
  if (type === "bullet") {
    return (
      <group>
        <Cylinder args={[0.045, 0.05, 0.18, 14]} position={[0, 0.09, 0]} castShadow>
          <meshStandardMaterial color={BODY_LIGHT} roughness={0.4} />
        </Cylinder>
        <Cylinder args={[0.035, 0.035, 0.015, 14]} position={[0, -0.005, 0]}>
          <meshStandardMaterial color={LENS_DARK} roughness={0.2} />
        </Cylinder>
      </group>
    );
  }

  if (type === "doorbell") {
    return (
      <group>
        <Box args={[0.12, 0.28, 0.06]} position={[0, 0.14, 0]} castShadow>
          <meshStandardMaterial color={BODY_LIGHT} roughness={0.35} />
        </Box>
        <Cylinder args={[0.028, 0.028, 0.015, 16]} position={[0, 0.05, 0]}>
          <meshStandardMaterial color={LENS_DARK} roughness={0.2} />
        </Cylinder>
      </group>
    );
  }

  // turret / dome, ceiling-mounted
  return (
    <group>
      <Cylinder args={[0.07, 0.07, 0.03, 16]} position={[0, 0.06, 0]} castShadow>
        <meshStandardMaterial color={BODY_LIGHT} roughness={0.4} />
      </Cylinder>
      <Sphere args={[0.06, 16, 12]} position={[0, -0.01, 0]} castShadow>
        <meshStandardMaterial color={LENS_DARK} roughness={0.15} />
      </Sphere>
    </group>
  );
}
