"use client";

import type { SubmissionError } from "@formspree/core";
import { useForm, ValidationError } from "@formspree/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useCartStore, type CartItem } from "@/lib/store/useCartStore";
import { useLockBodyScroll } from "@/lib/hooks/useLockBodyScroll";
import { useEscapeKey } from "@/lib/hooks/useEscapeKey";

const FORMSPREE_FORM_ID = "xnpaepgo";

interface ReservationFields {
  [key: string]: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  comments: string;
  productos: string;
}

interface ReservationForm {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  comments: string;
}

const EMPTY_FORM: ReservationForm = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  comments: "",
};

function formatProductsSummary(items: CartItem[]) {
  return items.map((item) => `${item.product.name} x${item.quantity}`).join(", ");
}

export default function ReservationModal() {
  const isReservationOpen = useCartStore((state) => state.isReservationOpen);
  const closeReservation = useCartStore((state) => state.closeReservation);
  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);

  const [form, setForm] = useState<ReservationForm>(EMPTY_FORM);
  const [state, submitToFormspree, resetFormspree] = useForm<ReservationFields>(FORMSPREE_FORM_ID);

  useLockBodyScroll(isReservationOpen);
  useEscapeKey(isReservationOpen, handleClose);

  // Empty the cart only once the request has actually been accepted by Formspree.
  useEffect(() => {
    if (state.succeeded) {
      clearCart();
    }
  }, [state.succeeded, clearCart]);

  function handleClose() {
    closeReservation();
    // Delay the reset so the exit animation doesn't flash back to the empty form.
    setTimeout(() => {
      setForm(EMPTY_FORM);
      resetFormspree();
    }, 300);
  }

  function handleChange(field: keyof ReservationForm) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  return (
    <AnimatePresence>
      {isReservationOpen && (
        <>
          <motion.div
            key="reservation-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              key="reservation-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Solicitar cotización"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl3 bg-bg-deep/95 p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-text-mute transition-colors duration-300 hover:bg-white/[0.1] hover:text-text"
              >
                <CloseIcon />
              </button>

              {state.succeeded ? (
                <ConfirmationView onClose={handleClose} />
              ) : (
                <ReservationFormView
                  form={form}
                  productsSummary={formatProductsSummary(items)}
                  itemCount={items.reduce((sum, item) => sum + item.quantity, 0)}
                  submitting={state.submitting}
                  errors={state.errors}
                  onChange={handleChange}
                  onSubmit={submitToFormspree}
                />
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function ReservationFormView({
  form,
  productsSummary,
  itemCount,
  submitting,
  errors,
  onChange,
  onSubmit,
}: {
  form: ReservationForm;
  productsSummary: string;
  itemCount: number;
  submitting: boolean;
  errors: SubmissionError<ReservationFields> | null;
  onChange: (field: keyof ReservationForm) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <div className="mb-6 pr-8">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Solicitud de cotización
        </span>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-text">
          Cuéntanos a dónde enviarla
        </h2>
        <p className="mt-1 text-sm text-text-mute">
          {itemCount} {itemCount === 1 ? "producto" : "productos"} en tu solicitud.
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input type="hidden" name="productos" value={productsSummary} readOnly />

        <Field label="Nombre completo" htmlFor="fullName">
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={onChange("fullName")}
            placeholder="Tu nombre y apellido"
            className="field-input"
          />
          <ValidationError prefix="Nombre" field="fullName" errors={errors} className="field-error" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Teléfono" htmlFor="phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={onChange("phone")}
              placeholder="(809) 000-0000"
              className="field-input"
            />
            <ValidationError prefix="Teléfono" field="phone" errors={errors} className="field-error" />
          </Field>

          <Field label="Correo electrónico" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange("email")}
              placeholder="tu@correo.com"
              className="field-input"
            />
            <ValidationError prefix="Correo" field="email" errors={errors} className="field-error" />
          </Field>
        </div>

        <Field label="Ciudad / Sector" htmlFor="city">
          <input
            id="city"
            name="city"
            type="text"
            required
            value={form.city}
            onChange={onChange("city")}
            placeholder="Ej. Santo Domingo, Piantini"
            className="field-input"
          />
          <ValidationError prefix="Ciudad / Sector" field="city" errors={errors} className="field-error" />
        </Field>

        <Field label="Comentarios (opcional)" htmlFor="comments">
          <textarea
            id="comments"
            name="comments"
            rows={3}
            value={form.comments}
            onChange={onChange("comments")}
            placeholder="Detalles adicionales sobre tu instalación…"
            className="field-input resize-none"
          />
        </Field>

        <ValidationError errors={errors} className="field-error" />

        <p className="text-xs text-text-mute">
          Te contactaremos para confirmar tu pedido, darte el precio final y coordinar la
          entrega.
        </p>

        <button type="submit" disabled={submitting} className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? "Enviando…" : "Enviar solicitud"}
        </button>
      </form>
    </>
  );
}

function ConfirmationView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="glass-panel flex h-14 w-14 items-center justify-center rounded-full text-accent">
        <CheckIcon />
      </div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-text">
        ¡Solicitud recibida!
      </h2>
      <p className="max-w-sm text-text-mute">
        Te contactaremos pronto para confirmar tu pedido, darte el precio final y coordinar la
        entrega.
      </p>
      <button type="button" onClick={onClose} className="btn-secondary mt-2">
        Cerrar
      </button>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm text-text-mute">
        {label}
      </label>
      {children}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
