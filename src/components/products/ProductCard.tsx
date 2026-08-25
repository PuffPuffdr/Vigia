"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store/useCartStore";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="glass-panel group flex flex-col overflow-hidden rounded-xl3 transition-all duration-300 ease-smooth hover:border-white/20 hover:-translate-y-1">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent">
        <div className="absolute inset-10 rounded-full bg-white/[0.06] blur-2xl" aria-hidden="true" />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-8 transition-transform duration-500 ease-smooth group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-lg font-semibold text-text">{product.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-text-mute">{product.description}</p>
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="font-mono text-xs uppercase tracking-wider text-text-mute">
            Consultar precio
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
