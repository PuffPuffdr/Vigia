interface TrustBadge {
  label: string;
  icon: JSX.Element;
}

const TRUST_BADGES: TrustBadge[] = [
  { label: "Distribuidor autorizado Ubiquiti", icon: <BadgeIcon /> },
  { label: "Garantía de 12 meses", icon: <ShieldIcon /> },
  { label: "Envío a todo el país", icon: <TruckIcon /> },
  { label: "Soporte en español", icon: <ChatIcon /> },
];

export default function TrustBadges() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {TRUST_BADGES.map((badge) => (
          <li
            key={badge.label}
            className="glass-panel inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-text-mute"
          >
            <span className="text-accent">{badge.icon}</span>
            {badge.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BadgeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2 2.4 1.6 2.8-.4 1.1 2.6 2.6 1.1-.4 2.8L22 12l-1.6 2.4.4 2.8-2.6 1.1-1.1 2.6-2.8-.4L12 22l-2.4-1.6-2.8.4-1.1-2.6-2.6-1.1.4-2.8L2 12l1.6-2.4-.4-2.8 2.6-1.1L6.9 3.2l2.8.4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4.5 5.5v5.2c0 4.6 3.1 8.6 7.5 9.8 4.4-1.2 7.5-5.2 7.5-9.8V5.5L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="12" height="10" rx="1.5" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A7.96 7.96 0 0 1 4 12Z" />
    </svg>
  );
}
