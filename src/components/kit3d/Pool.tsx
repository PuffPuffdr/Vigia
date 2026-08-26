import { Box } from "@react-three/drei";
import { getRoom } from "./houseData";

const DECK_Y = 0.1;

// Sized so the outer coping ring lands exactly where the old water inset used
// to sit — keeps it clear of the loungers already placed near the front edge
// of the piscina zone (see Furniture.tsx).
const COPING_WIDTH_FACTOR = 0.7;
const COPING_DEPTH_FACTOR = 0.55;
const WATER_WIDTH_FACTOR = 0.52;
const WATER_DEPTH_FACTOR = 0.4;

export default function Pool() {
  const room = getRoom("piscina");
  const width = room.x[1] - room.x[0];
  const depth = room.z[1] - room.z[0];
  const centerX = (room.x[0] + room.x[1]) / 2;
  const centerZ = (room.z[0] + room.z[1]) / 2;

  return (
    <group position={[centerX, 0, centerZ]}>
      {/* coping — light concrete rim around the water, flush with the deck */}
      <Box
        args={[width * COPING_WIDTH_FACTOR, 0.05, depth * COPING_DEPTH_FACTOR]}
        position={[0, DECK_Y - 0.005, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#eef1f5" roughness={0.75} />
      </Box>

      {/* basin — sunken below deck level, dark teal walls/floor */}
      <Box
        args={[width * WATER_WIDTH_FACTOR, 0.16, depth * WATER_DEPTH_FACTOR]}
        position={[0, DECK_Y - 0.09, 0]}
      >
        <meshStandardMaterial color="#155b73" roughness={0.6} />
      </Box>

      {/* water surface, recessed slightly below the coping's top edge */}
      <Box
        args={[width * WATER_WIDTH_FACTOR - 0.04, 0.04, depth * WATER_DEPTH_FACTOR - 0.04]}
        position={[0, DECK_Y - 0.04, 0]}
      >
        <meshPhysicalMaterial
          color="#3ea8d6"
          roughness={0.08}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.86}
          emissive="#1c7a9c"
          emissiveIntensity={0.25}
        />
      </Box>
    </group>
  );
}
