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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

// Resumen corto para la cara de la card: lo mínimo que engancha. El detalle
// completo por forma de pago va en el drawer (ver priceRows).
function priceSummary(offering: CourseOffering) {
  const parts: string[] = [];
  if (offering.tuitionFee) parts.push(`Matrícula ${formatCurrency(offering.tuitionFee)}`);
  if (offering.monthlyFee) parts.push(`Cuota ${formatCurrency(offering.monthlyFee)}/mes`);
  if (parts.length > 0) return parts.join(" + ");

  // Cursos que se cobran de una sola vez: no tienen matrícula ni cuota.
  const total = offering.transferTotal ?? offering.cashTotal ?? offering.cardTotal;
  return total ? `Curso completo ${formatCurrency(total)}` : "";
}

// Costos del drawer, encuadrados comercialmente: el precio con tarjeta es el
// valor del curso completo (la referencia), y transferencia / efectivo se leen
// como PROMOS contra ese numero, con el ahorro explicito. Si no hay precio de
// tarjeta cargado, la referencia pasa a ser el total que haya, y lo que quede
// por debajo sigue siendo promo.
//
// Todo es opcional: lo que no tenga dato no aparece. Nunca "a consultar" ni $ 0.
type Promo = { label: string; total: number; ahorro: number; porcentaje: number };

function priceBlocks(offering: CourseOffering) {
  const referencia = offering.cardTotal ?? offering.transferTotal ?? offering.cashTotal ?? null;
  const referenciaEsTarjeta = offering.cardTotal != null;

  // El valor de cada cuota se calcula, no se guarda: asi no se desincroniza
  // con el total ni con la cantidad.
  const cuotaTarjeta =
    offering.cardTotal && offering.cardInstallments
      ? Math.round(offering.cardTotal / offering.cardInstallments)
      : null;

  const candidatos: { label: string; total: number | undefined }[] = [
    { label: "Transferencia", total: offering.transferTotal },
    { label: "Efectivo", total: offering.cashTotal },
  ];

  const promos: Promo[] = [];
  const otros: { label: string; total: number }[] = [];

  for (const c of candidatos) {
    if (c.total == null) continue;
    if (referencia == null || c.total === referencia) continue;
    if (c.total < referencia) {
      const ahorro = referencia - c.total;
      promos.push({
        label: c.label,
        total: c.total,
        ahorro,
        porcentaje: Math.round((ahorro / referencia) * 100),
      });
    } else {
      // Dato raro (un medio mas caro que la referencia): se muestra sin
      // inventarle un descuento negativo.
      otros.push({ label: c.label, total: c.total });
    }
  }

  // La matrícula se paga SIEMPRE, con cualquier forma de pago, así que va
  // aparte: metida entre las cuotas mensuales se leía como si solo aplicara a
  // esa vía, o peor, como un costo que se suma al curso completo.
  const matricula = offering.tuitionFee ?? null;

  // Cuotas mensuales: es otro eje (pagar mes a mes en vez del curso entero).
  const mensual: { label: string; value: string }[] = [];
  if (offering.monthlyFee) {
    const efectivo = offering.cashMonthlyFee
      ? ` · ${formatCurrency(offering.cashMonthlyFee)} en efectivo`
      : "";
    mensual.push({
      label: "Cuota mensual",
      value: `${formatCurrency(offering.monthlyFee)}/mes${efectivo}`,
    });
  } else if (offering.cashMonthlyFee) {
    mensual.push({
      label: "Cuota mensual en efectivo",
      value: `${formatCurrency(offering.cashMonthlyFee)}/mes`,
    });
  }

  const hayAlgo = referencia != null || mensual.length > 0 || matricula != null;

  return {
    referencia,
    referenciaEsTarjeta,
    cuotaTarjeta,
    matricula,
    promos,
    otros,
    mensual,
    hayAlgo,
  };
}

function includesList(offering: CourseOffering) {
  const items: string[] = [];
  if (offering.includes?.certificate) items.push("Certificado oficial");
  if (offering.includes?.recordings) items.push("Grabaciones de las clases");
  if (offering.includes?.whatsappGroup) items.push("Grupo de WhatsApp");
  if (offering.includes?.campusVirtual) items.push("Campus Virtual");
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
  const costos = priceBlocks(offering);
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
          <Sheet>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "pill-outline", size: "sm" }))}
            >
              Ver más detalles
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full overflow-y-auto data-[side=right]:w-full data-[side=right]:sm:max-w-xl"
            >
              <SheetHeader>
                <SheetTitle>{offering.title}</SheetTitle>
              </SheetHeader>
              <div className="flex-1 space-y-4 px-4 pb-6">
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

              {costos.hayAlgo && (
                <div className="border-t border-border pt-4">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <Clock3 className="size-4 text-brand" aria-hidden="true" />
                    Costos
                  </p>

                  {/* Valor del curso completo: el numero de referencia */}
                  {costos.referencia != null && (
                    <div className="mt-2">
                      <p className="text-xs font-medium tracking-wide text-ink-soft uppercase">
                        Curso completo
                      </p>
                      <p className="font-heading text-2xl font-semibold text-ink">
                        {formatCurrency(costos.referencia)}
                      </p>
                      {costos.referenciaEsTarjeta && (
                        <p className="text-sm text-ink-soft">
                          {costos.cuotaTarjeta
                            ? `con tarjeta de crédito, en ${offering.cardInstallments} cuotas de ${formatCurrency(costos.cuotaTarjeta)}`
                            : "con tarjeta de crédito"}
                        </p>
                      )}
                      {costos.matricula != null && (
                        <p className="mt-1.5 text-sm text-ink-soft">
                          <span className="font-semibold text-ink">
                            + {formatCurrency(costos.matricula)}
                          </span>{" "}
                          de matrícula, pago único con cualquier forma de pago
                        </p>
                      )}
                    </div>
                  )}

                  {/* Los otros medios, como promo contra ese valor */}
                  {costos.promos.length > 0 && (
                    <div className="mt-3 rounded-xl border border-brand/20 bg-brand/5 p-3">
                      <p className="text-xs font-semibold tracking-wide text-brand-dark uppercase">
                        Pagalo menos por otros medios
                      </p>
                      <ul className="mt-2 space-y-2 text-sm">
                        {costos.promos.map((promo) => (
                          <li
                            key={promo.label}
                            className="flex flex-wrap items-baseline justify-between gap-x-3"
                          >
                            <span className="text-ink-soft">{promo.label}</span>
                            <span className="text-right">
                              <span className="font-semibold text-ink">
                                {formatCurrency(promo.total)}
                              </span>
                              <span className="block text-xs font-medium text-brand-dark">
                                ahorrás {formatCurrency(promo.ahorro)} ({promo.porcentaje}%)
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pagar mes a mes: es una VÍA ALTERNATIVA al curso completo,
                      no un costo que se suma. De ahí el "O" del título: sin él
                      se leía como si hubiera que pagar las dos cosas. */}
                  {(costos.mensual.length > 0 ||
                    (costos.matricula != null && costos.referencia == null)) && (
                    <div className="mt-3 rounded-xl border border-border p-3">
                      <p className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
                        {costos.referencia != null ? "O pagalo mes a mes" : "Pago mensual"}
                      </p>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {costos.referencia == null && costos.matricula != null && (
                          <li className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                            <span className="text-ink-soft">Matrícula (pago único)</span>
                            <span className="font-semibold text-ink">
                              {formatCurrency(costos.matricula)}
                            </span>
                          </li>
                        )}
                        {costos.mensual.map((row) => (
                          <li
                            key={row.label}
                            className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5"
                          >
                            <span className="text-ink-soft">{row.label}</span>
                            <span className="font-semibold text-ink">{row.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {costos.otros.length > 0 && (
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {costos.otros.map((row) => (
                        <li
                          key={row.label}
                          className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5"
                        >
                          <span className="text-ink-soft">{row.label}</span>
                          <span className="font-semibold text-ink">
                            {formatCurrency(row.total)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
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
              </div>
            </SheetContent>
          </Sheet>

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
