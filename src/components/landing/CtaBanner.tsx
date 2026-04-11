import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import UrgencyCounter from "./UrgencyCounter";
import { useLeadForm } from "./LeadFormContext";

const CtaBanner = ({ headline = "¿Listo para vender en automático?" }: { headline?: string }) => {
  const { openForm } = useLeadForm();

  return (
    <section className="py-14 md:py-20 bg-primary">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-section md:text-section-lg text-primary-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {headline}
        </motion.h2>
        <div className="mt-6 flex justify-center">
          <UrgencyCounter variant="on-primary" />
        </div>
        <motion.div
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={openForm}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-background px-8 py-4 text-lg font-bold text-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-5 w-5" />
            Quiero automatizar mi WhatsApp ahora
          </button>
          <button
            onClick={openForm}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-primary-foreground/30 px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Activar prueba gratis
          </button>
        </motion.div>
        <p className="mt-4 text-sm text-primary-foreground/80">
          ✅ 60 días GRATIS sin compromiso · ✅ Sin tarjeta de crédito · ✅ Cancela cuando quieras
        </p>
      </div>
    </section>
  );
};

export default CtaBanner;
