"use client";

import type { ReactNode } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Course } from "@/lib/courses";
import { STUDY_PLANS } from "@/lib/study-plans";
import { whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function StudyPlanDrawer({ course, trigger }: { course: Course; trigger: ReactNode }) {
  const plan = STUDY_PLANS[course.slug];

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="pill-outline" size="sm" />}>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Plan de estudio — {course.name}</SheetTitle>
          <SheetDescription>
            Programa, niveles y modalidades del curso de {course.name}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {plan.available && plan.sections ? (
            <div className="space-y-6">
              {plan.intro && <p className="text-sm text-ink-soft">{plan.intro}</p>}
              {plan.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-heading text-base font-semibold text-ink">
                    {section.title}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-soft">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-accent/40 p-4 text-sm text-ink-soft">
              <p>Estamos actualizando el contenido de este plan de estudio.</p>
              <p className="mt-2">
                Escribinos por WhatsApp para recibir el programa completo de {course.name}.
              </p>
            </div>
          )}
        </div>

        <SheetFooter>
          <a
            href={whatsappLink(
              `Hola! Quisiera recibir el plan de estudio completo de ${course.name}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "pill" }), "w-full justify-center")}
          >
            Pedir plan completo por WhatsApp
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
