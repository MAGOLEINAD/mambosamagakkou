"use client";

import type { ReactNode } from "react";
import { BookOpen, Eye, Layers, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Course } from "@/lib/courses";
import { STUDY_PLANS } from "@/lib/study-plans";
import { whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HIGHLIGHT_TERMS = [
  "JLPT",
  "TOPIK",
  "HSK",
  "hiragana",
  "katakana",
  "kanji",
  "hangul",
  "pinyin",
];

const HIGHLIGHT_PATTERN = new RegExp(`(${HIGHLIGHT_TERMS.join("|")})`, "g");

function highlightTerms(text: string) {
  return text
    .split(HIGHLIGHT_PATTERN)
    .map((part, i) =>
      HIGHLIGHT_TERMS.includes(part) ? (
        <strong key={i} className="font-semibold text-ink">
          {part}
        </strong>
      ) : (
        part
      )
    );
}

export function StudyPlanDrawer({ course, trigger }: { course: Course; trigger: ReactNode }) {
  const plan = STUDY_PLANS[course.slug];

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="pill-outline" size="sm" />}>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="data-[side=right]:w-full data-[side=right]:sm:max-w-xl"
      >
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Plan de estudio — {course.name}</SheetTitle>
          <SheetDescription>
            Programa, niveles y modalidades del curso de {course.name}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {plan.available && plan.sections ? (
            <div className="space-y-7">
              {plan.intro && (
                <div className="flex gap-3 rounded-lg bg-accent/40 p-4 text-base text-ink-soft">
                  <BookOpen className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <p>{highlightTerms(plan.intro)}</p>
                </div>
              )}

              {plan.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-ink">
                    <Layers className="size-5 shrink-0 text-brand" aria-hidden="true" />
                    {section.title}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {section.items.map((item) => {
                      const doc = plan.documents?.find((d) => d.title === item);
                      return (
                        <li key={item}>
                          {doc ? (
                            <a
                              href={encodeURI(doc.fileUrl)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 text-base font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                            >
                              {item}
                              <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand">
                                <Eye className="size-4 shrink-0" aria-hidden="true" />
                                Ver programa
                              </span>
                            </a>
                          ) : (
                            <div className="rounded-lg border border-border px-4 py-3 text-base font-semibold text-ink">
                              {item}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-accent/40 p-4 text-base text-ink-soft">
              <p>Estamos actualizando el contenido de este plan de estudio.</p>
              <p className="mt-2">
                Escribinos por WhatsApp para recibir el <strong className="text-ink">programa completo</strong> de {course.name}.
              </p>
              <a
                href={whatsappLink(
                  `Hola! Quisiera recibir el programa completo de ${course.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "pill-outline", size: "sm" }), "mt-3 gap-2")}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
