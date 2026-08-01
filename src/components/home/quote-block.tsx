import { Container } from "@/components/ui/container";
import { DragonMotif } from "@/components/motifs/dragon-motif";

export function QuoteBlock() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white sm:py-20">
      <DragonMotif className="pointer-events-none absolute -right-10 -bottom-10 h-auto w-[420px] text-gold/[0.12] sm:w-[560px]" />
      <Container className="relative">
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
    </section>
  );
}
