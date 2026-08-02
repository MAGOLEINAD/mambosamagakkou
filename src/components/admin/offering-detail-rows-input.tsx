"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function OfferingDetailRowsInput({ defaultValues = [] }: { defaultValues?: string[] }) {
  const [lines, setLines] = useState<string[]>(defaultValues.length > 0 ? defaultValues : [""]);

  function updateLine(index: number, value: string) {
    setLines((prev) => prev.map((line, i) => (i === index ? value : line)));
  }

  function removeLine(index: number) {
    setLines((prev) => (prev.length === 1 ? [""] : prev.filter((_, i) => i !== index)));
  }

  return (
    <div className="space-y-2">
      {lines.map((line, index) => (
        <div key={index} className="flex gap-2">
          <input
            name="details"
            value={line}
            onChange={(event) => updateLine(index, event.target.value)}
            placeholder="Ej: Matrícula $10.000 + cuota mensual $15.000"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-ink outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
          />
          <button
            type="button"
            onClick={() => removeLine(index)}
            className="shrink-0 rounded-lg border border-border px-3 text-sm text-ink-soft hover:text-ink"
          >
            Quitar
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setLines((prev) => [...prev, ""])}
      >
        + Agregar línea
      </Button>
    </div>
  );
}
