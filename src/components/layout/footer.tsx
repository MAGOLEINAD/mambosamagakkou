import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { DragonMotif } from "@/components/motifs/dragon-motif";
import { ADDRESS, EMAIL, HOURS, NAV_LINKS, PHONE_DISPLAY, SITE_NAME, WHATSAPP_NUMBER } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <DragonMotif className="pointer-events-none absolute -right-16 -top-10 h-auto w-[420px] scale-x-[-1] text-gold/[0.1] sm:w-[560px]" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-heading text-lg font-semibold">{SITE_NAME}</p>
            <p className="mt-2 text-sm text-white/70">Academia de idiomas orientales</p>
          </div>

          <div className="space-y-3 text-sm text-white/80">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
              <span>{ADDRESS}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${EMAIL}`} className="hover:text-white">
                {EMAIL}
              </a>
            </p>
            <div className="pt-1 text-white/60">
              {HOURS.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.time}
                </p>
              ))}
            </div>
          </div>

          <nav className="space-y-2 text-sm" aria-label="Navegación de pie de página">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="block text-white/80 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {year} {SITE_NAME}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
