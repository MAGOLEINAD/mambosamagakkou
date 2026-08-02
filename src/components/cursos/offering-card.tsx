import Image from "next/image";
import {
  BadgeCheck,
  Clock3,
  MessageCircle,
  Package,
  MapPin,
  Ticket,
  Link2,
  ClipboardList,
} from "lucide-react";
import type { CourseOffering } from "@/lib/course-offerings";
import { getCourse, LANGUAGE_FLAG_ICONS } from "@/lib/courses";
import { whatsappLink } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, formatCurrency, formatStartDate } from "@/lib/utils";
import {
  LEVEL_FLAGS,
  LEVEL_LABELS,
  MATERIALS_LABELS,
  MODALITY_FLAGS,
  MODALITY_LABELS,
} from "@/lib/offering-display";

function Badges({ offering }: { offering: CourseOffering }) {
  const FlagIcon = LANGUAGE_FLAG_ICONS[offering.language];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-brand uppercase">
      <span className="flex items-center gap-1.5">
        <FlagIcon aria-hidden="true" className="h-3.5 w-auto rounded-[2px]" />
        <span aria-hidden="true">{MODALITY_FLAGS[offering.modality]}</span>
        {MODALITY_LABELS[offering.modality]}
      </span>
      {offering.level && (
        <span className="flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5">
          <span aria-hidden="true">{LEVEL_FLAGS[offering.level]}</span>
          {LEVEL_LABELS[offering.level]}
        </span>
      )}
    </div>
  );
}

function priceSummary(offering: CourseOffering) {
  const parts: string[] = [];
  if (offering.tuitionFee) parts.push(`Matrícula ${formatCurrency(offering.tuitionFee)}`);
  if (offering.monthlyFee) parts.push(`Cuota ${formatCurrency(offering.monthlyFee)}/mes`);
  return parts.join(" + ");
}

function includesList(offering: CourseOffering) {
  const items: string[] = [];
  if (offering.includes?.certificate) items.push("Certificado oficial");
  if (offering.includes?.recordings) items.push("Grabaciones de las clases");
  if (offering.includes?.whatsappGroup) items.push("Grupo de WhatsApp");
  if (offering.includes?.materials && offering.includes.materials !== "none") {
    items.push(`Materiales ${MATERIALS_LABELS[offering.includes.materials]}`);
  }
  return items;
}

export function OfferingCard({ offering }: { offering: CourseOffering }) {
  const course = getCourse(offering.language);
  const FlagIcon = LANGUAGE_FLAG_ICONS[offering.language];
  const message =
    offering.whatsappMessage ?? `Hola! Quisiera información sobre ${offering.title}.`;
  const price = priceSummary(offering);
  const includes = includesList(offering);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      {offering.imageUrl && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={offering.imageUrl}
            alt={offering.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <span
            className="absolute inset-x-0 bottom-0 h-1.5"
            style={{
              background: `linear-gradient(90deg, ${course.accent.primary} 50%, ${course.accent.secondary} 50%)`,
            }}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="relative flex flex-1 flex-col overflow-hidden p-6">
        <FlagIcon
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -right-5 -bottom-5 w-28 rotate-[-8deg] rounded opacity-[0.12] select-none",
            offering.language === "japones" && "ring-1 ring-ink/30"
          )}
        />

        <div className="relative z-10 flex flex-1 flex-col">
        <Badges offering={offering} />
        <h3 className="mt-2 font-heading text-xl font-semibold text-ink">{offering.title}</h3>

        <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
          <li>📅 Inicio: {formatStartDate(offering.startDate)}</li>
          <li>🕒 {offering.schedule}</li>
          {offering.classDuration && <li>⏳ {offering.classDuration}</li>}
          {offering.frequency && <li>🔁 {offering.frequency}</li>}
        </ul>

        {price && <p className="mt-3 text-sm font-semibold text-ink">{price}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger
              className={cn(buttonVariants({ variant: "pill-outline", size: "sm" }))}
            >
              Ver más detalles
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{offering.title}</DialogTitle>
              </DialogHeader>
              <Badges offering={offering} />

              <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                <li>📅 Inicio: {formatStartDate(offering.startDate)}</li>
                <li>🕒 Día y horario: {offering.schedule}</li>
                {offering.classDuration && (
                  <li>⏳ Duración de cada clase: {offering.classDuration}</li>
                )}
                {offering.frequency && <li>🔁 Frecuencia: {offering.frequency}</li>}
                {offering.duration && <li>🗓 Duración del curso: {offering.duration}</li>}
                {offering.modality === "presencial" && offering.location && (
                  <li className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {offering.location}
                  </li>
                )}
                {offering.capacity && (
                  <li className="flex items-start gap-1.5">
                    <Ticket className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    Cupo máximo: {offering.capacity} personas
                  </li>
                )}
              </ul>

              {offering.requisitos && (
                <div className="border-t border-border pt-4">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <ClipboardList className="size-4 text-brand" aria-hidden="true" />
                    Requisitos
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{offering.requisitos}</p>
                </div>
              )}

              {includes.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
                    Incluye
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-ink-soft">
                    {includes.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <Package className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {price && (
                <div className="border-t border-border pt-4">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <Clock3 className="size-4 text-brand" aria-hidden="true" />
                    Costos
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{price}</p>
                </div>
              )}

              {offering.studyPlanUrl && (
                <div className="border-t border-border pt-4">
                  <a
                    href={offering.studyPlanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                  >
                    <Link2 className="size-4" aria-hidden="true" />
                    Ver plan de estudios
                  </a>
                </div>
              )}

              {offering.details.length > 0 && (
                <ul className="space-y-1 border-t border-border pt-4 text-sm text-ink-soft">
                  {offering.details.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}

              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "pill", size: "sm" }), "mt-2")}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Inscribirse
              </a>
            </DialogContent>
          </Dialog>

          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "pill", size: "sm" }))}
          >
            Inscribirse
          </a>
        </div>
        </div>
      </div>
    </article>
  );
}
