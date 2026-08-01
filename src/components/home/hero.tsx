import Image from "next/image";
import Link from "next/link";
import { BrushUnderline } from "@/components/motifs/brush-underline";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-[65vh] items-end justify-center overflow-hidden pt-24 pb-16 sm:min-h-[80vh] sm:pb-24">
      <Image
        src="/images/hero-home.jpg"
        alt="Profesora enseñando chino mandarín"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_-6%] sm:object-[50%_15%]"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/50 to-ink/5"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center text-white lg:max-w-3xl">
        <p className="text-xs font-bold text-white uppercase sm:text-sm">
          Academia de idiomas orientales
        </p>
        <BrushUnderline className="mx-auto mt-2 h-1 w-24 text-gold" />
        <h1 className="mt-3 font-heading text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight lg:text-5xl">
          Cursos de Japonés, Coreano y Chino Mandarín
        </h1>
        <Link
          href="/cursos"
          className={cn(buttonVariants({ variant: "pill", size: "xl" }), "mt-8 inline-flex")}
        >
          Más información
        </Link>
      </div>
    </section>
  );
}
