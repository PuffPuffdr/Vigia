import { Box } from "@react-three/drei";
import { ROOMS } from "./houseData";

const SLAB_HEIGHT = 0.1;

export default function RoomFloors() {
  return (
    <group>
      {ROOMS.map((room) => {
        const width = room.x[1] - room.x[0];
        const depth = room.z[1] - room.z[0];
        const centerX = (room.x[0] + room.x[1]) / 2;
        const centerZ = (room.z[0] + room.z[1]) / 2;

        return (
          <group key={room.id}>
            <Box
              args={[width, SLAB_HEIGHT, depth]}
              position={[centerX, SLAB_HEIGHT / 2, centerZ]}
              receiveShadow
            >
              <meshStandardMaterial color={room.floorColor} roughness={0.9} metalness={0} />
            </Box>

            {room.id === "piscina" && (
              <Box
                args={[width * 0.7, 0.04, depth * 0.55]}
                position={[centerX, SLAB_HEIGHT - 0.06, centerZ]}
              >
                <meshStandardMaterial
                  color="#2fa8d6"
                  roughness={0.15}
                  metalness={0.1}
                  emissive="#1c7a9c"
                  emissiveIntensity={0.35}
                />
              </Box>
            )}
          </group>
        );
      })}
    </group>
  );
}
