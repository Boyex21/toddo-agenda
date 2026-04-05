import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";

const UrgencyCounter = () => {
  const [spots, setSpots] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots((prev) => (prev > 3 ? prev - 1 : 3));
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center gap-2 rounded-2xl border-2 border-destructive/30 bg-destructive/10 px-5 py-3 text-sm font-bold text-destructive"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Flame className="h-5 w-5 animate-pulse" />
      <span>
        ¡Solo quedan{" "}
        <motion.span
          key={spots}
          initial={{ scale: 1.4, color: "hsl(0 84% 50%)" }}
          animate={{ scale: 1, color: "hsl(0 84% 60%)" }}
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
