"use client";

import { useMemo, useState } from "react";
import { CATEGORY_LABELS, PRODUCTS, type ProductCategory } from "@/lib/products";
import ProductCard from "./ProductCard";

type FilterValue = "todos" | ProductCategory;

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "camaras", label: CATEGORY_LABELS.camaras },
  { value: "timbres", label: CATEGORY_LABELS.timbres },
  { value: "sistema", label: CATEGORY_LABELS.sistema },
];

export default function ProductsSection() {
  const [filter, setFilter] = useState<FilterValue>("todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = filter === "todos" || product.category === filter;
      const matchesQuery = !q || product.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [filter, query]);

  return (
    <section id="productos" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 pb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Catálogo
        </span>
        <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Un ecosistema, una app, tú al control.
        </h2>
        <p className="text-balance text-text-mute">
          Cámaras, timbres y el sistema que los conecta — todo instalable en minutos, sin
          cables complicados.
        </p>
      </div>

      <div className="mb-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="glass-panel inline-flex flex-wrap justify-center gap-1 rounded-full p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={filter === f.value}
              className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ease-smooth ${
                filter === f.value
                  ? "bg-accent text-bg-deep"
                  : "text-text-mute hover:text-text"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="glass-panel flex w-full items-center gap-2 rounded-full px-4 py-2.5 sm:w-72">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar producto…"
            aria-label="Buscar producto"
            className="w-full bg-transparent text-sm text-text placeholder:text-text-mute focus:outline-none"
          />
        </label>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-text-mute">
          No encontramos productos que coincidan con &ldquo;{query}&rdquo;.
        </p>
      )}
    </section>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-text-mute"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
