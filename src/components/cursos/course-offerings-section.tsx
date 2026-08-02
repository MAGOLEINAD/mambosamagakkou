import { Suspense } from "react";
import { getActiveOfferings } from "@/lib/course-offerings";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { OfferingsFilterableList } from "@/components/cursos/offerings-filterable-list";

export async function CourseOfferingsSection() {
  const offerings = await getActiveOfferings();

  if (offerings.length === 0) {
    return null;
  }

  return (
    <section id="cursos-disponibles-ahora" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Inscripciones abiertas"
          title="Cursos disponibles ahora"
          align="center"
        />
        <Suspense
          fallback={<div className="mt-12 h-40 animate-pulse rounded-2xl bg-border/40" />}
        >
          <OfferingsFilterableList offerings={offerings} />
        </Suspense>
      </Container>
    </section>
  );
}
