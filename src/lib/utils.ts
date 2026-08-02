import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Parses a "YYYY-MM-DD" value into a local Date (avoids UTC-parsing day-shift bugs). Returns undefined if malformed. */
export function parseDateInput(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return undefined
  const [, year, month, day] = match
  return new Date(Number(year), Number(month) - 1, Number(day))
}

/** Formats a Date as the "YYYY-MM-DD" string used by date input values. */
export function formatDateInputValue(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/** Formats a "YYYY-MM-DD" date input value as "4 de agosto de 2026" (es-AR). Falls back to the raw value otherwise. */
export function formatStartDate(value: string) {
  const date = parseDateInput(value)
  if (!date) return value
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  })
}
