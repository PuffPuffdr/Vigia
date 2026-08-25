import Image from "next/image";
import type { CartItem } from "@/lib/store/useCartStore";
import { useCartStore } from "@/lib/store/useCartStore";

export default function CartLineItem({ item }: { item: CartItem }) {
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <li className="glass-panel flex items-center gap-3 rounded-xl2 p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          sizes="64px"
          className="object-contain p-2"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="truncate font-display text-sm font-semibold text-text">
          {item.product.name}
        </p>
        <span className="font-mono text-xs uppercase tracking-wider text-text-mute">
          Consultar precio
        </span>

        <div className="mt-1 flex items-center gap-2">
          <button
            type="button"
            onClick={() => decrementItem(item.product.id)}
            aria-label={`Disminuir cantidad de ${item.product.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-glass-brd text-text transition-colors duration-300 hover:bg-white/[0.1]"
          >
            <MinusIcon />
          </button>
          <span className="w-5 text-center text-sm text-text">{item.quantity}</span>
          <button
            type="button"
            onClick={() => incrementItem(item.product.id)}
            aria-label={`Aumentar cantidad de ${item.product.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-glass-brd text-text transition-colors duration-300 hover:bg-white/[0.1]"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.product.id)}
        aria-label={`Eliminar ${item.product.name} del carrito`}
        className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-full text-text-mute transition-colors duration-300 hover:bg-white/[0.1] hover:text-text"
      >
        <CloseIcon />
      </button>
    </li>
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

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
