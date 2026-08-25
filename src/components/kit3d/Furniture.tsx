import { Box, Cylinder, Sphere } from "@react-three/drei";

const FABRIC = "#8a93a3";
const WOOD = "#7a5f45";
const LIGHT = "#eef1f5";
const ACCENT = "#6ee7ff";
const DARK = "#232a36";
const GLASS = "#12151b";

export default function Furniture() {
  return (
    <group>
      <SalaFurniture />
      <CocinaFurniture />
      <HabitacionFurniture />
      <Car position={[-3.75, 0, 4]} />
      <PoolLoungers />
      <PatioTree position={[-4.5, 0, -6.5]} />
    </group>
  );
}

function SalaFurniture() {
  return (
    <group>
      {/* sofa, against the west wall */}
      <group position={[-5.4, 0, -2.4]}>
        <Box args={[0.9, 0.42, 2.2]} position={[0, 0.21, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
        <Box args={[0.18, 0.4, 2.2]} position={[-0.36, 0.62, 0]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
        <Box args={[0.9, 0.22, 0.18]} position={[0, 0.53, -1.01]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
        <Box args={[0.9, 0.22, 0.18]} position={[0, 0.53, 1.01]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
      </group>

      {/* coffee table */}
      <group position={[-4.3, 0, -2.4]}>
        <Box args={[1.0, 0.06, 0.9]} position={[0, 0.34, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={WOOD} roughness={0.5} />
        </Box>
        {[
          [-0.42, -0.37],
          [0.42, -0.37],
          [-0.42, 0.37],
          [0.42, 0.37],
        ].map(([x, z], i) => (
          <Cylinder key={i} args={[0.025, 0.025, 0.32, 8]} position={[x, 0.16, z]}>
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </Cylinder>
        ))}
      </group>
    </group>
  );
}

function CocinaFurniture() {
  return (
    <group>
      {/* counter run along the east wall */}
      <Box args={[0.6, 0.9, 4]} position={[5.55, 0.45, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={LIGHT} roughness={0.4} />
      </Box>
      {/* counter run along the north wall, closing the corner */}
      <Box args={[2, 0.9, 0.6]} position={[4.5, 0.45, 2.2]} castShadow receiveShadow>
        <meshStandardMaterial color={LIGHT} roughness={0.4} />
      </Box>

      {/* dining table */}
      <group position={[2.3, 0, 0]}>
        <Box args={[1.4, 0.06, 1.6]} position={[0, 0.42, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={WOOD} roughness={0.5} />
        </Box>
        {[
          [-0.6, -0.7],
          [0.6, -0.7],
          [-0.6, 0.7],
          [0.6, 0.7],
        ].map(([x, z], i) => (
          <Cylinder key={i} args={[0.03, 0.03, 0.4, 8]} position={[x, 0.2, z]}>
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </Cylinder>
        ))}
        <Box args={[0.4, 0.45, 0.4]} position={[-0.95, 0.225, -0.7]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.8} />
        </Box>
        <Box args={[0.4, 0.45, 0.4]} position={[-0.95, 0.225, 0.7]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.8} />
        </Box>
      </group>
    </group>
  );
}

function HabitacionFurniture() {
  return (
    <group>
      {/* bed, against the west wall */}
      <group position={[-5.1, 0, 1.1]}>
        <Box args={[1.6, 0.3, 2]} position={[0, 0.15, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={WOOD} roughness={0.7} />
        </Box>
        <Box args={[1.48, 0.2, 1.9]} position={[0, 0.4, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={LIGHT} roughness={0.9} />
        </Box>
        <Box args={[1.4, 0.14, 0.4]} position={[0, 0.53, -0.75]} castShadow>
          <meshStandardMaterial color={ACCENT} roughness={0.6} />
        </Box>
      </group>

      {/* nightstand */}
      <Box args={[0.42, 0.4, 0.42]} position={[-4.4, 0.2, 0.3]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </Box>
    </group>
  );
}

function Car({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Box args={[3.6, 0.5, 1.7]} position={[0, 0.35, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2b3340" roughness={0.35} metalness={0.4} />
      </Box>
      <Box args={[1.8, 0.4, 1.5]} position={[-0.15, 0.8, 0]} castShadow>
        <meshStandardMaterial color={GLASS} roughness={0.2} metalness={0.5} />
      </Box>
      {[
        [-1.4, -0.75],
        [1.4, -0.75],
        [-1.4, 0.75],
        [1.4, 0.75],
      ].map(([x, z], i) => (
        <Cylinder key={i} args={[0.28, 0.28, 0.22, 16]} position={[x, 0.28, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <meshStandardMaterial color="#111318" roughness={0.7} />
        </Cylinder>
      ))}
    </group>
  );
}

function PoolLoungers() {
  const chairs: [number, number][] = [
    [5.3, -5.5],
    [5.3, -7.0],
  ];
  return (
    <group>
      {chairs.map(([x, z], i) => (
        <Box key={i} args={[0.6, 0.1, 1.8]} position={[x, 0.15, z]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={LIGHT} roughness={0.7} />
        </Box>
      ))}
    </group>
  );
}

function PatioTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Cylinder args={[0.14, 0.18, 1.4, 10]} position={[0, 0.7, 0]} castShadow>
        <meshStandardMaterial color="#5a4632" roughness={0.9} />
      </Cylinder>
      <Sphere args={[0.9, 12, 12]} position={[0, 1.9, 0]} castShadow>
        <meshStandardMaterial color="#4c8a5c" roughness={0.8} />
      </Sphere>
    </group>
  );
}
