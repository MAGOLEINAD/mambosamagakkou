"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  CalendarClock,
  UserCheck,
  MessagesSquare,
  Network,
  ListChecks,
  BookOpen,
  Zap,
} from "lucide-react";

const BENEFICIOS: { title: string; icon: LucideIcon }[] = [
  { title: "Inmersión lingüística y cultural", icon: Globe2 },
  { title: "Flexibilidad de modalidad", icon: CalendarClock },
  { title: "Atención Personalizada", icon: UserCheck },
  { title: "Desarrollo de habilidades de comunicación", icon: MessagesSquare },
  { title: "Red de contactos", icon: Network },
  { title: "Estructura y compromiso", icon: ListChecks },
  { title: "Acceso a recursos en línea y físicos", icon: BookOpen },
  { title: "Feedback inmediato", icon: Zap },
];

function Numeral({ index }: { index: number }) {
  return (
    <span className="font-heading text-2xl font-semibold text-gold/70 sm:text-3xl">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

export function BeneficiosList() {
  const half = Math.ceil(BENEFICIOS.length / 2);
  const columns = [BENEFICIOS.slice(0, half), BENEFICIOS.slice(half)];
  const slides = chunk(BENEFICIOS, 4);

  return (
    <div>
      {/* Mobile: swipeable carousel, several beneficios per card */}
      <div className="sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.05}
          className="!pb-10 [--swiper-pagination-bullet-inactive-color:var(--color-border)] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:var(--color-brand)]"
        >
          {slides.map((group, gi) => (
            <SwiperSlide key={gi}>
              <div className="rounded-2xl border border-border bg-white px-6 shadow-sm">
                {group.map(({ title, icon }, i) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 border-t border-gold/20 py-5 first:border-t-0"
                  >
                    <Numeral index={gi * 4 + i} />
                    <IconBadge icon={icon} />
                    <p className="text-base font-medium text-ink">{title}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: editorial numbered list, no cards */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-x-16">
        {columns.map((col, ci) => (
          <div key={ci}>
            {col.map(({ title, icon }, i) => (
              <div
                key={title}
                className="flex items-center gap-5 border-t border-gold/25 py-6 first:border-t-0"
              >
                <Numeral index={ci * half + i} />
                <IconBadge icon={icon} />
                <p className="text-lg font-medium text-ink">{title}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
