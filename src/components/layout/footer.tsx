"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { DragonMotif } from "@/components/motifs/dragon-motif";
import { Container } from "@/components/ui/container";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK_URL,
  HOURS,
  INSTAGRAM_URL,
  NAV_LINKS,
  PHONE_DISPLAY,
  SITE_NAME,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <DragonMotif className="pointer-events-none absolute -right-16 -top-10 h-auto w-[420px] scale-x-[-1] text-gold/[0.1] sm:w-[560px]" />

      {pathname === "/" && (
        <Container className="relative border-b border-white/10 py-16 sm:py-20">
          <blockquote className="mx-auto max-w-3xl text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 40 32"
              className="mx-auto h-10 w-10 text-gold"
              fill="currentColor"
            >
              <path d="M0 20.6C0 10.8 6.9 3.4 17.3 0l2.3 4.6C12.4 7.4 8.6 12 8.2 17.6c1-.5 2.2-.8 3.4-.8 4.6 0 8 3.4 8 8s-3.6 8-8.4 8C4.8 32.8 0 27.6 0 20.6zm22 0C22 10.8 28.9 3.4 39.3 0l2.3 4.6c-7.2 2.8-11 7.4-11.4 13 1-.5 2.2-.8 3.4-.8 4.6 0 8 3.4 8 8s-3.6 8-8.4 8c-6.4 0-11.2-5.2-11.2-12.2z" />
            </svg>
            <p className="mt-6 font-heading text-2xl leading-relaxed sm:text-3xl">
              &ldquo;Si hablas a una persona en un idioma que entiende, eso llega a su
              cabeza. Si hablas en su idioma, eso llega a tu corazón.&rdquo;
            </p>
            <footer className="mt-6 text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              — Nelson Mandela
            </footer>
          </blockquote>
        </Container>
      )}

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2">
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

            <div className="flex items-center gap-3 pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-gold transition-colors hover:bg-white/20"
              >
                <InstagramIcon className="size-4.5" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-gold transition-colors hover:bg-white/20"
              >
                <FacebookIcon className="size-4.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {year} {SITE_NAME}. Todos los derechos reservados.
          </p>
          <nav
            className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50"
            aria-label="Navegación de pie de página"
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
