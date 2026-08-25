"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartCount, useCartStore } from "@/lib/store/useCartStore";

const NAV_LINKS = [
  { label: "Productos", href: "#productos" },
  { label: "Arma tu kit", href: "#kit" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Confianza", href: "#confianza" },
  { label: "Preguntas", href: "#faq" },
];

export default function GlassNav() {
  const [open, setOpen] = useState(false);
  const cartCount = useCartCount();
  const openCart = useCartStore((state) => state.openCart);

  return (
    <header className="sticky top-0 z-50 glass-nav">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-text">
          VIGÍA
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-text-mute transition-colors duration-300 hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Carrito de compras${cartCount > 0 ? `, ${cartCount} producto${cartCount === 1 ? "" : "s"}` : ""}`}
            className="glass-panel relative flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors duration-300 hover:bg-white/[0.1]"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 font-mono text-[11px] font-medium text-bg-deep">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="glass-panel flex h-10 w-10 items-center justify-center rounded-full text-text transition-colors duration-300 hover:bg-white/[0.1] md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-panel mx-4 mb-4 rounded-xl2 md:hidden">
          <ul className="flex flex-col p-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm text-text-mute transition-colors duration-300 hover:bg-white/[0.06] hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        <path d="M3 6h18M3 12h18M3 18h18" />
      )}
    </svg>
  );
}
