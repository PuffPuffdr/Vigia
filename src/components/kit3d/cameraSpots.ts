import { ROOMS, WALL_HEIGHT, type RoomBounds } from "./houseData";

export type CameraType = "bullet" | "turret" | "doorbell";

export interface CameraSpot {
  mount: [number, number, number];
  lookAt: [number, number, number];
}

/** The bathroom is the one zone that never gets a camera hotspot. */
export const CAMERA_ZONES = ROOMS.filter((room) => room.id !== "bano");

export function getCameraType(room: RoomBounds): CameraType {
  if (room.id === "entrada") return "doorbell";
  return room.type === "exterior" ? "bullet" : "turret";
}

/**
 * Where the Nth camera in a zone mounts, and what it looks at. Interior
 * cameras mount near the ceiling in a free corner and look across the room;
 * exterior ones mount a bit lower (implying an eave/post) and look toward
 * the middle of the yard. Extra cameras beyond the first spread out along
 * whichever wall is longest, so they don't stack on top of each other.
 */
export function getCameraSpot(room: RoomBounds, index: number): CameraSpot {
  if (room.id === "entrada") {
    return {
      mount: [-1.55 + index * 0.3, 1.2, 6.56],
      lookAt: [-1.55 + index * 0.3, 1.0, 14],
    };
  }

  const [x0, x1] = room.x;
  const [z0, z1] = room.z;
  const width = x1 - x0;
  const depth = z1 - z0;
  const isExterior = room.type === "exterior";

  const mountHeight = isExterior ? 2.2 : WALL_HEIGHT - 0.2;
  const lookHeight = isExterior ? 0.3 : 0.9;
  const cornerInset = isExterior ? 0.4 : 0.3;

  const cornerX = x1 - cornerInset;
  const cornerZ = z1 - cornerInset;
  const lookAtX = x0 + width * (isExterior ? 0.4 : 0.3);
  const lookAtZ = z0 + depth * (isExterior ? 0.4 : 0.3);

  const spreadAlongX = width >= depth;
  const step = 0.8 * index;
  const mountX = spreadAlongX ? Math.max(x0 + 0.4, cornerX - step) : cornerX;
  const mountZ = spreadAlongX ? cornerZ : Math.max(z0 + 0.4, cornerZ - step);

  return {
    mount: [mountX, mountHeight, mountZ],
    lookAt: [lookAtX, lookHeight, lookAtZ],
  };
}
