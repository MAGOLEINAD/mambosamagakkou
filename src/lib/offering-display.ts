import type { OfferingLevel } from "@/lib/course-offerings";

export const ALL_LEVELS: OfferingLevel[] = ["inicial", "intermedio", "avanzado", "todos"];

export const LEVEL_LABELS: Record<OfferingLevel, string> = {
  inicial: "Inicial",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
  todos: "Todos",
};

export const LEVEL_FLAGS: Record<OfferingLevel, string> = {
  inicial: "🌱",
  intermedio: "📚",
  avanzado: "🎓",
  todos: "🧑‍🎓",
};

export const MODALITY_LABELS: Record<"presencial" | "virtual", string> = {
  presencial: "Presencial",
  virtual: "Virtual",
};

export const MODALITY_FLAGS: Record<"presencial" | "virtual", string> = {
  presencial: "🏫",
  virtual: "💻",
};

export const MATERIALS_LABELS: Record<"digital" | "fisico", string> = {
  digital: "Digitales",
  fisico: "Físicos",
};
