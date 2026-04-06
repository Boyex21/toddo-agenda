import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";

const UrgencyCounter = ({ variant = "default" }: { variant?: "default" | "on-primary" }) => {
  const [spots, setSpots] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots((prev) => (prev > 3 ? prev - 1 : 3));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const styles =
    variant === "on-primary"
      ? "border-primary-foreground/40 bg-primary-foreground/15 text-primary-foreground"
      : "border-destructive/30 bg-destructive/10 text-destructive";

  return (
    <motion.div
      className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-5 py-3 text-sm font-bold ${styles}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Flame className="h-5 w-5 animate-pulse" />
      <span>
        ¡Solo quedan{" "}
        <motion.span
          key={spots}
          initial={{ scale: 1.4 }}
          animate={{ scale: 1 }}
          className="inline-block text-lg"
        >
          {spots}
        </motion.span>{" "}
        cupos disponibles!
      </span>
      <Flame className="h-5 w-5 animate-pulse" />
    </motion.div>
  );
};

export default UrgencyCounter;
