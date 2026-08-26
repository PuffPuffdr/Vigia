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

interface HouseSceneProps {
  lightweight?: boolean;
  reducedMotion?: boolean;
}

const SCENE_TARGET: [number, number, number] = [0, 0, -2];

export default function HouseScene({ lightweight = false, reducedMotion = false }: HouseSceneProps) {
  return (
    <Canvas
      shadows={!lightweight}
      dpr={lightweight ? [1, 1] : [1, 1.5]}
      camera={{ position: [24, 19, 20], fov: 40, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0a0e14"]} />
      <fog attach="fog" args={["#0a0e14", 30, 68]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[16, 20, 10]}
        intensity={1.15}
        castShadow={!lightweight}
        shadow-mapSize={lightweight ? [512, 512] : [1536, 1536]}
        shadow-camera-left={-22}
        shadow-camera-right={22}
        shadow-camera-top={22}
        shadow-camera-bottom={-22}
        shadow-camera-near={1}
        shadow-camera-far={55}
      />
      <directionalLight position={[-14, 8, -8]} intensity={0.25} color="#6ee7ff" />
      <directionalLight position={[10, 5, -14]} intensity={0.18} color="#a78bfa" />

      {/* site ground, beyond the house/yard footprint */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -2]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#141a22" roughness={1} />
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
