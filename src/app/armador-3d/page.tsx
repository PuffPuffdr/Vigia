import type { Metadata } from "next";
import GlassNav from "@/components/nav/GlassNav";
import CartDrawer from "@/components/cart/CartDrawer";
import ReservationModal from "@/components/cart/ReservationModal";
import WhatsappButton from "@/components/whatsapp/WhatsappButton";
import HouseCanvas from "@/components/kit3d/HouseCanvas";

export const metadata: Metadata = {
  title: "Armador de Kit 3D — VIGÍA",
  description:
    "Recorre tu casa en 3D y arma el kit de cámaras de seguridad perfecto para cada zona.",
};

export default function Kit3DPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNav />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 pb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Armador de Kit 3D
          </span>
          <h1 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Recorre tu casa, arma tu sistema.
          </h1>
          <p className="text-balance text-text-mute">
            Gira y acerca la casa para explorarla desde cualquier ángulo. Muy pronto vas a
            poder tocar cada zona para agregar cámaras y ver la cobertura en tiempo real.
          </p>
        </div>

        <HouseCanvas />
      </section>

      <CartDrawer />
      <ReservationModal />
      <WhatsappButton />
    </main>
  );
}
