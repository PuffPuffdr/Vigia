interface TrustPoint {
  title: string;
  description: string;
  icon: JSX.Element;
}

const TRUST_POINTS: TrustPoint[] = [
  {
    title: "Cifrado de extremo a extremo",
    description: "Tu video solo lo ves tú, desde tu cuenta. Sin cuotas mensuales.",
    icon: <LockIcon />,
  },
  {
    title: "Grabación local",
    description: "Todo se guarda en tu propio equipo (CloudKey), no en la nube de un tercero.",
    icon: <DriveIcon />,
  },
  {
    title: "Soporte en español",
    description: "Te ayudamos con la configuración y el uso, aquí en República Dominicana.",
    icon: <HeadsetIcon />,
  },
  {
    title: "Productos UniFi de Ubiquiti",
    description:
      "Vendemos equipos originales de una de las marcas más respetadas en seguridad y redes.",
    icon: <BadgeIcon />,
  },
];

export default function TrustSection() {
  return (
    <section id="confianza" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 pb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Confianza
        </span>
        <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Por qué comprarnos.
        </h2>
        <p className="text-balance text-text-mute">
          Equipos originales, tus datos bajo tu control, y soporte real cuando lo necesitas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_POINTS.map((point) => (
          <div
            key={point.title}
            className="glass-panel flex flex-col gap-4 rounded-xl3 p-6 transition-all duration-300 ease-smooth hover:border-white/20"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
              {point.icon}
            </div>
            <h3 className="font-display text-base font-semibold text-text">{point.title}</h3>
            <p className="text-sm leading-relaxed text-text-mute">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function DriveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M3 13h18" />
      <circle cx="7" cy="16" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2 2.4 1.6 2.8-.4 1.1 2.6 2.6 1.1-.4 2.8L22 12l-1.6 2.4.4 2.8-2.6 1.1-1.1 2.6-2.8-.4L12 22l-2.4-1.6-2.8.4-1.1-2.6-2.6-1.1.4-2.8L2 12l1.6-2.4-.4-2.8 2.6-1.1L6.9 3.2l2.8.4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
