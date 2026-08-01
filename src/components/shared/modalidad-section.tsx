import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

const MODALIDADES = [
  {
    title: "Virtual",
    description:
      "Permite estudiar desde cualquier lugar, eliminando la necesidad de desplazarse y adaptándose a diferentes estilos de vida.",
    image: "/images/virtual-teaching.jpg",
    imageAlt: "Clases virtuales de idiomas orientales con recursos en línea",
    imagePosition: "50% 18%",
  },
  {
    title: "Presencial",
    description:
      "Ofrece una experiencia más inmersiva con interacción cara a cara, ideal para quienes prefieren un ambiente de aprendizaje tradicional.",
    image: "/images/japones-caba.png",
    imageAlt: "Clases presenciales de idioma japonés en CABA",
    imagePosition: "50% 50%",
  },
];

export function ModalidadSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Cómo estudiar" title="Modalidades de estudio" align="center" />
        <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
          {MODALIDADES.map((modalidad) => (
            <div
              key={modalidad.title}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={modalidad.image}
                  alt={modalidad.imageAlt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: modalidad.imagePosition }}
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-heading text-2xl font-semibold text-brand">
                  {modalidad.title}
                </h3>
                <p className="mt-3 text-base text-ink-soft">{modalidad.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
