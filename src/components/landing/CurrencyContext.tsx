import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type CurrencyCode = "USD" | "COP" | "PEN" | "MXN" | "ARS" | "CLP" | "EUR" | "GBP";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Default phone country code prefix (used to preselect form) */
  phoneCode: string;
  /** Country flag/name for UI */
  country: string;
  /** Flag emoji */
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$",  label: "USD", phoneCode: "+593", country: "Ecuador",   flag: "🇪🇨" },
  COP: { code: "COP", symbol: "$",  label: "COP", phoneCode: "+57",  country: "Colombia",  flag: "🇨🇴" },
  PEN: { code: "PEN", symbol: "S/", label: "PEN", phoneCode: "+51",  country: "Perú",      flag: "🇵🇪" },
  MXN: { code: "MXN", symbol: "$",  label: "MXN", phoneCode: "+52",  country: "México",    flag: "🇲🇽" },
  ARS: { code: "ARS", symbol: "$",  label: "ARS", phoneCode: "+54",  country: "Argentina", flag: "🇦🇷" },
  CLP: { code: "CLP", symbol: "$",  label: "CLP", phoneCode: "+56",  country: "Chile",     flag: "🇨🇱" },
  EUR: { code: "EUR", symbol: "€",  label: "EUR", phoneCode: "+34",  country: "España",    flag: "🇪🇺" },
  GBP: { code: "GBP", symbol: "£",  label: "GBP", phoneCode: "+44",  country: "Reino Unido", flag: "🇬🇧" },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  /** USD -> currency exchange rate. 1 for USD. */
  rate: number;
  loadingRate: boolean;
  /** Detected ISO country (e.g. "EC", "CO", "MX"). Null while loading. */
  detectedCountry: string | null;
  /** Suggested phone code based on selected currency (or detected country). */
  phoneCode: string;
  /** Format a USD price into the selected currency string */
  format: (usd: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  rate: 1,
  loadingRate: false,
  detectedCountry: null,
  phoneCode: "+593",
  format: (usd) => `$${usd}`,
});

export const useCurrency = () => useContext(CurrencyContext);

const COUNTRY_TO_CURRENCY: Partial<Record<string, CurrencyCode>> = {
  EC: "USD", CO: "COP", PE: "PEN", MX: "MXN", AR: "ARS", CL: "CLP",
  ES: "EUR", FR: "EUR", DE: "EUR", IT: "EUR", PT: "EUR",
  GB: "GBP", UK: "GBP",
};

// Approx fallback rates (USD -> X)
const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1, COP: 4100, PEN: 3.75, MXN: 18, ARS: 1000, CLP: 950, EUR: 0.92, GBP: 0.79,
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rate, setRate] = useState(1);
  const [loadingRate, setLoadingRate] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  // Detect country by IP
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("toddo_currency") : null;
    if (stored && stored in CURRENCIES) {
      setCurrencyState(stored as CurrencyCode);
    }

    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        const cc = data?.country_code as string | undefined;
        if (cc) {
          setDetectedCountry(cc);
          if (!stored) {
            const inferred = COUNTRY_TO_CURRENCY[cc];
            if (inferred) setCurrencyState(inferred);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Fetch live exchange rate when currency != USD
  useEffect(() => {
    if (currency === "USD") {
      setRate(1);
      return;
    }
    setLoadingRate(true);
    fetch(`https://api.exchangerate.host/latest?base=USD&symbols=${currency}`)
      .then((r) => r.json())
      .then((data) => {
        const r = data?.rates?.[currency];
        if (typeof r === "number" && r > 0) setRate(r);
        else setRate(FALLBACK_RATES[currency]);
      })
      .catch(() => setRate(FALLBACK_RATES[currency]))
      .finally(() => setLoadingRate(false));
  }, [currency]);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    try { localStorage.setItem("toddo_currency", c); } catch {}
  }, []);

  const format = useCallback(
    (usd: number) => {
      const value = usd * rate;
      const info = CURRENCIES[currency];
      if (currency === "USD") {
        return `${info.symbol}${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
      }
      if (currency === "EUR" || currency === "GBP") {
        return `${info.symbol}${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
      }
      // LATAM: round to nearest 100
      const rounded = Math.round(value / 100) * 100;
      return `${info.symbol}${rounded.toLocaleString("es-CO")}`;
    },
    [currency, rate]
  );

  // Phone code follows the SELECTED currency (so changing currency updates form country)
  const phoneCode = CURRENCIES[currency].phoneCode;

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, rate, loadingRate, detectedCountry, phoneCode, format }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
