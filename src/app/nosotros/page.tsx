import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ValoresList } from "@/components/nosotros/valores-list";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = buildMetadata({
  title: "Nosotros",
  path: "/nosotros",
  description:
    "Conocé la historia, la misión y los valores de Mambosamagakkou, academia de idiomas orientales en Buenos Aires fundada en 2020.",
});

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        image="/images/header-nosotros.jpg"
        imageAlt="Estudiar chino mandarín en CABA"
        eyebrow="Quiénes somos"
        title="Nosotros"
      />

      <section className="py-16 sm:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">Historia</h2>
            <p className="mt-4 text-lg text-ink-soft">
              La institución fue fundada en 2020 con el objetivo inicial de ofrecer clases
              virtuales de Japonés. Con el tiempo, expandimos nuestra oferta a otros idiomas
              orientales, como Coreano y Chino Mandarín.
            </p>
            <p className="mt-4 text-lg text-ink-soft">
              Nos enfocamos no solo en el dominio del idioma, sino también en la transmisión de
              conocimientos culturales.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-gold/30">
                <Image
                  src="/images/chino-buenos-aires.jpg"
                  alt="Chino mandarín en Buenos Aires"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-gold/30">
                <Image
                  src="/images/coreano-caba.jpg"
                  alt="Idioma coreano en CABA"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border-4 border-gold/30 shadow-lg">
            <Image
              src="/images/nosotros.jpg"
              alt="Equipo de Mambosamagakkou, academia de idiomas orientales"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-4xl font-semibold text-ink sm:text-5xl">
              Nuestra misión
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              Brindar educación de calidad en idiomas orientales, ofreciendo herramientas
              lingüísticas y una comprensión cultural profunda que permitan a nuestros
              estudiantes comunicarse de manera efectiva en contextos formales e informales.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Lo que nos guía" title="Valores" align="center" />
          <div className="mt-12">
            <ValoresList />
          </div>
        </Container>
      </section>
    </>
  );
}
