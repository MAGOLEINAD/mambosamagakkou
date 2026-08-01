import Image from "next/image";
import Link from "next/link";
import { BrushUnderline } from "@/components/motifs/brush-underline";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative flex min-h-[65vh] items-end justify-center overflow-hidden pt-28 pb-20 sm:min-h-[78vh] sm:pb-24">
      <Image
        src="/images/hero-home.jpg"
        alt="Profesora enseñando chino mandarín"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_4%] sm:object-[50%_2%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/50 to-ink/5"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
        <p className="text-sm font-bold text-white uppercase sm:text-base">
          Academia de idiomas orientales
        </p>
        <BrushUnderline className="mx-auto mt-3 h-2 w-32 text-gold" />
        <h1 className="mt-5 font-heading text-4xl leading-tight font-semibold sm:text-6xl sm:leading-tight lg:text-7xl">
          Cursos de Japonés, Coreano y Chino mandarín
        </h1>
        <Link
          href="/cursos"
          className={cn(buttonVariants({ variant: "pill", size: "xl" }), "mt-10 inline-flex")}
        >
          Más información
        </Link>
      </div>
    </section>
  );
}
