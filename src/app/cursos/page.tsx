import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseCards } from "@/components/shared/course-cards";
import { BeneficiosList } from "@/components/cursos/beneficios-list";
import { ModalidadSection } from "@/components/shared/modalidad-section";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = buildMetadata({
  title: "Cursos",
  path: "/cursos",
  description:
    "Cursos de Japonés, Coreano y Chino Mandarín en Buenos Aires: modalidad presencial y virtual, para adultos y niños, todos los niveles. Clases particulares y preparación de exámenes internacionales.",
});

export default function CursosPage() {
  return (
    <>
      <PageHeader
        image="/images/header-cursos.jpg"
        imageAlt="Estudiar chino mandarín en CABA"
        eyebrow="Nuestra oferta"
        title="Cursos"
        description="También contamos con clases particulares y preparación de exámenes internacionales, impartidos por profesores nativos y altamente calificados."
      />

      <section className="py-16 sm:py-20">
        <Container>
          <CourseCards variant="whatsapp" />
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title="¿Cuáles son los beneficios para el estudiante?"
            align="center"
          />
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-ink-soft">
            Al tomar cursos presenciales o virtuales de idiomas orientales son:
          </p>
          <div className="mt-12">
            <BeneficiosList />
          </div>
        </Container>
      </section>

      <ModalidadSection />
    </>
  );
}
