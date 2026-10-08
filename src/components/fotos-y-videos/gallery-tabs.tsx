"use client";

import { useState, type ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = { key: string; label: string; content: ReactNode };

/** Pestañas para alternar entre galerías: muestra una sola a la vez, la primera por defecto. */
export function GalleryTabs({ tabs, ariaLabel }: { tabs: Tab[]; ariaLabel: string }) {
  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="mb-10 flex items-center justify-center gap-3"
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === current.key}
            onClick={() => setActive(t.key)}
            className={cn(
              buttonVariants({
                variant: t.key === current.key ? "pill" : "pill-outline",
                size: "xl",
              })
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Solo se monta la pestaña activa: al cambiar se resetea su estado (paginación, reproductor) */}
      <div role="tabpanel" aria-label={current.label} key={current.key}>
        {current.content}
      </div>
    </>
  );
}
