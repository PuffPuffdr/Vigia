"use client";

import { useCartStore } from "@/lib/store/useCartStore";

const WHATSAPP_NUMBER = "18495276393";
const WHATSAPP_MESSAGE = "Hola VIGÍA, quiero información sobre sus cámaras de seguridad.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function WhatsappButton() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const isReservationOpen = useCartStore((state) => state.isReservationOpen);

  if (isCartOpen || isReservationOpen) return null;

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition-transform duration-300 ease-smooth hover:scale-105 active:scale-95"
    >
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 [animation-duration:2.4s] animate-ping"
        aria-hidden="true"
      />
      <WhatsappIcon />
    </a>
  );
}

function WhatsappIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="relative"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.19 0 4.25.85 5.8 2.4a8.2 8.2 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.23 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.32a8.17 8.17 0 0 1-1.26-4.35c0-4.55 3.72-8.23 8.27-8.23Zm-4.6 4.36c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.12.16 1.7 2.7 4.2 3.68 2.08.82 2.5.66 2.95.62.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.36-.77-1.86-.2-.48-.4-.42-.55-.42h-.42Z" />
    </svg>
  );
}
