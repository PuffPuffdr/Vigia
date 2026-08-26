"use client";

import { Html } from "@react-three/drei";
import { CAMERA_ZONES, getCameraSpot } from "./cameraSpots";
import { useKit3DStore } from "./useKit3DStore";

const HOTSPOT_HEIGHT = 1.8;

export default function CameraHotspots() {
  const cameraCounts = useKit3DStore((state) => state.cameraCounts);
  const incrementCamera = useKit3DStore((state) => state.incrementCamera);
  const decrementCamera = useKit3DStore((state) => state.decrementCamera);

  return (
    <group>
      {CAMERA_ZONES.map((room) => {
        const spot = getCameraSpot(room, 0);
        const count = cameraCounts[room.id] ?? 0;

        return (
          <Html
            key={room.id}
            position={[spot.mount[0], HOTSPOT_HEIGHT, spot.mount[2]]}
            center
            zIndexRange={[20, 0]}
          >
            <div className="flex items-center gap-1 rounded-full border border-glass-brd bg-bg-deep/85 p-1 shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              <button
                type="button"
                onClick={() => decrementCamera(room.id)}
                disabled={count === 0}
                aria-label={`Quitar cámara de ${room.label}`}
                className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-text transition-colors hover:bg-white/10 disabled:opacity-30"
              >
                −
              </button>
              <span className="w-4 text-center font-mono text-xs text-text">{count}</span>
              <button
                type="button"
                onClick={() => incrementCamera(room.id)}
                aria-label={`Agregar cámara en ${room.label}`}
                className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-text transition-colors hover:bg-white/10"
              >
                +
              </button>
            </div>
          </Html>
        );
      })}
    </group>
  );
}
