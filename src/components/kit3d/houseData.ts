export const WALL_HEIGHT = 2.4;
export const WALL_THICKNESS = 0.12;

export type ZoneType = "interior" | "threshold" | "exterior";

export interface RoomBounds {
  id: string;
  label: string;
  type: ZoneType;
  /** [min, max] on the X axis (world units, ~meters). */
  x: [number, number];
  /** [min, max] on the Z axis (world units, ~meters). */
  z: [number, number];
  floorColor: string;
}

/** The 8 zones the kit builder recommends cameras for — shared with the 2D "Arma tu kit" section. */
export const ROOMS: RoomBounds[] = [
  { id: "sala", label: "Sala", type: "interior", x: [-6, -1], z: [-4.5, -0.3], floorColor: "#e4e8ee" },
  { id: "habitacion", label: "Habitación", type: "interior", x: [-6, -1], z: [-0.3, 2.5], floorColor: "#e4e8ee" },
  { id: "cocina", label: "Cocina", type: "interior", x: [1, 6], z: [-4.5, 2.5], floorColor: "#e4e8ee" },
  { id: "pasillo", label: "Pasillo", type: "interior", x: [-1, 1], z: [-4.5, 2.5], floorColor: "#dde2e9" },
  { id: "entrada", label: "Entrada", type: "threshold", x: [-1.5, 1.5], z: [2.5, 4.5], floorColor: "#d7dce3" },
  { id: "marquesina", label: "Marquesina", type: "exterior", x: [-6, -1.5], z: [2.5, 5.5], floorColor: "#9aa3ad" },
  { id: "patio", label: "Patio", type: "exterior", x: [-6, 0], z: [-8, -4.5], floorColor: "#5c7d52" },
  { id: "piscina", label: "Piscina", type: "exterior", x: [0, 6], z: [-8, -4.5], floorColor: "#c7cdd4" },
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
 * Every wall in the house, as straight axis-aligned runs. Openings between
 * rooms are represented by simply omitting a wall there (or splitting a run
 * into two segments with a gap) rather than by boolean-cutting geometry.
 */
export const WALLS: WallSegment[] = [
  // sala
  { axis: "z", center: [-6, -2.4], length: 4.2 }, // west (exterior)
  { axis: "x", center: [-3.5, -4.5], length: 5 }, // south (exterior)
  { axis: "x", center: [-3.5, -0.3], length: 5 }, // north (partition w/ habitación)
  { axis: "z", center: [-1, -3.725], length: 1.55 }, // east, door segment A
  { axis: "z", center: [-1, -1.075], length: 1.55 }, // east, door segment B

  // habitación
  { axis: "z", center: [-6, 1.1], length: 2.8 }, // west (exterior)
  { axis: "x", center: [-3.5, 2.5], length: 5 }, // north (exterior)
  { axis: "z", center: [-1, 0.125], length: 0.85 }, // east, door segment A
  { axis: "z", center: [-1, 2.075], length: 0.85 }, // east, door segment B

  // cocina
  { axis: "z", center: [1, -3.025], length: 2.95 }, // west, door segment A
  { axis: "z", center: [1, 1.025], length: 2.95 }, // west, door segment B
  { axis: "x", center: [3.5, -4.5], length: 5 }, // south (exterior)
  { axis: "z", center: [6, -1], length: 7 }, // east (exterior)
  { axis: "x", center: [3.5, 2.5], length: 5 }, // north (exterior)

  // pasillo
  { axis: "x", center: [0, -4.5], length: 2 }, // north dead-end

  // entrada
  { axis: "x", center: [-1.25, 2.5], length: 0.5 }, // north stub A
  { axis: "x", center: [1.25, 2.5], length: 0.5 }, // north stub B
  { axis: "z", center: [1.5, 3.5], length: 2 }, // east (exterior)
  { axis: "x", center: [-1.025, 4.5], length: 0.95 }, // south (front door), segment A
  { axis: "x", center: [1.025, 4.5], length: 0.95 }, // south (front door), segment B
  // west stays fully open — the covered walkway from the marquesina
];
