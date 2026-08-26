"use client";

import { CAMERA_ZONES, getCameraSpot, getCameraType } from "./cameraSpots";
import CameraUnit from "./CameraUnit";
import { useKit3DStore } from "./useKit3DStore";

export default function CameraLayer() {
  const cameraCounts = useKit3DStore((state) => state.cameraCounts);

  return (
    <group>
      {CAMERA_ZONES.map((room) => {
        const count = cameraCounts[room.id] ?? 0;
        if (count === 0) return null;

        const type = getCameraType(room);
        return (
          <group key={room.id}>
            {Array.from({ length: count }, (_, index) => {
              const spot = getCameraSpot(room, index);
              return <CameraUnit key={index} type={type} mount={spot.mount} lookAt={spot.lookAt} />;
            })}
          </group>
        );
      })}
    </group>
  );
}
