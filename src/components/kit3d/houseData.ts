export const WALL_HEIGHT = 2.5;
export const WALL_THICKNESS = 0.12;

export type ZoneType = "interior" | "threshold" | "exterior";

export interface RoomBounds {
  id: string;
  label: string;
  type: ZoneType;
  /** [min, max] on the X axis (world units, ~meters). */
  x: [number, number];
  /** [min, max] on the Z axis (world units, ~meters). +Z is the front/street side. */
  z: [number, number];
  floorColor: string;
}

/**
 * A full single-story Dominican family home: social wing (entrada, sala,
 * comedor, cocina) in front, a hallway leading to the private wing (3
 * bedrooms + bathroom) behind it, a carport up front, and a backyard
 * (garden, pool, patio) further back. Everything is laid out as
 * non-overlapping rectangles so walls/floors can be generated from this
 * single source of truth.
 */
export const ROOMS: RoomBounds[] = [
  // social wing
  { id: "sala", label: "Sala", type: "interior", x: [-7, -1.5], z: [0.3, 5], floorColor: "#e4e8ee" },
  { id: "comedor", label: "Comedor", type: "interior", x: [-1.5, 2.5], z: [0.3, 5], floorColor: "#e6e2d9" },
  { id: "cocina", label: "Cocina", type: "interior", x: [2.5, 7], z: [0.3, 5], floorColor: "#dfe3e7" },
  { id: "entrada", label: "Entrada", type: "threshold", x: [-2, 1], z: [5, 6.5], floorColor: "#d7dce3" },

  // private wing
  { id: "pasillo", label: "Pasillo", type: "interior", x: [-1, 1], z: [-6, 0.3], floorColor: "#dde2e9" },
  { id: "habitacion_principal", label: "Habitación principal", type: "interior", x: [-7, -1], z: [-6, -2.5], floorColor: "#e8e2d5" },
  { id: "habitacion_2", label: "Habitación 2", type: "interior", x: [-7, -1], z: [-2.5, 0.3], floorColor: "#e8e2d5" },
  { id: "habitacion_3", label: "Habitación 3", type: "interior", x: [1, 7], z: [-6, -2.8], floorColor: "#e8e2d5" },
  { id: "bano", label: "Baño", type: "interior", x: [1, 7], z: [-2.8, 0.3], floorColor: "#d3e3e8" },

  // exterior
  { id: "marquesina", label: "Marquesina", type: "exterior", x: [-7, -2], z: [5, 8.5], floorColor: "#9aa3ad" },
  { id: "jardin", label: "Jardín", type: "exterior", x: [-8, -2], z: [-12, -6], floorColor: "#5c7d52" },
  { id: "piscina", label: "Piscina", type: "exterior", x: [-2, 4], z: [-12, -6], floorColor: "#c7cdd4" },
  { id: "patio_trasero", label: "Patio trasero", type: "exterior", x: [4, 8], z: [-12, -6], floorColor: "#b7bcc2" },
];

export function getRoom(id: string): RoomBounds {
  const room = ROOMS.find((r) => r.id === id);
  if (!room) throw new Error(`Zona desconocida: ${id}`);
  return room;
}

interface WallSegment {
  axis: "x" | "z";
  /** Center point of the wall run, in world units. */
  center: [number, number];
  length: number;
}

/**
 * Every wall in the house, as straight axis-aligned runs. Doorways/open-plan
 * boundaries are represented by simply omitting a wall there (open-concept
 * sala/comedor/cocina, hallway openings) or by splitting a run into two
 * segments with a gap (bedroom/bathroom doors off the hallway, front door).
 */
export const WALLS: WallSegment[] = [
  // sala — west (exterior), front (exterior, only the part not open to entrada)
  { axis: "z", center: [-7, 2.65], length: 4.7 },
  { axis: "x", center: [-4.5, 5], length: 5 },

  // comedor — front (exterior sliver not open to entrada)
  { axis: "x", center: [1.75, 5], length: 1.5 },

  // cocina — east (exterior), front (exterior)
  { axis: "z", center: [7, 2.65], length: 4.7 },
  { axis: "x", center: [4.75, 5], length: 4.5 },

  // entrada — east (exterior), front door (two segments either side of the doorway)
  { axis: "z", center: [1, 5.75], length: 1.5 },
  { axis: "x", center: [-1.55, 6.5], length: 0.9 },
  { axis: "x", center: [0.55, 6.5], length: 0.9 },

  // pasillo — dead-end at the back of the house
  { axis: "x", center: [0, -6], length: 2 },

  // habitación principal — west, back, partition w/ habitación 2, door off the hallway
  { axis: "z", center: [-7, -4.25], length: 3.5 },
  { axis: "x", center: [-4, -6], length: 6 },
  { axis: "x", center: [-4, -2.5], length: 6 },
  { axis: "z", center: [-1, -5.425], length: 1.15 },
  { axis: "z", center: [-1, -3.075], length: 1.15 },

  // habitación 2 — west, front (shared w/ sala + comedor), door off the hallway
  { axis: "z", center: [-7, -1.1], length: 2.8 },
  { axis: "x", center: [-4, 0.3], length: 6 },
  { axis: "z", center: [-1, -2.1], length: 0.8 },
  { axis: "z", center: [-1, -0.1], length: 0.8 },

  // habitación 3 — east, back, partition w/ baño, door off the hallway
  { axis: "z", center: [7, -4.4], length: 3.2 },
  { axis: "x", center: [4, -6], length: 6 },
  { axis: "x", center: [4, -2.8], length: 6 },
  { axis: "z", center: [1, -5.5], length: 1 },
  { axis: "z", center: [1, -3.3], length: 1 },

  // baño — east, front (shared w/ comedor + cocina), door off the hallway
  { axis: "z", center: [7, -1.25], length: 3.1 },
  { axis: "x", center: [4, 0.3], length: 6 },
  { axis: "z", center: [1, -2.325], length: 0.95 },
  { axis: "z", center: [1, -0.175], length: 0.95 },
];
