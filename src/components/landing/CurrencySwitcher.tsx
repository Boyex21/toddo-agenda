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
    <div className={`inline-flex flex-wrap items-center gap-1.5 rounded-2xl border px-3 py-2 text-sm ${base}`}>
      <Globe className="h-4 w-4 opacity-70 mr-1" />
      <span className="opacity-70 mr-1">Moneda:</span>
      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
        const active = currency === code;
        return (
          <button
            key={code}
            onClick={() => setCurrency(code)}
            className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "opacity-60 hover:opacity-100"
            }`}
            aria-pressed={active}
          >
            {CURRENCIES[code].flag} {code}
          </button>
        );
      })}
      {loadingRate && <span className="text-xs opacity-60">…</span>}
    </div>
  );
};

export default CurrencySwitcher;
