import { Box, Cylinder, Sphere } from "@react-three/drei";

const FABRIC = "#8a93a3";
const WOOD = "#7a5f45";
const LIGHT = "#eef1f5";
const ACCENT = "#6ee7ff";
const DARK = "#232a36";
const GLASS = "#12151b";
const STEEL = "#b7bec8";
const CERAMIC = "#f4f6f9";

export default function Furniture() {
  return (
    <group>
      <SalaFurniture />
      <ComedorFurniture />
      <CocinaFurniture />
      <HabitacionPrincipalFurniture />
      <HabitacionSecundariaFurniture x={-6} z={-1.1} />
      <HabitacionSecundariaFurniture x={6} z={-4.4} mirrored />
      <BanoFurniture />
      <Car position={[-4.5, 0, 6.75]} />
      <PoolLoungers />
      <GardenProps />
      <PatioSet />
    </group>
  );
}

function SalaFurniture() {
  return (
    <group>
      {/* sofa, against the west wall */}
      <group position={[-6.3, 0, 2.65]}>
        <Box args={[0.9, 0.42, 2.4]} position={[0, 0.21, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
        <Box args={[0.18, 0.4, 2.4]} position={[-0.36, 0.62, 0]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
        <Box args={[0.9, 0.22, 0.18]} position={[0, 0.53, -1.11]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
        <Box args={[0.9, 0.22, 0.18]} position={[0, 0.53, 1.11]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.9} />
        </Box>
      </group>

      {/* coffee table */}
      <group position={[-4.85, 0, 2.65]}>
        <Box args={[1.0, 0.06, 1.0]} position={[0, 0.34, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={WOOD} roughness={0.5} />
        </Box>
        {[
          [-0.42, -0.42],
          [0.42, -0.42],
          [-0.42, 0.42],
          [0.42, 0.42],
        ].map(([x, z], i) => (
          <Cylinder key={i} args={[0.025, 0.025, 0.32, 8]} position={[x, 0.16, z]}>
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </Cylinder>
        ))}
      </group>

      {/* TV console + screen, against the front wall */}
      <group position={[-4, 0, 4.85]}>
        <Box args={[1.4, 0.4, 0.4]} position={[0, 0.2, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={DARK} roughness={0.6} />
        </Box>
        <Box args={[1.3, 0.7, 0.06]} position={[0, 0.75, 0]} castShadow>
          <meshStandardMaterial color={GLASS} roughness={0.2} emissive={ACCENT} emissiveIntensity={0.15} />
        </Box>
      </group>
    </group>
  );
}

function ComedorFurniture() {
  return (
    <group position={[0.5, 0, 2.65]}>
      <Box args={[1.6, 0.06, 2.0]} position={[0, 0.42, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.5} />
      </Box>
      {[
        [-0.65, -0.85],
        [0.65, -0.85],
        [-0.65, 0.85],
        [0.65, 0.85],
      ].map(([x, z], i) => (
        <Cylinder key={i} args={[0.03, 0.03, 0.4, 8]} position={[x, 0.2, z]}>
          <meshStandardMaterial color={DARK} roughness={0.6} />
        </Cylinder>
      ))}
      {[
        [0, -1.35],
        [0, 1.35],
        [-1.05, 0],
        [1.05, 0],
      ].map(([x, z], i) => (
        <Box key={i} args={[0.4, 0.45, 0.4]} position={[x, 0.225, z]} castShadow>
          <meshStandardMaterial color={FABRIC} roughness={0.8} />
        </Box>
      ))}
    </group>
  );
}

function CocinaFurniture() {
  return (
    <group>
      {/* counter along the east wall */}
      <Box args={[0.6, 0.9, 4]} position={[6.65, 0.45, 2.65]} castShadow receiveShadow>
        <meshStandardMaterial color={LIGHT} roughness={0.4} />
      </Box>
      {/* counter run closing the corner against the front wall */}
      <Box args={[2, 0.9, 0.6]} position={[5.5, 0.45, 4.65]} castShadow receiveShadow>
        <meshStandardMaterial color={LIGHT} roughness={0.4} />
      </Box>
      {/* refrigerator */}
      <Box args={[0.7, 1.7, 0.7]} position={[6.5, 0.85, 0.9]} castShadow receiveShadow>
        <meshStandardMaterial color={STEEL} roughness={0.35} metalness={0.5} />
      </Box>
    </group>
  );
}

function Bed({
  size = "large",
}: {
  size?: "large" | "small";
}) {
  const dims = size === "large" ? { frame: [1.9, 0.3, 2.2], mattress: [1.78, 0.2, 2.1], pillow: [1.7, 0.14, 0.5] } : { frame: [1.5, 0.28, 1.9], mattress: [1.4, 0.18, 1.8], pillow: [1.3, 0.12, 0.4] };
  const pillowOffset = size === "large" ? 0.8 : 0.7;

  return (
    <group>
      <Box args={dims.frame as [number, number, number]} position={[0, 0.15, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </Box>
      <Box args={dims.mattress as [number, number, number]} position={[0, 0.4, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={LIGHT} roughness={0.9} />
      </Box>
      <Box args={dims.pillow as [number, number, number]} position={[0, 0.53, -pillowOffset]} castShadow>
        <meshStandardMaterial color={ACCENT} roughness={0.6} />
      </Box>
    </group>
  );
}

function HabitacionPrincipalFurniture() {
  return (
    <group>
      <group position={[-5.8, 0, -4.25]}>
        <Bed size="large" />
      </group>
      <Box args={[0.4, 0.4, 0.4]} position={[-5.8, 0.2, -5.55]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </Box>
      <Box args={[0.4, 0.4, 0.4]} position={[-5.8, 0.2, -2.95]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </Box>
    </group>
  );
}

function HabitacionSecundariaFurniture({ x, z, mirrored = false }: { x: number; z: number; mirrored?: boolean }) {
  const nightstandZ = mirrored ? z + 1.0 : z - 1.0;
  return (
    <group>
      <group position={[x, 0, z]} rotation={[0, mirrored ? Math.PI : 0, 0]}>
        <Bed size="small" />
      </group>
      <Box args={[0.35, 0.35, 0.35]} position={[x, 0.175, nightstandZ]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD} roughness={0.7} />
      </Box>
    </group>
  );
}

function BanoFurniture() {
  return (
    <group>
      {/* toilet */}
      <group position={[1.3, 0, -2.4]}>
        <Box args={[0.4, 0.35, 0.5]} position={[0, 0.175, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={CERAMIC} roughness={0.3} />
        </Box>
        <Box args={[0.4, 0.2, 0.12]} position={[0, 0.45, -0.19]} castShadow>
          <meshStandardMaterial color={CERAMIC} roughness={0.3} />
        </Box>
      </group>

      {/* sink */}
      <group position={[1.3, 0, -1.3]}>
        <Cylinder args={[0.12, 0.12, 0.75, 12]} position={[0, 0.375, 0]} castShadow>
          <meshStandardMaterial color={CERAMIC} roughness={0.3} />
        </Cylinder>
        <Box args={[0.5, 0.15, 0.4]} position={[0, 0.82, 0]} castShadow receiveShadow>
          <meshStandardMaterial color={CERAMIC} roughness={0.3} />
        </Box>
      </group>

      {/* mirror, wall-mounted above the sink */}
      <Box args={[0.03, 0.6, 0.5]} position={[1.15, 1.3, -1.3]} castShadow>
        <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.6} />
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
    [-1, -6.7],
    [2, -6.7],
  ];
  return (
    <group>
      {chairs.map(([x, z], i) => (
        <Box key={i} args={[0.6, 0.1, 1.8]} position={[x, 0.15, z]} castShadow receiveShadow>
          <meshStandardMaterial color={LIGHT} roughness={0.7} />
        </Box>
      ))}
    </group>
  );
}

function GardenProps() {
  return (
    <group>
      <Tree position={[-6.5, 0, -10.5]} />
      <Tree position={[-3.5, 0, -7.5]} />
      <Bush position={[-6, 0, -7.5]} />
      <Bush position={[-3.8, 0, -10.2]} />
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
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

function Bush({ position }: { position: [number, number, number] }) {
  return (
    <Sphere args={[0.5, 10, 10]} position={[position[0], 0.4, position[2]]} castShadow receiveShadow>
      <meshStandardMaterial color="#4a7a4f" roughness={0.85} />
    </Sphere>
  );
}

function PatioSet() {
  return (
    <group position={[6, 0, -9]}>
      <Cylinder args={[0.7, 0.7, 0.06, 20]} position={[0, 0.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={STEEL} roughness={0.4} metalness={0.3} />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.5, 10]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color={DARK} roughness={0.6} />
      </Cylinder>
      <Box args={[0.4, 0.45, 0.4]} position={[-1.1, 0.225, 0]} castShadow>
        <meshStandardMaterial color={FABRIC} roughness={0.8} />
      </Box>
      <Box args={[0.4, 0.45, 0.4]} position={[1.1, 0.225, 0]} castShadow>
        <meshStandardMaterial color={FABRIC} roughness={0.8} />
      </Box>
    </group>
  );
}
