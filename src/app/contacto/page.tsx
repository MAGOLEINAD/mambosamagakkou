import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { ContactInfo } from "@/components/contacto/contact-info";
import { buttonVariants } from "@/components/ui/button";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  path: "/contacto",
  description:
    "Contactate con Mambosamagakkou para informes e inscripción a los cursos de Japonés, Coreano y Chino Mandarín en Buenos Aires. Escribinos por WhatsApp.",
});

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        image="/images/header-contacto.jpg"
        imageAlt="Estudiar chino mandarín en CABA"
        eyebrow="Hablemos"
        title="Contacto"
        description="Informes e Inscripción"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-start justify-center rounded-3xl bg-ink p-10 text-white">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#25D366]">
                <WhatsAppIcon className="size-7 text-white" />
              </span>
              <h2 className="mt-6 font-heading text-2xl font-semibold">Escribinos por WhatsApp</h2>
              <p className="mt-3 text-sm text-white/70">
                La forma más rápida de recibir información e inscribirte a nuestros cursos.
              </p>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "pill", size: "xl" }), "mt-8")}
              >
                Iniciar conversación
              </a>
            </div>

            <div className="rounded-3xl border border-border bg-white p-10">
              <h2 className="font-heading text-2xl font-semibold text-ink">Nuestros datos</h2>
              <div className="mt-6">
                <ContactInfo />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
