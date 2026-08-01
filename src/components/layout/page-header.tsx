import Image from "next/image";
import { BrushUnderline } from "@/components/motifs/brush-underline";

export function PageHeader({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
}: {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative flex min-h-[48vh] items-end justify-center overflow-hidden pt-24 pb-14 sm:min-h-[54vh] sm:pb-16">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_6%] lg:object-[50%_4%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/65 to-ink/15"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
        {eyebrow && (
          <p className="text-sm font-bold text-white uppercase">{eyebrow}</p>
        )}
        <BrushUnderline className="mx-auto mt-3 h-1 w-32 text-gold" />
        <h1 className="mt-5 font-heading text-4xl leading-tight font-semibold sm:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-base text-white/90 sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
