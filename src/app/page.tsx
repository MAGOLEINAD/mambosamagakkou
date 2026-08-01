import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Hero } from "@/components/home/hero";
import { QuoteBlock } from "@/components/home/quote-block";
import { NosotrosTeaser } from "@/components/home/nosotros-teaser";
import { ModalidadSection } from "@/components/shared/modalidad-section";
import { CourseCards } from "@/components/shared/course-cards";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = buildMetadata({
  path: "/",
  description:
    "Academia de idiomas orientales en Buenos Aires desde 2020. Cursos de Japonés, Coreano y Chino Mandarín, presenciales y virtuales, para adultos y niños de todos los niveles.",
});

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Nuestra oferta"
            title="Cursos disponibles"
            align="center"
          />
          <div className="mt-12">
            <CourseCards variant="link" />
          </div>
        </Container>
      </section>

      <NosotrosTeaser />
      <ModalidadSection />
      <QuoteBlock />
    </>
  );
}
