"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Walls from "./Walls";
import RoomFloors from "./RoomFloors";
import Furniture from "./Furniture";

interface HouseSceneProps {
  lightweight?: boolean;
  reducedMotion?: boolean;
}

const SCENE_TARGET: [number, number, number] = [0, 0, -1.25];

export default function HouseScene({ lightweight = false, reducedMotion = false }: HouseSceneProps) {
  return (
    <Canvas
      shadows={!lightweight}
      dpr={lightweight ? [1, 1] : [1, 1.5]}
      camera={{ position: [10, 8.5, 10], fov: 38, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0a0e14"]} />
      <fog attach="fog" args={["#0a0e14", 22, 46]} />

      <ambientLight intensity={0.55} />
      <directionalLight
        position={[9, 13, 6]}
        intensity={1.15}
        castShadow={!lightweight}
        shadow-mapSize={lightweight ? [512, 512] : [1536, 1536]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={1}
        shadow-camera-far={35}
      />
      <directionalLight position={[-8, 5, -6]} intensity={0.25} color="#6ee7ff" />
      <directionalLight position={[6, 3, -10]} intensity={0.18} color="#a78bfa" />

      {/* site ground, beyond the house/yard footprint */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -1]} receiveShadow>
        <planeGeometry args={[46, 46]} />
        <meshStandardMaterial color="#141a22" roughness={1} />
      </mesh>

      <RoomFloors />
      <Walls />
      <Furniture />

      <OrbitControls
        target={SCENE_TARGET}
        enablePan={false}
        enableZoom
        enableDamping={!reducedMotion}
        minDistance={7}
        maxDistance={22}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.15}
      />
    </Canvas>
  );
}
