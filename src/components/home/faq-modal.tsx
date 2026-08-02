"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { FAQ_VIRTUAL, FAQ_PRESENCIAL, type FaqItem } from "@/lib/faq";
import { cn } from "@/lib/utils";

type Modalidad = "virtual" | "presencial";

const MODALIDAD_TABS: { value: Modalidad; label: string }[] = [
  { value: "virtual", label: "Virtual" },
  { value: "presencial", label: "Presencial" },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-sm font-semibold text-ink marker:content-none">
            {item.question}
            <ChevronDown
              className="size-4 shrink-0 text-brand transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-sm text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqModal({ triggerClassName }: { triggerClassName?: string }) {
  const [modalidad, setModalidad] = useState<Modalidad>("virtual");
  const items = modalidad === "virtual" ? FAQ_VIRTUAL : FAQ_PRESENCIAL;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="pill-outline"
            size="lg"
            className={cn("mt-8 inline-flex", triggerClassName)}
          />
        }
      >
        Preguntas Frecuentes
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Preguntas Frecuentes</DialogTitle>
          <DialogDescription>
            Elegí una modalidad para ver las preguntas frecuentes correspondientes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2" role="tablist" aria-label="Modalidad">
          {MODALIDAD_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={modalidad === tab.value}
              onClick={() => setModalidad(tab.value)}
              className={buttonVariants({
                variant: modalidad === tab.value ? "pill" : "pill-outline",
                size: "sm",
              })}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="-mr-2 flex-1 overflow-y-auto pr-2">
          <FaqAccordion items={items} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
