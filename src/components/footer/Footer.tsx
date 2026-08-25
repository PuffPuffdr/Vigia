const WHATSAPP_MESSAGE = "Hola VIGÍA, quiero información sobre sus cámaras de seguridad.";

const CONTACT = {
  phone: "+1 849-527-6393",
  phoneHref: "tel:+18495276393",
  whatsappHref: `https://wa.me/18495276393?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  email: "hola@vigiard.com",
  location: "Santo Domingo, RD",
};

export default function Footer() {
  return (
    <footer className="border-t border-glass-brd bg-white/[0.03] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:justify-between">
        <div className="flex max-w-sm flex-col gap-3">
          <span className="font-display text-xl font-semibold tracking-tight text-text">
            VIGÍA
          </span>
          <p className="text-sm leading-relaxed text-text-mute">
            Seguridad inteligente para tu hogar. Productos UniFi de Ubiquiti.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Contacto
          </span>
          <ul className="flex flex-col gap-2.5 text-sm text-text-mute">
            <li>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-text"
              >
                <WhatsappIcon />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-text"
              >
                <MailIcon />
                {CONTACT.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <PinIcon />
              {CONTACT.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-glass-brd px-5 py-5 sm:px-8">
        <p className="mx-auto max-w-7xl text-xs text-text-mute">
          VIGÍA es distribuidor de productos Ubiquiti. UniFi y Ubiquiti son marcas de Ubiquiti
          Inc.
        </p>
      </div>
    </footer>
  );
}

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M3 21l1.65-4.95A8 8 0 1 1 8.6 19.4L3 21Z" />
      <path d="M8.5 9.5c0 3.5 2.5 6 6 6 .5 0 1-.6.8-1.1l-.6-1.3a.9.9 0 0 0-1-.5l-1 .2a5 5 0 0 1-2.5-2.5l.2-1a.9.9 0 0 0-.5-1L8.6 7.7c-.5-.2-1.1.3-1.1.8Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
