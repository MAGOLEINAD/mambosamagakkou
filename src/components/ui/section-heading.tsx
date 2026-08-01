import { BrushUnderline } from "@/components/motifs/brush-underline";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
}) {
  const Heading = as;

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-[0.25em] text-brand uppercase">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-heading font-semibold text-ink",
          as === "h1" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl",
          eyebrow ? "mt-3" : ""
        )}
      >
        {title}
      </Heading>
      <BrushUnderline
        className={cn("mt-4 h-5 w-36 text-brand", align === "center" && "mx-auto")}
      />
      {description && (
        <p className="mt-5 max-w-2xl text-lg text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}
