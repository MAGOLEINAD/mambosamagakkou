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
  Wallet,
  ChevronDown,
} from "lucide-react";
import type { CourseOffering, OfferingLevel } from "@/lib/course-offerings";
import { LANGUAGE_LABELS, type CourseSlug } from "@/lib/courses";
import { ALL_LEVELS, LEVEL_LABELS, LEVEL_FLAGS, MODALITY_FLAGS } from "@/lib/offering-display";
import type { OfferingFormState } from "@/app/admin/(protected)/cursos/actions";
import { cn } from "@/lib/utils";
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-t border-border pt-6 font-heading text-lg font-semibold text-ink first:border-t-0 first:pt-0">
      {children}
    </h3>
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

  useEffect(() => {
    if (state?.success) {
      onSuccess?.();
      return;
    }
    const firstErrorField = state?.errors ? Object.keys(state.errors)[0] : undefined;
    if (firstErrorField) {
      document
        .getElementById(firstErrorField)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state, onSuccess]);

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <SectionHeading>Información básica</SectionHeading>

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

      <SectionHeading>Incluye (opcional)</SectionHeading>

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

      <SectionHeading>Horarios y duración</SectionHeading>

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

      <SectionHeading>Costos (opcional)</SectionHeading>

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
      </div>

      <SectionHeading>Otros</SectionHeading>

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

      {state?.message && <p className="text-sm text-destructive">{state.message}</p>}

      <Button type="submit" variant="pill" disabled={pending}>
        {pending ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
