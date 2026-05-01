import React, { createContext, useContext, useState, useCallback } from "react";

const WEBHOOK_URL = "https://webhook.sesotec.com.ec/webhook/abre-form-toddo";
const WA_NUMBER = "593967383001";

interface LeadFormContextType {
  isOpen: boolean;
  openForm: (source?: string) => void;
  closeForm: () => void;
  /** Open WhatsApp directly with a "still have doubts" message (no form) */
  openDoubtsChat: (sectionContext?: string) => void;
}

const LeadFormContext = createContext<LeadFormContextType>({
  isOpen: false,
  openForm: () => {},
  closeForm: () => {},
  openDoubtsChat: () => {},
});

export const useLeadForm = () => useContext(LeadFormContext);

export const LeadFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const fireWebhook = useCallback((source?: string) => {
    // Fire-and-forget; don't block UI
    try {
      fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "lead_form_opened",
          message: "Un usuario ha abierto el formulario de demostración",
          source: source || "unknown",
          url: typeof window !== "undefined" ? window.location.href : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }
  }, []);

  const openForm = useCallback(
    (source?: string) => {
      setIsOpen(true);
      fireWebhook(source);
    },
    [fireWebhook]
  );

  const closeForm = useCallback(() => setIsOpen(false), []);

  const openDoubtsChat = useCallback((sectionContext?: string) => {
    const ctx = sectionContext ? `\n\n📍 *Sección:* ${sectionContext}` : "";
    const message =
      `👋 *Hola TODDO AI*\n\n` +
      `Me interesó el contenido y quiero la *demostración gratuita de 60 días*, ` +
      `pero antes tengo unas dudas que me gustaría resolver. 🙋‍♂️${ctx}\n\n` +
      `¿Pueden ayudarme?`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <LeadFormContext.Provider value={{ isOpen, openForm, closeForm, openDoubtsChat }}>
      {children}
    </LeadFormContext.Provider>
  );
};
