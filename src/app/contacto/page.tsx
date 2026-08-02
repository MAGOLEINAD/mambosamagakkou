import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { ContactInfo } from "@/components/contacto/contact-info";
import { BrushUnderline } from "@/components/motifs/brush-underline";
import { DragonMotif } from "@/components/motifs/dragon-motif";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppMenu } from "@/components/shared/whatsapp-menu";
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
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-ink text-white shadow-xl">
            <DragonMotif className="pointer-events-none absolute -right-14 -bottom-14 h-auto w-80 scale-x-[-1] text-gold/10" />

            <div className="relative grid gap-10 p-10 sm:grid-cols-2 sm:p-14">
              <div className="flex flex-col items-start justify-center border-b border-white/10 pb-10 sm:border-b-0 sm:border-r sm:pr-10 sm:pb-0">
                <span className="flex size-14 items-center justify-center rounded-full bg-[#25D366]">
                  <WhatsAppIcon className="size-7 text-white" />
                </span>
                <h2 className="mt-6 font-heading text-2xl font-semibold">
                  Escribinos por WhatsApp
                </h2>
                <BrushUnderline className="mt-3 h-1 w-28 text-gold" />
                <p className="mt-4 text-sm text-white/70">
                  La forma más rápida de recibir información e inscribirte a nuestros cursos.
                </p>
                <WhatsAppMenu
                  align="start"
                  side="bottom"
                  sideOffset={10}
                  trigger={
                    <button
                      type="button"
                      className={cn(buttonVariants({ variant: "pill", size: "xl" }), "mt-8")}
                    />
                  }
                >
                  Iniciar conversación
                </WhatsAppMenu>
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="font-heading text-2xl font-semibold">Nuestros datos</h2>
                <BrushUnderline className="mt-3 h-1 w-28 text-brand" />
                <div className="mt-6">
                  <ContactInfo />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
