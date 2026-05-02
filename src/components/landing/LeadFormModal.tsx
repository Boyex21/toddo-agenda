import { useState, useEffect } from "react";
import { useLeadForm } from "./LeadFormContext";
import { useCurrency } from "./CurrencyContext";

const LEAD_SUBMIT_WEBHOOK = "https://webhook.sesotec.com.ec/webhook/lead-submitted-toddo";

const getUtm = () => {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_medium: p.get("utm_medium") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
    utm_term: p.get("utm_term") || undefined,
    utm_content: p.get("utm_content") || undefined,
  };
};
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, PartyPopper } from "lucide-react";

const WA_NUMBER = "593967383001";

const COUNTRY_CODES = [
  { code: "+593", country: "🇪🇨 Ecuador" },
  { code: "+57", country: "🇨🇴 Colombia" },
  { code: "+51", country: "🇵🇪 Perú" },
  { code: "+52", country: "🇲🇽 México" },
  { code: "+54", country: "🇦🇷 Argentina" },
  { code: "+56", country: "🇨🇱 Chile" },
  { code: "+591", country: "🇧🇴 Bolivia" },
  { code: "+58", country: "🇻🇪 Venezuela" },
  { code: "+507", country: "🇵🇦 Panamá" },
  { code: "+503", country: "🇸🇻 El Salvador" },
  { code: "+502", country: "🇬🇹 Guatemala" },
  { code: "+1", country: "🇺🇸 EE.UU." },
  { code: "+34", country: "🇪🇸 España" },
  { code: "+44", country: "🇬🇧 Reino Unido" },
];

const NICHES = [
  "Peluquerías",
  "Salones de belleza",
  "Odontologías",
  "Restaurantes",
  "Delivery",
  "Puerta a Puerta",
  "Lavadoras y Lubricadoras",
  "Mecánicas",
  "Profesionales",
  "Rastreo GPS",
  "Spa y Relajación",
  "Inmobiliarias",
  "Agencias Turísticas",
  "Recepcionistas de Hoteles",
  "Otro nicho",
];

const LeadFormModal = () => {
  const { isOpen, closeForm } = useLeadForm();
  const { phoneCode, currency, detectedCountry } = useCurrency();
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState(phoneCode || "+593");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("");
  const [otherNiche, setOtherNiche] = useState("");
  const [userTouchedCountry, setUserTouchedCountry] = useState(false);

  // Sync country code when geolocation/currency changes (until user manually picks)
  useEffect(() => {
    if (!userTouchedCountry && phoneCode) {
      setCountryCode(phoneCode);
    }
  }, [phoneCode, userTouchedCountry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedNiche = niche === "Otro nicho" ? otherNiche : niche;
    const fullPhone = `${countryCode}${phone}`;

    // Fire-and-forget webhook to persist lead in DB (n8n -> Postgres)
    try {
      fetch(LEAD_SUBMIT_WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "lead_submitted",
          name,
          country_code: countryCode,
          phone,
          full_phone: fullPhone,
          email,
          niche: selectedNiche,
          other_niche: niche === "Otro nicho" ? otherNiche : null,
          currency,
          detected_country: detectedCountry,
          page_url: typeof window !== "undefined" ? window.location.href : "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          ...getUtm(),
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch {}

    const message =
      `🚀 *Solicitud de Demostración - TODDO AI*\n\n` +
      `Hola, estoy solicitando la *demostración gratuita de 60 días* de TODDO AI.\n\n` +
      `📋 *Mis datos:*\n` +
      `👤 *Nombre:* ${name}\n` +
      `📱 *Celular:* ${fullPhone}\n` +
      `📧 *Correo:* ${email}\n` +
      `🏢 *Nicho:* ${selectedNiche}\n\n` +
      `Quiero transformar las ventas de mi negocio con inteligencia artificial. ¡Espero su respuesta! 🙌`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    closeForm();
    // Reset
    setName("");
    setPhone("");
    setEmail("");
    setNiche("");
    setOtherNiche("");
  };

  const isValid = name.trim() && phone.trim() && email.trim() && niche && (niche !== "Otro nicho" || otherNiche.trim());

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeForm()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
            <PartyPopper className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl font-extrabold text-foreground">
            🎉 ¡Felicidades!
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Has decidido transformar las ventas de tu negocio. Llena los siguientes datos para solicitar la demostración.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          {/* Nombre */}
          <div className="space-y-1.5">
            <Label htmlFor="lead-name">Nombres</Label>
            <Input
              id="lead-name"
              placeholder="Tu nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          {/* Celular */}
          <div className="space-y-1.5">
            <Label htmlFor="lead-phone">Celular</Label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => { setCountryCode(e.target.value); setUserTouchedCountry(true); }}
                className="h-10 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.country} ({c.code})
                  </option>
                ))}
              </select>
              <Input
                id="lead-phone"
                type="tel"
                placeholder="987654321"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                required
                maxLength={15}
                className="flex-1"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="lead-email">Correo electrónico</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={255}
            />
          </div>

          {/* Nicho */}
          <div className="space-y-1.5">
            <Label htmlFor="lead-niche">Nicho</Label>
            <select
              id="lead-niche"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>Selecciona tu nicho</option>
              {NICHES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Otro nicho */}
          {niche === "Otro nicho" && (
            <div className="space-y-1.5">
              <Label htmlFor="lead-other">Dinos cuál es el nicho que quieres que personalicemos por ti</Label>
              <Input
                id="lead-other"
                placeholder="Ej: Consultorio veterinario"
                value={otherNiche}
                onChange={(e) => setOtherNiche(e.target.value)}
                required
                maxLength={100}
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <MessageCircle className="h-5 w-5" />
            Solicitar demostración vía WhatsApp
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;
