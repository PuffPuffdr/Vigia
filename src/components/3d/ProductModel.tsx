"use client";

import { RoundedBox, useGLTF } from "@react-three/drei";

export type ProductKind = "doorbell" | "generic";

interface ProductModelProps {
  kind?: ProductKind;
  /** Future OEM swap point: when set, loads the real .glb instead of the conceptual geometry. */
  modelUrl?: string;
  accent?: string;
}

export default function ProductModel({
  kind = "doorbell",
  modelUrl,
  accent = "#6EE7FF",
}: ProductModelProps) {
  if (modelUrl) {
    return <GltfModel url={modelUrl} />;
  }

  return kind === "doorbell" ? (
    <DoorbellGeometry accent={accent} />
  ) : (
    <GenericGeometry accent={accent} />
  );
}

function GltfModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

/**
 * Conceptual geometry for the "Centinela" video-doorbell line, modeled after
 * the UniFi G4 Doorbell Pro reference: tall white body, large ringed lens,
 * IR/PIR sensor trio, and a full 360° accent-lit button.
 */
function DoorbellGeometry({ accent }: { accent: string }) {
  const white = "#f2f4f8";
  const dark = "#181b21";

  const bodyWidth = 0.62;
  const bodyHeight = 1.9;
  const bodyDepth = 0.26;
  const front = bodyDepth / 2;

  const lensY = 0.55;
  const sensorY = 0.27;
  const buttonY = -0.05;
  const screenY = -0.45;
  const slitY = -0.64;
  const feetY = -0.82;

  return (
    <group>
      {/* tall white body, very rounded corners, glossy premium plastic */}
      <RoundedBox
        args={[bodyWidth, bodyHeight, bodyDepth]}
        radius={0.11}
        smoothness={6}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={white}
          roughness={0.22}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>

      {/* camera lens: dark glass circle inside a white ring, with a reflection */}
      <group position={[0, lensY, front]}>
        <mesh position={[0, 0, 0.006]}>
          <torusGeometry args={[0.155, 0.028, 20, 48]} />
          <meshPhysicalMaterial color={white} roughness={0.25} clearcoat={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.016]}>
          <circleGeometry args={[0.125, 40]} />
          <meshPhysicalMaterial
            color="#12151b"
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh position={[-0.015, -0.01, 0.026]}>
          <circleGeometry args={[0.05, 32]} />
          <meshStandardMaterial color="#05070a" roughness={0.3} />
        </mesh>
        <mesh position={[-0.045, 0.05, 0.028]}>
          <circleGeometry args={[0.016, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>
      </group>

      {/* IR / PIR sensor trio below the lens */}
      <group position={[0, sensorY, front + 0.004]}>
        <mesh position={[-0.1, 0, 0]} scale={[1, 1.3, 1]}>
          <circleGeometry args={[0.026, 20]} />
          <meshStandardMaterial color={dark} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[0.05, 0.024]} />
          <meshStandardMaterial color={dark} roughness={0.4} />
        </mesh>
        <mesh position={[0.1, 0, 0]} scale={[1, 1.3, 1]}>
          <circleGeometry args={[0.026, 20]} />
          <meshStandardMaterial color={dark} roughness={0.4} />
        </mesh>
      </group>

      {/* doorbell button: the icon detail — a full 360° accent light ring */}
      <group position={[0, buttonY, front]}>
        <mesh position={[0, 0, 0.004]}>
          <torusGeometry args={[0.14, 0.02, 20, 48]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0, 0.012]}>
          <circleGeometry args={[0.12, 36]} />
          <meshPhysicalMaterial color="#e8ecf2" roughness={0.3} clearcoat={0.7} />
        </mesh>
      </group>

      {/* small status screen */}
      <RoundedBox
        args={[0.26, 0.22, 0.02]}
        radius={0.008}
        smoothness={4}
        position={[0, screenY, front + 0.006]}
      >
        <meshPhysicalMaterial
          color="#080a10"
          roughness={0.3}
          emissive="#A78BFA"
          emissiveIntensity={0.25}
        />
      </RoundedBox>

      {/* speaker slit */}
      <RoundedBox
        args={[0.14, 0.018, 0.02]}
        radius={0.007}
        smoothness={4}
        position={[0, slitY, front + 0.006]}
      >
        <meshStandardMaterial color={dark} roughness={0.4} />
      </RoundedBox>

      {/* bottom mounting details */}
      <group position={[0, feetY, front + 0.003]}>
        <mesh position={[-0.09, 0, 0]}>
          <planeGeometry args={[0.06, 0.05]} />
          <meshStandardMaterial color="#d9dde3" roughness={0.5} />
        </mesh>
        <mesh position={[0.09, 0, 0]}>
          <planeGeometry args={[0.06, 0.05]} />
          <meshStandardMaterial color="#d9dde3" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function GenericGeometry({ accent }: { accent: string }) {
  return (
    <mesh castShadow receiveShadow>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshPhysicalMaterial
        color="#1b2430"
        roughness={0.3}
        metalness={0.5}
        emissive={accent}
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}
