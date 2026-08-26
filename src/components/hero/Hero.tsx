import Link from "next/link";
import LazyCanvas from "@/components/3d/LazyCanvas";
import MouseGlow from "./MouseGlow";

export default function Hero() {
  return (
    <MouseGlow className="border-b border-glass-brd">
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center md:py-28">
        <div className="relative z-10 flex flex-col gap-6">
          <StatusBadge />

          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Cuida tu casa, <span className="text-gradient-accent">aunque tú no estés.</span>
          </h1>

          <p className="max-w-md text-balance text-lg text-text-mute">
            Cámaras, timbres y sistemas de seguridad DIY que se instalan en minutos y se
            controlan desde una sola app — desde cualquier país.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#productos" className="btn-primary">
              Ver productos
            </a>
            <a href="#tecnologia" className="btn-secondary">
              Cómo funciona
            </a>
            <Link href="/armador-3d" className="btn-secondary">
              Arma tu kit en 3D
            </Link>
          </div>
        </div>

        <div className="relative z-10 aspect-square w-full max-w-lg justify-self-center">
          <div className="glass-panel h-full w-full rounded-xl3 p-8 sm:p-10">
            <LazyCanvas
              kind="doorbell"
              accent="#6EE7FF"
              className="h-full w-full"
              fallback={<StaticHeroFallback />}
            />
          </div>
        </div>
      </section>
    </MouseGlow>
  );
}

function StatusBadge() {
  return (
    <div className="glass-panel inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider text-text-mute">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      En línea · Monitoreo 24/7
    </div>
  );
}

function StaticHeroFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-2/3 w-2/3">
        <div className="absolute inset-0 rounded-xl3 bg-gradient-to-br from-accent/25 via-accent-2/15 to-transparent blur-2xl" />
        <div className="absolute inset-x-1/4 inset-y-[10%] rounded-full border border-glass-brd bg-white/[0.04]" />
      </div>
    </div>
  );
}
