import Image from "next/image";
import { BrushUnderline } from "@/components/motifs/brush-underline";
import { FaqModal } from "@/components/home/faq-modal";

export function NosotrosTeaser() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Image
        src="/images/nosotros-teaser-bg.jpg"
        alt="Profesor enseñando chino mandarín en el aula"
        fill
        sizes="100vw"
        className="object-cover object-center lg:object-[50%_20%]"
      />
      <div className="absolute inset-0 bg-ink/80" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center text-white">
        <p className="text-sm font-semibold tracking-[0.25em] text-gold uppercase">Quiénes somos</p>
        <h2 className="mt-3 font-heading text-4xl font-semibold sm:text-5xl">Nuestra historia</h2>
        <BrushUnderline className="mx-auto mt-4 h-1 w-32 text-gold" />
        <p className="mt-6 text-lg text-white/90">
          La institución fue fundada en 2020 con el objetivo inicial de ofrecer clases
          virtuales de Japonés. Con el tiempo, expandimos nuestra oferta a otros idiomas
          orientales, como Coreano y Chino Mandarín…
        </p>
        <FaqModal triggerClassName="border-white text-white hover:bg-white hover:text-ink" />
      </div>
    </section>
  );
}
