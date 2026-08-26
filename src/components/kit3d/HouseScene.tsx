"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Walls from "./Walls";
import RoomFloors from "./RoomFloors";
import Furniture from "./Furniture";
import Pool from "./Pool";
import ZoneLabels from "./ZoneLabels";
import CameraLayer from "./CameraLayer";
import CameraHotspots from "./CameraHotspots";
import { useKit3DStore } from "./useKit3DStore";

interface HouseSceneProps {
  lightweight?: boolean;
  reducedMotion?: boolean;
}

const SCENE_TARGET: [number, number, number] = [0, 0, -2];

const THEME = {
  day: {
    background: "#0a0e14",
    fog: "#0a0e14" as const,
    fogNear: 30,
    fogFar: 68,
    ground: "#141a22",
    ambient: "#ffffff",
    ambientIntensity: 0.55,
    key: "#ffffff",
    keyIntensity: 1.15,
    fillA: "#6ee7ff",
    fillAIntensity: 0.25,
    fillB: "#a78bfa",
    fillBIntensity: 0.18,
  },
  night: {
    background: "#050907",
    fog: "#050907" as const,
    fogNear: 22,
    fogFar: 52,
    ground: "#0a120c",
    ambient: "#2f6b3f",
    ambientIntensity: 0.4,
    key: "#3fae5c",
    keyIntensity: 0.85,
    fillA: "#35c96b",
    fillAIntensity: 0.3,
    fillB: "#1f8a4a",
    fillBIntensity: 0.2,
  },
};

export default function HouseScene({ lightweight = false, reducedMotion = false }: HouseSceneProps) {
  const isNightMode = useKit3DStore((state) => state.isNightMode);
  const theme = isNightMode ? THEME.night : THEME.day;

  return (
    <Canvas
      shadows={!lightweight}
      dpr={lightweight ? [1, 1] : [1, 1.5]}
      camera={{ position: [24, 19, 20], fov: 40, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={[theme.background]} />
      <fog attach="fog" args={[theme.fog, theme.fogNear, theme.fogFar]} />

      <ambientLight color={theme.ambient} intensity={theme.ambientIntensity} />
      <directionalLight
        position={[16, 20, 10]}
        color={theme.key}
        intensity={theme.keyIntensity}
        castShadow={!lightweight}
        shadow-mapSize={lightweight ? [512, 512] : [1536, 1536]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-camera-near={1}
        shadow-camera-far={55}
      />
      <directionalLight position={[-14, 8, -8]} intensity={theme.fillAIntensity} color={theme.fillA} />
      <directionalLight position={[10, 5, -14]} intensity={theme.fillBIntensity} color={theme.fillB} />

      {/* site ground, beyond the house/yard footprint */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -2]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color={theme.ground} roughness={1} />
      </mesh>

      <RoomFloors />
      <Pool />
      <Walls />
      <Furniture />
      <ZoneLabels />
      <CameraLayer />
      <CameraHotspots />

      <OrbitControls
        target={SCENE_TARGET}
        enablePan={false}
        enableZoom
        enableDamping={!reducedMotion}
        minDistance={9}
        maxDistance={42}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}
