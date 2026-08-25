"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/lib/store/useCartStore";
import { useLockBodyScroll } from "@/lib/hooks/useLockBodyScroll";
import { useEscapeKey } from "@/lib/hooks/useEscapeKey";
import CartLineItem from "./CartLineItem";

export default function CartDrawer() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const openReservation = useCartStore((state) => state.openReservation);

  useLockBodyScroll(isCartOpen);
  useEscapeKey(isCartOpen, closeCart);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-glass-brd bg-bg-deep/95 shadow-glass backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-glass-brd px-6 py-5">
              <h2 className="font-display text-lg font-semibold text-text">
                Tu carrito {itemCount > 0 && `(${itemCount})`}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-mute transition-colors duration-300 hover:bg-white/[0.1] hover:text-text"
              >
                <CloseIcon />
              </button>
            </div>

            {items.length > 0 ? (
              <>
                <ul className="flex flex-1 flex-col gap-3 overflow-y-auto px-6 py-5">
                  {items.map((item) => (
                    <CartLineItem key={item.product.id} item={item} />
                  ))}
                </ul>

                <div className="border-t border-glass-brd px-6 py-5">
                  <button type="button" onClick={openReservation} className="btn-primary w-full">
                    Solicitar cotización
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-text-mute">Tu carrito está vacío.</p>
                <p className="text-sm text-text-mute">
                  Agrega productos desde el catálogo para armar tu cotización.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
