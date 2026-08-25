"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/lib/store/useCartStore";

type ZoneGroup = "entrada" | "exterior" | "interior";

interface Zone {
  id: string;
  label: string;
  group: ZoneGroup;
  productId: string;
}

const ZONES: Zone[] = [
  { id: "entrada", label: "Entrada / Puerta principal", group: "entrada", productId: "g4-doorbell-pro" },
  { id: "marquesina", label: "Marquesina / Garaje", group: "exterior", productId: "g6-bullet" },
  { id: "patio", label: "Patio / Jardín", group: "exterior", productId: "g6-bullet" },
  { id: "piscina", label: "Piscina", group: "exterior", productId: "g6-bullet" },
  { id: "sala", label: "Sala", group: "interior", productId: "g6-turret" },
  { id: "cocina", label: "Cocina", group: "interior", productId: "g6-turret" },
  { id: "pasillo", label: "Pasillo / Recibidor", group: "interior", productId: "g6-turret" },
  { id: "habitacion", label: "Habitación", group: "interior", productId: "g6-turret" },
];

const CLOUDKEY_ID = "cloudkey-plus";

const GROUP_ICON: Record<ZoneGroup, () => JSX.Element> = {
  entrada: DoorIcon,
  exterior: OutdoorIcon,
  interior: RoomIcon,
};

function findProduct(id: string) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) throw new Error(`Producto no encontrado en el catálogo: ${id}`);
  return product;
}

export default function KitBuilderSection() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const addItem = useCartStore((state) => state.addItem);
  const openReservation = useCartStore((state) => state.openReservation);

  function setCount(zoneId: string, next: number) {
    setCounts((prev) => ({ ...prev, [zoneId]: Math.max(0, next) }));
  }

  const zoneCount = Object.values(counts).reduce((sum, n) => sum + n, 0);

  const kitItems = useMemo(() => {
    const quantities = new Map<string, number>();

    for (const zone of ZONES) {
      const qty = counts[zone.id] ?? 0;
      if (qty > 0) {
        quantities.set(zone.productId, (quantities.get(zone.productId) ?? 0) + qty);
      }
    }

    const includesCloudKey = quantities.size > 0;
    if (includesCloudKey) {
      quantities.set(CLOUDKEY_ID, (quantities.get(CLOUDKEY_ID) ?? 0) + 1);
    }

    return {
      lines: Array.from(quantities.entries()).map(([productId, quantity]) => ({
        product: findProduct(productId),
        quantity,
      })),
      includesCloudKey,
    };
  }, [counts]);

  function handleRequestQuote() {
    for (const line of kitItems.lines) {
      for (let i = 0; i < line.quantity; i++) addItem(line.product);
    }
    openReservation();
  }

  return (
    <section id="kit" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 pb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Arma tu kit
        </span>
        <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Dinos qué quieres vigilar, nosotros armamos el combo.
        </h2>
        <p className="text-balance text-text-mute">
          Elige las zonas de tu casa y te armamos el kit correcto — incluyendo lo que casi
          todos olvidan: el equipo que graba y guarda tu video.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        <ul className="flex flex-col gap-3">
          {ZONES.map((zone) => {
            const count = counts[zone.id] ?? 0;
            const product = findProduct(zone.productId);
            const Icon = GROUP_ICON[zone.group];
            return (
              <li
                key={zone.id}
                className="glass-panel flex items-center gap-4 rounded-xl2 p-4 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm font-semibold text-text sm:text-base">
                    {zone.label}
                  </p>
                  <p className="text-xs text-text-mute sm:text-sm">
                    Recomendamos: {product.name}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setCount(zone.id, count - 1)}
                    disabled={count === 0}
                    aria-label={`Quitar ${zone.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-brd text-text transition-colors duration-300 hover:bg-white/[0.1] disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <MinusIcon />
                  </button>
                  <span className="w-4 text-center text-sm text-text">{count}</span>
                  <button
                    type="button"
                    onClick={() => setCount(zone.id, count + 1)}
                    aria-label={`Agregar ${zone.label}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-brd text-text transition-colors duration-300 hover:bg-white/[0.1]"
                  >
                    <PlusIcon />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="glass-panel flex flex-col gap-5 rounded-xl3 p-6 lg:sticky lg:top-24">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
              <KitIcon />
            </span>
            <h3 className="font-display text-lg font-semibold text-text">Tu kit</h3>
          </div>

          {kitItems.lines.length > 0 ? (
            <>
              <ul className="flex flex-col gap-3">
                {kitItems.lines.map((line) => (
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

              {kitItems.includesCloudKey && (
                <p className="rounded-xl2 border border-glass-brd bg-white/[0.03] p-3 text-xs leading-relaxed text-text-mute">
                  Incluimos el <span className="text-text">CloudKey+</span> porque es el equipo
                  que graba y guarda todo tu video localmente — es necesario para que el
                  sistema funcione.
                </p>
              )}

              <button type="button" onClick={handleRequestQuote} className="btn-primary w-full">
                Solicitar cotización de mi kit
              </button>
            </>
          ) : (
            <p className="text-sm text-text-mute">
              Selecciona al menos una zona a la izquierda para empezar a armar tu kit.
            </p>
          )}

          {zoneCount > 0 && (
            <p className="text-center text-xs text-text-mute">
              {zoneCount} {zoneCount === 1 ? "zona seleccionada" : "zonas seleccionadas"}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21V4a1 1 0 0 1 1-1h9l4 4v14" />
      <path d="M5 21h14" />
      <circle cx="14.5" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function OutdoorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

function RoomIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 11 9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

function KitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
