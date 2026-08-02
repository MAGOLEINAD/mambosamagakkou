"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { CourseOffering } from "@/lib/course-offerings";
import { COURSES, LANGUAGE_FLAG_ICONS, LANGUAGE_LABELS, type CourseSlug } from "@/lib/courses";
import { whatsappLink } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { OfferingCard } from "@/components/cursos/offering-card";
import { cn } from "@/lib/utils";

const LANGUAGE_SLUGS = COURSES.map((course) => course.slug);

function isCourseSlug(value: string | null): value is CourseSlug {
  return value !== null && LANGUAGE_SLUGS.includes(value as CourseSlug);
}

function OfferingGroup({ label, offerings }: { label: string; offerings: CourseOffering[] }) {
  return (
    <div className="mt-12 first:mt-0">
      <h3 className="font-heading text-2xl font-semibold text-ink">{label}</h3>

      {/* Mobile: swipeable carousel */}
      <div className="mt-6 sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.05}
          className="!pb-10 [--swiper-pagination-bullet-inactive-color:var(--color-border)] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:var(--color-brand)]"
        >
          {offerings.map((offering) => (
            <SwiperSlide key={offering._id} className="h-auto pb-1">
              <OfferingCard offering={offering} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: grid */}
      <div className="mt-6 hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map((offering) => (
          <OfferingCard key={offering._id} offering={offering} />
        ))}
      </div>
    </div>
  );
}

export function OfferingsFilterableList({ offerings }: { offerings: CourseOffering[] }) {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get("idioma");
  const paramLanguage = isCourseSlug(paramValue) ? paramValue : null;

  const [language, setLanguage] = useState<CourseSlug | null>(paramLanguage);
  const [lastParamLanguage, setLastParamLanguage] = useState(paramLanguage);

  if (paramLanguage !== lastParamLanguage) {
    setLastParamLanguage(paramLanguage);
    setLanguage(paramLanguage);
  }

  const filtered = language ? offerings.filter((offering) => offering.language === language) : offerings;
  const presenciales = filtered.filter((offering) => offering.modality === "presencial");
  const virtuales = filtered.filter((offering) => offering.modality === "virtual");

  return (
    <div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          aria-pressed={language === null}
          onClick={() => setLanguage(null)}
          className={cn(
            buttonVariants({ variant: language === null ? "pill" : "pill-outline", size: "sm" })
          )}
        >
          Todos
        </button>
        {COURSES.map((course) => {
          const FlagIcon = LANGUAGE_FLAG_ICONS[course.slug];
          return (
            <button
              key={course.slug}
              type="button"
              aria-pressed={language === course.slug}
              onClick={() => setLanguage(course.slug)}
              className={cn(
                buttonVariants({
                  variant: language === course.slug ? "pill" : "pill-outline",
                  size: "sm",
                }),
                "gap-1.5"
              )}
            >
              <FlagIcon aria-hidden="true" className="h-3.5 w-auto rounded-[2px]" />
              {LANGUAGE_LABELS[course.slug]}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && language ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-white p-10 text-center">
          <p className="text-ink-soft">
            Por el momento no hay cursos de {LANGUAGE_LABELS[language]} disponibles.
          </p>
          <a
            href={whatsappLink(
              `Hola! Quisiera saber cuándo abren un nuevo curso de ${LANGUAGE_LABELS[language]}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "pill", size: "sm" }), "mt-4")}
          >
            Consultar por WhatsApp
          </a>
        </div>
      ) : (
        <div className="mt-4">
          {presenciales.length > 0 && (
            <OfferingGroup label="Cursos presenciales" offerings={presenciales} />
          )}
          {virtuales.length > 0 && (
            <OfferingGroup label="Cursos virtuales" offerings={virtuales} />
          )}
        </div>
      )}
    </div>
  );
}
