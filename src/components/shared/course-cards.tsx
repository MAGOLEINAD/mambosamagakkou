"use client";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { COURSES, type Course } from "@/lib/courses";
import { whatsappLink } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { StudyPlanDrawer } from "@/components/cursos/study-plan-drawer";
import { cn } from "@/lib/utils";

const FEATURES = ["Modalidad presencial y virtual", "Adultos y niños", "Todos los niveles"];

function CourseCard({ course, variant }: { course: Course; variant: "link" | "whatsapp" }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className="absolute inset-x-0 bottom-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, ${course.accent.primary} 50%, ${course.accent.secondary} 50%)`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-heading text-2xl font-semibold text-ink">{course.name}</h3>
        <ul className="mt-3 space-y-1 text-base text-ink-soft">
          {FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {variant === "link" ? (
            <Link href="/cursos" className={cn(buttonVariants({ variant: "pill", size: "sm" }))}>
              Información
            </Link>
          ) : (
            <>
              <a
                href={whatsappLink(course.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "pill", size: "sm" }))}
              >
                Inscribirse
              </a>
              <StudyPlanDrawer course={course} trigger="Plan de estudio" />
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function CourseCards({ variant }: { variant: "link" | "whatsapp" }) {
  return (
    <div>
      {/* Mobile: swipeable carousel */}
      <div className="sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.05}
          className="!pb-10 [--swiper-pagination-bullet-inactive-color:var(--color-border)] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:var(--color-brand)]"
        >
          {COURSES.map((course) => (
            <SwiperSlide key={course.slug} className="h-auto pb-1">
              <CourseCard course={course} variant={variant} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {COURSES.map((course) => (
          <CourseCard key={course.slug} course={course} variant={variant} />
        ))}
      </div>
    </div>
  );
}
