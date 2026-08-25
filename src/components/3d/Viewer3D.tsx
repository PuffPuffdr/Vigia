"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import ProductModel, { type ProductKind } from "./ProductModel";

interface Viewer3DProps {
  kind?: ProductKind;
  modelUrl?: string;
  accent?: string;
  autoRotate?: boolean;
}

export default function Viewer3D({
  kind = "doorbell",
  modelUrl,
  accent = "#6EE7FF",
  autoRotate = true,
}: Viewer3DProps) {
  const [interacting, setInteracting] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.05, 4.7], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 4, 3]} intensity={1.1} />
      <directionalLight position={[-2, 1, 2]} intensity={0.35} color="#6EE7FF" />
      <directionalLight position={[2, -1, -3]} intensity={0.3} color="#A78BFA" />

      <Suspense fallback={null}>
        <ProductModel kind={kind} modelUrl={modelUrl} accent={accent} />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate && !interacting}
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.7}
        onStart={() => setInteracting(true)}
        onEnd={() => setInteracting(false)}
      />
    </Canvas>
  );
}
