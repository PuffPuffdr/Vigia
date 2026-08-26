"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ROOMS, WALL_HEIGHT } from "./houseData";

const LABEL_HEIGHT_INTERIOR = WALL_HEIGHT + 0.4;
const LABEL_HEIGHT_EXTERIOR = 1.6;

// Camera-to-label distance at which the label is fully hidden / fully shown.
// Labels fade out as the camera gets close to that specific zone (so they
// don't sit "gigante" in front of you once you're already looking at it),
// but never shrink or blur with distance, so they stay legible zoomed out.
const FADE_NEAR = 7;
const FADE_FAR = 16;

export default function ZoneLabels() {
  return (
    <group>
      {ROOMS.map((room) => {
        const centerX = (room.x[0] + room.x[1]) / 2;
        const centerZ = (room.z[0] + room.z[1]) / 2;
        const height = room.type === "exterior" ? LABEL_HEIGHT_EXTERIOR : LABEL_HEIGHT_INTERIOR;
        return (
          <ZoneLabel key={room.id} position={[centerX, height, centerZ]} label={room.label} />
        );
      })}
    </group>
  );
}

function ZoneLabel({ position, label }: { position: [number, number, number]; label: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const worldPos = useRef(new THREE.Vector3(...position));

  useFrame(({ camera }) => {
    if (!divRef.current) return;
    const distance = camera.position.distanceTo(worldPos.current);
    const t = (distance - FADE_NEAR) / (FADE_FAR - FADE_NEAR);
    divRef.current.style.opacity = String(Math.min(1, Math.max(0, t)));
  });

  return (
    <Html position={position} center pointerEvents="none" zIndexRange={[10, 0]}>
      <div
        ref={divRef}
        className="whitespace-nowrap rounded-full border border-accent/50 bg-bg-deep/80 px-3 py-1 font-mono text-[11px] text-text shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
        style={{ opacity: 0, transition: "opacity 0.12s linear" }}
      >
        {label}
      </div>
    </Html>
  );
}
