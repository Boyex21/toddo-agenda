import { useCurrency, CURRENCIES, CurrencyCode } from "./CurrencyContext";
import { Globe } from "lucide-react";

interface Props {
  variant?: "light" | "dark";
}

const CurrencySwitcher = ({ variant = "light" }: Props) => {
  const { currency, setCurrency, loadingRate } = useCurrency();

  const base =
    variant === "dark"
      ? "bg-white/10 border-white/20 text-white"
      : "bg-background border-border text-foreground";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${base}`}>
      <Globe className="h-4 w-4 opacity-70" />
      <span className="opacity-70">Moneda:</span>
      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
        const active = currency === code;
        return (
          <button
            key={code}
            onClick={() => setCurrency(code)}
            className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "opacity-60 hover:opacity-100"
            }`}
            aria-pressed={active}
          >
            {CURRENCIES[code].country.split(" ")[0]} {code}
          </button>
        );
      })}
      {loadingRate && <span className="text-xs opacity-60">…</span>}
    </div>
  );
};

export default CurrencySwitcher;
