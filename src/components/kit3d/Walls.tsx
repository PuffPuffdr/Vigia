import { Box } from "@react-three/drei";
import { WALL_HEIGHT, WALL_THICKNESS, WALLS } from "./houseData";

const FLOOR_Y = 0.1;

export default function Walls() {
  return (
    <group>
      {WALLS.map((wall, index) => {
        const width = wall.axis === "x" ? wall.length : WALL_THICKNESS;
        const depth = wall.axis === "x" ? WALL_THICKNESS : wall.length;
        return (
          <Box
            key={index}
            args={[width, WALL_HEIGHT, depth]}
            position={[wall.center[0], FLOOR_Y + WALL_HEIGHT / 2, wall.center[1]]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#eef1f5" roughness={0.85} metalness={0} />
          </Box>
        );
      })}
    </group>
  );
}
