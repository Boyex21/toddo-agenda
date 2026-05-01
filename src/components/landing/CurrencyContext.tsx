import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type CurrencyCode = "USD" | "COP";

interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Default phone country code prefix (used to preselect form) */
  phoneCode: string;
  /** Country flag/name for UI */
  country: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$", label: "USD", phoneCode: "+593", country: "🇪🇨 Ecuador" },
  COP: { code: "COP", symbol: "$", label: "COP", phoneCode: "+57", country: "🇨🇴 Colombia" },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  /** USD -> currency exchange rate. 1 for USD. */
  rate: number;
  loadingRate: boolean;
  /** Detected ISO country (e.g. "EC", "CO", "MX"). Null while loading. */
  detectedCountry: string | null;
  /** Suggested phone code based on detected country, falls back to currency phoneCode */
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

// Map country ISO -> phone code (subset, matches LeadFormModal options)
const COUNTRY_TO_PHONE: Record<string, string> = {
  EC: "+593", CO: "+57", PE: "+51", MX: "+52", AR: "+54", CL: "+56",
  BO: "+591", VE: "+58", PA: "+507", SV: "+503", GT: "+502", US: "+1", ES: "+34",
};

const COUNTRY_TO_CURRENCY: Partial<Record<string, CurrencyCode>> = {
  CO: "COP",
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [rate, setRate] = useState(1);
  const [loadingRate, setLoadingRate] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [userOverride, setUserOverride] = useState(false);

  // Detect country by IP
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("toddo_currency") : null;
    if (stored && (stored === "USD" || stored === "COP")) {
      setCurrencyState(stored);
      setUserOverride(true);
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
      .catch(() => {
        // silent fail, keep USD
      });
  }, []);

  // Fetch live exchange rate when currency != USD
  useEffect(() => {
    if (currency === "USD") {
      setRate(1);
      return;
    }
    setLoadingRate(true);
    // exchangerate.host is free, no key
    fetch(`https://api.exchangerate.host/latest?base=USD&symbols=${currency}`)
      .then((r) => r.json())
      .then((data) => {
        const r = data?.rates?.[currency];
        if (typeof r === "number" && r > 0) {
          setRate(r);
        } else {
          // Fallback approximate rates (updated 2026)
          setRate(currency === "COP" ? 4100 : 1);
        }
      })
      .catch(() => {
        setRate(currency === "COP" ? 4100 : 1);
      })
      .finally(() => setLoadingRate(false));
  }, [currency]);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    setUserOverride(true);
    try {
      localStorage.setItem("toddo_currency", c);
    } catch {}
  }, []);

  const format = useCallback(
    (usd: number) => {
      const value = usd * rate;
      if (currency === "USD") {
        // Whole or with cents
        return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
      }
      // COP: round to nearest 100
      const rounded = Math.round(value / 100) * 100;
      return `$${rounded.toLocaleString("es-CO")}`;
    },
    [currency, rate]
  );

  const phoneCode =
    (detectedCountry && COUNTRY_TO_PHONE[detectedCountry]) || CURRENCIES[currency].phoneCode;

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, rate, loadingRate, detectedCountry, phoneCode, format }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
