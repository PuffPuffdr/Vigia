export type ProductCategory = "camaras" | "timbres" | "sistema";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  camaras: "Cámaras",
  timbres: "Timbres",
  sistema: "Sistema",
};

export const PRODUCTS: Product[] = [
  {
    id: "g6-bullet",
    name: "G6 Bullet",
    category: "camaras",
    description:
      "Cámara exterior 4K resistente a la intemperie (IP66), visión nocturna IR de largo alcance hasta 30m, motor de IA. Ideal para vigilar el perímetro de la casa.",
    image: "/products/g6-bullet.png",
  },
  {
    id: "g6-turret",
    name: "G6 Turret",
    category: "camaras",
    description:
      "Cámara compacta 4K para interior o exterior, visión nocturna, resistente a manipulación. Discreta y potente.",
    image: "/products/g6-turret.png",
  },
  {
    id: "ai-multisensor",
    name: "AI Multisensor",
    category: "camaras",
    description:
      "Cámara de doble lente 4K que cubre dos ángulos a la vez, con motor de IA. Máxima cobertura con un solo dispositivo.",
    image: "/products/ai-multisensor.png",
  },
  {
    id: "g4-doorbell-pro",
    name: "G4 Doorbell Pro",
    category: "timbres",
    description:
      "Video-timbre premium con cámara principal y cámara de paquetes, pantalla integrada personalizable, audio bidireccional y visión nocturna.",
    image: "/products/g4-doorbell-pro.png",
  },
  {
    id: "cloudkey-plus",
    name: "CloudKey+",
    category: "sistema",
    description:
      "El cerebro del sistema: consola UniFi con disco de 1TB incluido que graba y almacena todo tu video localmente, sin cuotas mensuales.",
    image: "/products/cloudkey-plus.png",
  },
  {
    id: "superlink-gateway",
    name: "SuperLink Gateway",
    category: "sistema",
    description:
      "Amplía el alcance de tus sensores y cámaras hasta 2 km, conectando todo tu sistema de forma confiable a través de paredes y distancias.",
    image: "/products/superlink-gateway.png",
  },
];
