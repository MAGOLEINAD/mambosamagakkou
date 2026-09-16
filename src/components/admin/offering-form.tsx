"use client";

import Image from "next/image";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  Heading,
  Languages,
  MapPinned,
  Sprout,
  CalendarDays,
  ClipboardList,
  BadgeCheck,
  Hourglass,
  Clock,
  Repeat,
  Ticket,
  MapPin,
  ListChecks,
  MessageCircle,
  ImageIcon,
  ArrowUpDown,
  Eye,
  Link2,
  GraduationCap,
  Wallet,
  Landmark,
  Banknote,
  CreditCard,
  Hash,
  ChevronDown,
} from "lucide-react";
import type { CourseOffering, OfferingLevel } from "@/lib/course-offerings";
import { LANGUAGE_LABELS, type CourseSlug } from "@/lib/courses";
import { ALL_LEVELS, LEVEL_LABELS, LEVEL_FLAGS, MODALITY_FLAGS } from "@/lib/offering-display";
import type { OfferingFormState } from "@/app/admin/(protected)/cursos/actions";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OfferingDetailRowsInput } from "@/components/admin/offering-detail-rows-input";
import { DatePickerField } from "@/components/admin/date-picker-field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectList,
  SelectItem,
  SelectItemText,
} from "@/components/ui/select";

type OfferingFormAction = (
  state: OfferingFormState,
  formData: FormData
) => Promise<OfferingFormState>;

const LANGUAGES: CourseSlug[] = ["japones", "coreano", "chino-mandarin"];

const MODALITIES: { value: "presencial" | "virtual"; label: string }[] = [
  { value: "presencial", label: `${MODALITY_FLAGS.presencial} Presencial` },
  { value: "virtual", label: `${MODALITY_FLAGS.virtual} Virtual` },
];

const LEVELS: { value: OfferingLevel; label: string }[] = ALL_LEVELS.map((level) => ({
  value: level,
  label: `${LEVEL_FLAGS[level]} ${LEVEL_LABELS[level]}`,
}));

type MaterialsOption = "none" | "digital" | "fisico";

function fieldError(state: OfferingFormState, field: string) {
  return state?.errors?.[field]?.[0];
}

function FieldLabel({
  htmlFor,
  icon: Icon,
  children,
}: {
  htmlFor?: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-sm font-medium text-ink">
      <Icon className="size-4 text-brand" aria-hidden="true" />
      {children}
    </label>
  );
}

type SeccionId = "basica" | "incluye" | "horarios" | "costos" | "otros";

/**
 * Sección plegable del formulario.
 *
 * OJO: el contenido se OCULTA con CSS, no se desmonta. El submit arma el body
 * con `new FormData(form)`, así que un input desmontado no viajaría y los
 * campos obligatorios de una sección cerrada harían fallar la validación.
 *
 * El `data-section` lo usa el efecto de errores para abrir sola la sección
 * donde vive el campo que falta, sin tener que mantener un mapa a mano.
 */
function FormSection({
  id,
  titulo,
  abierta,
  onToggle,
  children,
}: {
  id: SeccionId;
  titulo: string;
  abierta: boolean;
  onToggle: (abierta: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <section data-section={id} className="overflow-hidden rounded-xl border border-border">
      <button
        type="button"
        onClick={() => onToggle(!abierta)}
        aria-expanded={abierta}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
          abierta ? "bg-brand/5 hover:bg-brand/10" : "hover:bg-paper"
        )}
      >
        <span
          className={cn(
            "font-heading text-base font-semibold",
            abierta ? "text-brand-dark" : "text-ink"
          )}
        >
          {titulo}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform",
            abierta ? "rotate-180 text-brand" : "text-ink-soft"
          )}
          aria-hidden="true"
        />
      </button>
      <div className={cn("space-y-6 border-t border-border px-4 py-4", !abierta && "hidden")}>
        {children}
      </div>
    </section>
  );
}

type FormValues = {
  title: string;
  language: CourseSlug;
  modality: "presencial" | "virtual";
  level: OfferingLevel;
  requisitos: string;
  includesCertificate: boolean;
  includesRecordings: boolean;
  includesWhatsappGroup: boolean;
  includesCampusVirtual: boolean;
  includesMaterials: MaterialsOption;
  schedule: string;
  classDuration: string;
  frequency: string;
  duration: string;
  studyPlanUrl: string;
  capacity: string;
  location: string;
  tuitionFee: string;
  monthlyFee: string;
  cashMonthlyFee: string;
  transferTotal: string;
  cashTotal: string;
  cardTotal: string;
  cardInstallments: string;
  whatsappMessage: string;
  order: string;
  isActive: boolean;
};

function initialValues(offering?: CourseOffering): FormValues {
  return {
    title: offering?.title ?? "",
    language: offering?.language ?? "japones",
    modality: offering?.modality ?? "presencial",
    level: offering?.level ?? "inicial",
    requisitos: offering?.requisitos ?? "",
    includesCertificate: offering?.includes?.certificate ?? false,
    includesRecordings: offering?.includes?.recordings ?? false,
    includesWhatsappGroup: offering?.includes?.whatsappGroup ?? false,
    includesCampusVirtual: offering?.includes?.campusVirtual ?? false,
    includesMaterials: offering?.includes?.materials ?? "none",
    schedule: offering?.schedule ?? "",
    classDuration: offering?.classDuration ?? "",
    frequency: offering?.frequency ?? "",
    duration: offering?.duration ?? "",
    studyPlanUrl: offering?.studyPlanUrl ?? "",
    capacity: offering?.capacity != null ? String(offering.capacity) : "",
    location: offering?.location ?? "",
    tuitionFee: offering?.tuitionFee != null ? String(offering.tuitionFee) : "",
    monthlyFee: offering?.monthlyFee != null ? String(offering.monthlyFee) : "",
    cashMonthlyFee: offering?.cashMonthlyFee != null ? String(offering.cashMonthlyFee) : "",
    transferTotal: offering?.transferTotal != null ? String(offering.transferTotal) : "",
    cashTotal: offering?.cashTotal != null ? String(offering.cashTotal) : "",
    cardTotal: offering?.cardTotal != null ? String(offering.cardTotal) : "",
    cardInstallments:
      offering?.cardInstallments != null ? String(offering.cardInstallments) : "",
    whatsappMessage: offering?.whatsappMessage ?? "",
    order: offering?.order != null ? String(offering.order) : "0",
    isActive: offering?.isActive ?? true,
  };
}

export function OfferingForm({
  action,
  offering,
  onSuccess,
}: {
  action: OfferingFormAction;
  offering?: CourseOffering;
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [values, setValues] = useState<FormValues>(() => initialValues(offering));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    offering?.imageUrl ?? null
  );

  // Al crear un curso hay que llenar todo, así que arranca abierta la primera.
  // Al editar uno existente, todo cerrado: casi siempre se viene a tocar una
  // sola cosa y el formulario es largo.
  const [abiertas, setAbiertas] = useState<Record<SeccionId, boolean>>(() => ({
    basica: !offering,
    incluye: false,
    horarios: false,
    costos: false,
    otros: false,
  }));

  const toggleSeccion = (seccion: SeccionId) => (abierta: boolean) =>
    setAbiertas((prev) => ({ ...prev, [seccion]: abierta }));

  const todoAbierto = Object.values(abiertas).every(Boolean);
  const alternarTodo = () =>
    setAbiertas({
      basica: !todoAbierto,
      incluye: !todoAbierto,
      horarios: !todoAbierto,
      costos: !todoAbierto,
      otros: !todoAbierto,
    });

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
      return;
    }
    const firstErrorField = state?.errors ? Object.keys(state.errors)[0] : undefined;
    if (!firstErrorField) return;

    // La sección del campo que falta se abre sola: si queda cerrada, el usuario
    // no ve qué tiene mal. El scroll va a la SECCIÓN y no al campo, porque un
    // campo oculto con display:none no tiene caja y scrollIntoView no hace nada.
    requestAnimationFrame(() => {
      const campo = document.getElementById(firstErrorField);
      const seccionEl = campo?.closest<HTMLElement>("[data-section]");
      const seccion = seccionEl?.dataset.section as SeccionId | undefined;
      if (seccion) {
        setAbiertas((prev) => ({ ...prev, [seccion]: true }));
      }
      (seccionEl ?? campo)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [state, onSuccess]);

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  // Valor de cada cuota de tarjeta: derivado, nunca se guarda, así no puede
  // quedar desincronizado con el total ni con la cantidad de cuotas.
  const totalTarjeta = Number(values.cardTotal);
  const cantidadCuotas = Number(values.cardInstallments);
  const cuotaTarjeta =
    totalTarjeta > 0 && cantidadCuotas > 0
      ? formatCurrency(Math.round(totalTarjeta / cantidadCuotas))
      : null;

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
  }

  // Uploaded files can't be re-applied to a native <input type="file"> after a
  // failed submission resets it, so we keep the picked File in state and, if the
  // (now-empty) native input has nothing on the next submit, re-attach it here —
  // otherwise a validation error on another field would silently drop the image.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nativeImage = formData.get("image");
    const hasNativeFile = nativeImage instanceof File && nativeImage.size > 0;
    if (!hasNativeFile && selectedFile) {
      formData.set("image", selectedFile);
    }
    startTransition(() => {
      formAction(formData);
    });
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={alternarTodo}
          className="text-sm font-medium text-brand hover:text-brand-dark hover:underline"
        >
          {todoAbierto ? "Contraer todo" : "Expandir todo"}
        </button>
      </div>

      <FormSection
        id="basica"
        titulo="Información básica"
        abierta={abiertas.basica}
        onToggle={toggleSeccion('basica')}
      >

      <div className="space-y-1.5">
        <FieldLabel htmlFor="title" icon={Heading}>
          Nombre del curso
        </FieldLabel>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Ej: JAPONÉS N7, N6, JLPT N5"
          className={inputClass}
        />
        {fieldError(state, "title") && (
          <p className="text-sm text-destructive">{fieldError(state, "title")}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="language" icon={Languages}>
            Idioma
          </FieldLabel>
          <Select<CourseSlug>
            items={LANGUAGES.map((language) => ({
              value: language,
              label: LANGUAGE_LABELS[language],
            }))}
            value={values.language}
            onValueChange={(next) => next && updateField("language", next)}
            name="language"
          >
            <SelectTrigger
              id="language"
              className={cn(inputClass, "flex items-center justify-between text-left")}
            >
              <SelectValue />
              <SelectIcon>
                <ChevronDown className="size-4 text-ink-soft" />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent>
              <SelectList>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language} value={language}>
                    <SelectItemText>{LANGUAGE_LABELS[language]}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="modality" icon={MapPinned}>
            Modalidad
          </FieldLabel>
          <Select<FormValues["modality"]>
            items={MODALITIES}
            value={values.modality}
            onValueChange={(next) => next && updateField("modality", next)}
            name="modality"
          >
            <SelectTrigger
              id="modality"
              className={cn(inputClass, "flex items-center justify-between text-left")}
            >
              <SelectValue />
              <SelectIcon>
                <ChevronDown className="size-4 text-ink-soft" />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent>
              <SelectList>
                {MODALITIES.map((modality) => (
                  <SelectItem key={modality.value} value={modality.value}>
                    <SelectItemText>{modality.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="level" icon={Sprout}>
            Nivel
          </FieldLabel>
          <Select<OfferingLevel>
            items={LEVELS}
            value={values.level}
            onValueChange={(next) => next && updateField("level", next)}
            name="level"
          >
            <SelectTrigger
              id="level"
              className={cn(inputClass, "flex items-center justify-between text-left")}
            >
              <SelectValue />
              <SelectIcon>
                <ChevronDown className="size-4 text-ink-soft" />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent>
              <SelectList>
                {LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <SelectItemText>{level.label}</SelectItemText>
                  </SelectItem>
                ))}
              </SelectList>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="startDate" icon={CalendarDays}>
            Fecha de inicio
          </FieldLabel>
          <DatePickerField id="startDate" name="startDate" defaultValue={offering?.startDate} />
          {fieldError(state, "startDate") && (
            <p className="text-sm text-destructive">{fieldError(state, "startDate")}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="requisitos" icon={ClipboardList}>
          Requisitos (opcional)
        </FieldLabel>
        <textarea
          id="requisitos"
          name="requisitos"
          rows={3}
          value={values.requisitos}
          onChange={(e) => updateField("requisitos", e.target.value)}
          placeholder="Ej: Inicial, desde 0, para personas sin conocimientos previos del idioma"
          className={inputClass}
        />
      </div>

      </FormSection>

      <FormSection
        id="incluye"
        titulo="Incluye (opcional)"
        abierta={abiertas.incluye}
        onToggle={toggleSeccion('incluye')}
      >

      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="includes.certificate"
            checked={values.includesCertificate}
            onChange={(e) => updateField("includesCertificate", e.target.checked)}
            className="size-4 rounded border-border"
          />
          <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
          Certificado oficial
        </label>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="includes.recordings"
            checked={values.includesRecordings}
            onChange={(e) => updateField("includesRecordings", e.target.checked)}
            className="size-4 rounded border-border"
          />
          <Clock className="size-4 text-brand" aria-hidden="true" />
          Grabaciones de las clases
        </label>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="includes.whatsappGroup"
            checked={values.includesWhatsappGroup}
            onChange={(e) => updateField("includesWhatsappGroup", e.target.checked)}
            className="size-4 rounded border-border"
          />
          <MessageCircle className="size-4 text-brand" aria-hidden="true" />
          Grupo de WhatsApp
        </label>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="includes.campusVirtual"
            checked={values.includesCampusVirtual}
            onChange={(e) => updateField("includesCampusVirtual", e.target.checked)}
            className="size-4 rounded border-border"
          />
          <GraduationCap className="size-4 text-brand" aria-hidden="true" />
          Campus Virtual
        </label>

        <div>
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={values.includesMaterials !== "none"}
              onChange={(e) =>
                updateField("includesMaterials", e.target.checked ? "digital" : "none")
              }
              className="size-4 rounded border-border"
            />
            <ListChecks className="size-4 text-brand" aria-hidden="true" />
            Materiales
          </label>
          {values.includesMaterials !== "none" && (
            <div className="mt-2 ml-6 flex gap-4 text-sm text-ink-soft">
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="includes.materials"
                  value="digital"
                  checked={values.includesMaterials === "digital"}
                  onChange={() => updateField("includesMaterials", "digital")}
                />
                Digitales
              </label>
              <label className="flex items-center gap-1.5">
                <input
                  type="radio"
                  name="includes.materials"
                  value="fisico"
                  checked={values.includesMaterials === "fisico"}
                  onChange={() => updateField("includesMaterials", "fisico")}
                />
                Físicos
              </label>
            </div>
          )}
          {values.includesMaterials === "none" && (
            <input type="hidden" name="includes.materials" value="none" />
          )}
        </div>
      </div>

      </FormSection>

      <FormSection
        id="horarios"
        titulo="Horarios y duración"
        abierta={abiertas.horarios}
        onToggle={toggleSeccion('horarios')}
      >

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="schedule" icon={Clock}>
            Día y horario
          </FieldLabel>
          <input
            id="schedule"
            name="schedule"
            type="text"
            value={values.schedule}
            onChange={(e) => updateField("schedule", e.target.value)}
            placeholder="Ej: Miércoles 20:00-21:00"
            className={inputClass}
          />
          {fieldError(state, "schedule") && (
            <p className="text-sm text-destructive">{fieldError(state, "schedule")}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="classDuration" icon={Hourglass}>
            Duración de cada clase
          </FieldLabel>
          <input
            id="classDuration"
            name="classDuration"
            type="text"
            value={values.classDuration}
            onChange={(e) => updateField("classDuration", e.target.value)}
            placeholder="Ej: 60 minutos"
            className={inputClass}
          />
          {fieldError(state, "classDuration") && (
            <p className="text-sm text-destructive">{fieldError(state, "classDuration")}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="frequency" icon={Repeat}>
            Frecuencia
          </FieldLabel>
          <input
            id="frequency"
            name="frequency"
            type="text"
            value={values.frequency}
            onChange={(e) => updateField("frequency", e.target.value)}
            placeholder="Ej: 1 clase por semana"
            className={inputClass}
          />
          {fieldError(state, "frequency") && (
            <p className="text-sm text-destructive">{fieldError(state, "frequency")}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="duration" icon={Hourglass}>
            Duración del curso (opcional)
          </FieldLabel>
          <input
            id="duration"
            name="duration"
            type="text"
            value={values.duration}
            onChange={(e) => updateField("duration", e.target.value)}
            placeholder="Ej: 5 meses"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="studyPlanUrl" icon={Link2}>
          Plan de estudios (URL, opcional)
        </FieldLabel>
        <input
          id="studyPlanUrl"
          name="studyPlanUrl"
          type="text"
          value={values.studyPlanUrl}
          onChange={(e) => updateField("studyPlanUrl", e.target.value)}
          placeholder="Ej: https://..."
          className={inputClass}
        />
        {fieldError(state, "studyPlanUrl") && (
          <p className="text-sm text-destructive">{fieldError(state, "studyPlanUrl")}</p>
        )}
      </div>

      </FormSection>

      <FormSection
        id="costos"
        titulo="Costos (opcional)"
        abierta={abiertas.costos}
        onToggle={toggleSeccion('costos')}
      >

      <p className="-mt-2 text-sm text-ink-soft">
        Todo es opcional: lo que dejes vacío no se muestra en el sitio.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="tuitionFee" icon={Wallet}>
            Matrícula
          </FieldLabel>
          <input
            id="tuitionFee"
            name="tuitionFee"
            type="number"
            min={0}
            value={values.tuitionFee}
            onChange={(e) => updateField("tuitionFee", e.target.value)}
            placeholder="Ej: 30000"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="monthlyFee" icon={Wallet}>
            Cuota mensual
          </FieldLabel>
          <input
            id="monthlyFee"
            name="monthlyFee"
            type="number"
            min={0}
            value={values.monthlyFee}
            onChange={(e) => updateField("monthlyFee", e.target.value)}
            placeholder="Ej: 55000"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="cashMonthlyFee" icon={Banknote}>
            Cuota mensual en efectivo
          </FieldLabel>
          <input
            id="cashMonthlyFee"
            name="cashMonthlyFee"
            type="number"
            min={0}
            value={values.cashMonthlyFee}
            onChange={(e) => updateField("cashMonthlyFee", e.target.value)}
            placeholder="Ej: 50000"
            className={inputClass}
          />
          <p className="text-xs text-ink-soft">Solo si es distinta a la de arriba.</p>
        </div>
      </div>

      {/* Precio total del curso según forma de pago */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="transferTotal" icon={Landmark}>
            Curso completo por transferencia
          </FieldLabel>
          <input
            id="transferTotal"
            name="transferTotal"
            type="number"
            min={0}
            value={values.transferTotal}
            onChange={(e) => updateField("transferTotal", e.target.value)}
            placeholder="Ej: 250000"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="cashTotal" icon={Banknote}>
            Curso completo en efectivo
          </FieldLabel>
          <input
            id="cashTotal"
            name="cashTotal"
            type="number"
            min={0}
            value={values.cashTotal}
            onChange={(e) => updateField("cashTotal", e.target.value)}
            placeholder="Ej: 240000"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="cardTotal" icon={CreditCard}>
            Curso completo con tarjeta
          </FieldLabel>
          <input
            id="cardTotal"
            name="cardTotal"
            type="number"
            min={0}
            value={values.cardTotal}
            onChange={(e) => updateField("cardTotal", e.target.value)}
            placeholder="Ej: 290000"
            className={inputClass}
          />
          <p className="text-xs text-ink-soft">
            Es el valor de referencia del curso: en el sitio se muestra primero y
            en grande, y transferencia y efectivo aparecen debajo como descuentos
            calculados sobre este número.
          </p>
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="cardInstallments" icon={Hash}>
            Cantidad de cuotas
          </FieldLabel>
          <input
            id="cardInstallments"
            name="cardInstallments"
            type="number"
            min={1}
            step={1}
            value={values.cardInstallments}
            onChange={(e) => updateField("cardInstallments", e.target.value)}
            placeholder="Ej: 3"
            className={inputClass}
          />
          {/* El valor de cada cuota no se guarda: se calcula al mostrarlo */}
          {cuotaTarjeta && (
            <p className="text-xs text-ink-soft">
              Queda en {values.cardInstallments} cuotas de{" "}
              <span className="font-semibold text-ink">{cuotaTarjeta}</span>
            </p>
          )}
        </div>
      </div>

      </FormSection>

      <FormSection
        id="otros"
        titulo="Otros"
        abierta={abiertas.otros}
        onToggle={toggleSeccion('otros')}
      >

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="location" icon={MapPin}>
            Ubicación (solo presencial)
          </FieldLabel>
          <input
            id="location"
            name="location"
            type="text"
            value={values.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="Ej: Espacio Delfos, Azcuénaga 714, CABA"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="capacity" icon={Ticket}>
            Cupo máximo (opcional)
          </FieldLabel>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            value={values.capacity}
            onChange={(e) => updateField("capacity", e.target.value)}
            placeholder="Ej: 15"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <FieldLabel icon={ListChecks}>Otros detalles (opcional)</FieldLabel>
        <OfferingDetailRowsInput defaultValues={offering?.details} />
      </div>

      <div className="space-y-1.5">
        <FieldLabel htmlFor="whatsappMessage" icon={MessageCircle}>
          Mensaje de WhatsApp (opcional)
        </FieldLabel>
        <input
          id="whatsappMessage"
          name="whatsappMessage"
          type="text"
          value={values.whatsappMessage}
          onChange={(e) => updateField("whatsappMessage", e.target.value)}
          placeholder="Si se deja vacío se genera uno automático con el título"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <FieldLabel htmlFor="image" icon={ImageIcon}>
            Imagen {offering ? "(dejar vacío para mantener)" : ""}
          </FieldLabel>
          {imagePreviewUrl && (
            <div className="relative mb-2 h-20 w-28 overflow-hidden rounded-lg border border-border">
              <Image
                src={imagePreviewUrl}
                alt={values.title || "Vista previa"}
                fill
                unoptimized={imagePreviewUrl.startsWith("blob:")}
                className="object-cover"
              />
            </div>
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={inputClass}
          />
          {selectedFile && (
            <p className="text-xs text-ink-soft">Seleccionada: {selectedFile.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <FieldLabel htmlFor="order" icon={ArrowUpDown}>
            Orden (menor primero)
          </FieldLabel>
          <input
            id="order"
            name="order"
            type="number"
            value={values.order}
            onChange={(e) => updateField("order", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="isActive"
          checked={values.isActive}
          onChange={(e) => updateField("isActive", e.target.checked)}
          className="size-4 rounded border-border"
        />
        <Eye className="size-4 text-brand" aria-hidden="true" />
        Activa (visible en /cursos)
      </label>

      </FormSection>

      {state?.message && <p className="text-sm text-destructive">{state.message}</p>}

      <Button type="submit" variant="pill" disabled={pending}>
        {pending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
