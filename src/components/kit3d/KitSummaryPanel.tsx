"use client";

import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { CAMERA_ZONES, getCameraType, type CameraType } from "./cameraSpots";
import { useKit3DStore } from "./useKit3DStore";

const TYPE_TO_PRODUCT_ID: Record<CameraType, string> = {
  bullet: "g6-bullet",
  turret: "g6-turret",
  doorbell: "g4-doorbell-pro",
};

const CLOUDKEY_ID = "cloudkey-plus";

function findProduct(id: string) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) throw new Error(`Producto no encontrado en el catálogo: ${id}`);
  return product;
}

export default function KitSummaryPanel() {
  const cameraCounts = useKit3DStore((state) => state.cameraCounts);
  const isNightMode = useKit3DStore((state) => state.isNightMode);
  const toggleNightMode = useKit3DStore((state) => state.toggleNightMode);

  const coveredZones = CAMERA_ZONES.filter((room) => (cameraCounts[room.id] ?? 0) > 0);
  const coveragePct = Math.round((coveredZones.length / CAMERA_ZONES.length) * 100);

  const quantities = new Map<string, number>();
  for (const room of CAMERA_ZONES) {
    const count = cameraCounts[room.id] ?? 0;
    if (count === 0) continue;
    const productId = TYPE_TO_PRODUCT_ID[getCameraType(room)];
    quantities.set(productId, (quantities.get(productId) ?? 0) + count);
  }

  const includesCloudKey = quantities.size > 0;
  if (includesCloudKey) {
    quantities.set(CLOUDKEY_ID, (quantities.get(CLOUDKEY_ID) ?? 0) + 1);
  }

  const lines = Array.from(quantities.entries()).map(([productId, quantity]) => ({
    product: findProduct(productId),
    quantity,
  }));

  return (
    <div className="glass-panel flex flex-col gap-5 rounded-xl3 p-6 lg:sticky lg:top-24">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Cobertura
          </span>
          <span className="font-display text-sm font-semibold text-text">{coveragePct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500 ease-smooth"
            style={{ width: `${coveragePct}%` }}
          />
        </div>
        <p className="text-xs text-text-mute">
          {coveredZones.length} de {CAMERA_ZONES.length} zonas con al menos una cámara.
        </p>
      </div>

      <button
        type="button"
        onClick={toggleNightMode}
        aria-pressed={isNightMode}
        className={`flex items-center justify-between rounded-xl2 border px-4 py-3 text-sm transition-colors duration-300 ${
          isNightMode
            ? "border-accent/50 bg-accent/10 text-text"
            : "border-glass-brd text-text-mute hover:text-text"
        }`}
      >
        <span className="flex items-center gap-2">
          <MoonIcon />
          Visión nocturna
        </span>
        <span
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-300 ${
            isNightMode ? "bg-accent" : "bg-white/20"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-bg-deep transition-transform duration-300 ${
              isNightMode ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>

      <div className="flex flex-col gap-3">
        <h3 className="font-display text-lg font-semibold text-text">Tu kit</h3>

        {lines.length > 0 ? (
          <>
            <ul className="flex flex-col gap-3">
              {lines.map((line) => (
                <li key={line.product.id} className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent">
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      sizes="44px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <span className="flex-1 text-sm text-text">{line.product.name}</span>
                  <span className="font-mono text-sm text-text-mute">×{line.quantity}</span>
                </li>
              ))}
            </ul>

            {includesCloudKey && (
              <p className="rounded-xl2 border border-glass-brd bg-white/[0.03] p-3 text-xs leading-relaxed text-text-mute">
                Incluimos el <span className="text-text">CloudKey+</span> porque es el equipo
                que graba y guarda todo tu video localmente — es necesario para que el sistema
                funcione.
              </p>
            )}
          </>
        ) : (
          <p className="text-sm text-text-mute">
            Toca el <span className="text-text">+</span> sobre cualquier zona de la casa para
            empezar a armar tu kit.
          </p>
        )}
      </div>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.5A9 9 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5Z" />
    </svg>
  );
}
