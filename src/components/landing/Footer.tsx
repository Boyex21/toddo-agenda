const Footer = () => (
  <footer className="border-t border-border bg-secondary py-8">
    <div className="container mx-auto text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} WhatsBot AI — Todos los derechos reservados.</p>
      <p className="mt-1">Automatización inteligente para negocios que quieren crecer.</p>
    </div>
  </footer>
);

export default Footer;
