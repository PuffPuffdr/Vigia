"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Necesito internet para que funcionen?",
    answer:
      "Sí, para ver el video en vivo desde la app y recibir alertas. La grabación local sigue funcionando aunque se caiga el internet.",
  },
  {
    question: "¿Puedo ver mis cámaras desde otro país?",
    answer:
      "Sí, desde la app UniFi Protect en cualquier lugar con internet. Ideal si vives fuera y cuidas la casa de la familia.",
  },
  {
    question: "¿Las cámaras necesitan algo más para funcionar?",
    answer:
      "Sí, el sistema UniFi necesita una consola (CloudKey+) que graba y gestiona todo. Te ayudamos a armar el combo correcto.",
  },
  {
    question: "¿Ustedes instalan?",
    answer:
      "Por ahora solo vendemos los equipos, que son fáciles de instalar. Te damos la guía y soporte para hacerlo tú.",
  },
  {
    question: "¿Cómo funciona la compra?",
    answer:
      "Agregas productos, solicitas cotización, y te contactamos para confirmar el pedido, precio y entrega.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 pb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Preguntas frecuentes
        </span>
        <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Todo lo que necesitas saber.
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="glass-panel overflow-hidden rounded-xl2">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              >
                <span className="font-display text-base font-medium text-text">
                  {item.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-mute transition-transform duration-300 ease-smooth ${
                    isOpen ? "rotate-45 text-accent" : ""
                  }`}
                >
                  <PlusIcon />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-text-mute sm:px-6">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
