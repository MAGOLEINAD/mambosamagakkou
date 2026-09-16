"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { LANGUAGE_LABELS, type CourseSlug } from "@/lib/courses";
import { cn } from "@/lib/utils";
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

// Filtros de la lista de cursos del admin. El "todos" es un valor centinela y
// no un null: el Select de base-ui no muestra placeholder cuando el valor es
// nulo, y una opción vacía se ve como un bug.
export const TODOS = "__todos__";

export type OfferingFilters = {
  texto: string;
  idioma: string;
  modalidad: string;
  estado: string;
};

export const FILTROS_VACIOS: OfferingFilters = {
  texto: "",
  idioma: TODOS,
  modalidad: TODOS,
  estado: TODOS,
};

const IDIOMAS: CourseSlug[] = ["japones", "coreano", "chino-mandarin"];

const selectClass =
  "flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2 text-left text-sm text-ink outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20";

function FiltroSelect({
  label,
  value,
  onChange,
  opciones,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  opciones: { value: string; label: string }[];
}) {
  const items = [{ value: TODOS, label }, ...opciones];

  return (
    <Select<string>
      items={items}
      value={value}
      onValueChange={(next) => next && onChange(next)}
    >
      <SelectTrigger
        aria-label={label}
        className={cn(selectClass, value !== TODOS && "border-brand text-brand-dark")}
      >
        <SelectValue />
        <SelectIcon>
          <ChevronDown className="size-4 text-ink-soft" />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectList>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              <SelectItemText>{item.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}

export function OfferingsFilters({
  filtros,
  onChange,
  total,
  visibles,
}: {
  filtros: OfferingFilters;
  onChange: (filtros: OfferingFilters) => void;
  total: number;
  visibles: number;
}) {
  const hayFiltros =
    filtros.texto.trim() !== "" ||
    filtros.idioma !== TODOS ||
    filtros.modalidad !== TODOS ||
    filtros.estado !== TODOS;

  return (
    <div className="space-y-2">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
          <input
            type="search"
            name="buscar-curso"
            value={filtros.texto}
            onChange={(e) => onChange({ ...filtros, texto: e.target.value })}
            placeholder="Buscar por título..."
            aria-label="Buscar por título"
            className="w-full rounded-lg border border-border bg-white py-2 pr-3 pl-9 text-sm text-ink outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
          />
        </div>

        <FiltroSelect
          label="Todos los idiomas"
          value={filtros.idioma}
          onChange={(idioma) => onChange({ ...filtros, idioma })}
          opciones={IDIOMAS.map((i) => ({ value: i, label: LANGUAGE_LABELS[i] }))}
        />

        <FiltroSelect
          label="Todas las modalidades"
          value={filtros.modalidad}
          onChange={(modalidad) => onChange({ ...filtros, modalidad })}
          opciones={[
            { value: "presencial", label: "Presencial" },
            { value: "virtual", label: "Virtual" },
          ]}
        />

        <FiltroSelect
          label="Activas e inactivas"
          value={filtros.estado}
          onChange={(estado) => onChange({ ...filtros, estado })}
          opciones={[
            { value: "activa", label: "Solo activas" },
            { value: "inactiva", label: "Solo inactivas" },
          ]}
        />
      </div>

      {hayFiltros && (
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
          <span>
            {visibles} de {total} {total === 1 ? "curso" : "cursos"}
          </span>
          <button
            type="button"
            onClick={() => onChange(FILTROS_VACIOS)}
            className="inline-flex items-center gap-1 font-medium text-brand hover:text-brand-dark hover:underline"
          >
            <X className="size-3.5" aria-hidden="true" />
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}

export function filtrarOfferings<
  T extends {
    title: string;
    language: string;
    modality: string;
    isActive: boolean;
  },
>(offerings: T[], filtros: OfferingFilters): T[] {
  const texto = filtros.texto.trim().toLowerCase();

  return offerings.filter((o) => {
    if (texto && !o.title.toLowerCase().includes(texto)) return false;
    if (filtros.idioma !== TODOS && o.language !== filtros.idioma) return false;
    if (filtros.modalidad !== TODOS && o.modality !== filtros.modalidad) return false;
    if (filtros.estado !== TODOS && o.isActive !== (filtros.estado === "activa")) return false;
    return true;
  });
}
