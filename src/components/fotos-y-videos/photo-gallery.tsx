"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Grid2x2, Grid3x3, LayoutGrid, X } from "lucide-react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALT = "Foto de una clase o actividad de Mambosamagakkou";
const SWIPE_THRESHOLD = 50;
/** Filas visibles por página en cada vista, para que el paginador quede siempre a la vista sin scrollear. */
const ROWS_PER_PAGE = 2;

type ViewSize = "grande" | "mediana" | "chica";

const VIEWS: Record<
  ViewSize,
  { label: string; icon: typeof Grid2x2; gridClass: string; cols: number; sizes: string }
> = {
  grande: {
    label: "Grande",
    icon: Grid2x2,
    gridClass: "grid-cols-4",
    cols: 4,
    sizes: "25vw",
  },
  mediana: {
    label: "Mediana",
    icon: LayoutGrid,
    gridClass: "grid-cols-5",
    cols: 5,
    sizes: "20vw",
  },
  chica: {
    label: "Chica",
    icon: Grid3x3,
    gridClass: "grid-cols-8",
    cols: 8,
    sizes: "12vw",
  },
};

function Thumbnail({
  photo,
  sizes,
  onOpen,
}: {
  photo: string;
  sizes: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-border"
    >
      <Image
        src={photo}
        alt={ALT}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 hidden items-center justify-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/30 group-hover:opacity-100 sm:flex">
        <Expand className="size-6 text-white" aria-hidden="true" />
      </span>
    </button>
  );
}

export function PhotoGallery({ photos }: { photos: string[] }) {
  const [view, setView] = useState<ViewSize>("mediana");
  const [page, setPage] = useState(1);
  const [index, setIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const pageSize = VIEWS[view].cols * ROWS_PER_PAGE;
  const totalPages = Math.ceil(photos.length / pageSize);
  const pageStart = (page - 1) * pageSize;
  const pagePhotos = photos.slice(pageStart, pageStart + pageSize);

  const goToPage = (p: number) => {
    setPage(p);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changeView = (v: ViewSize) => {
    setView(v);
    setPage(1);
  };

  const showPrev = () =>
    setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const showNext = () =>
    setIndex((i) => (i === null ? null : (i + 1) % photos.length));

  return (
    <>
      {/* Mobile: single-row horizontal swipe, doesn't grow the page vertically */}
      <div className="sm:hidden">
        <Swiper
          modules={[FreeMode, Scrollbar]}
          freeMode={{ enabled: true, momentum: true, momentumRatio: 1.4, sticky: true }}
          scrollbar={{ draggable: true, hide: false }}
          spaceBetween={12}
          slidesPerView={2.3}
          className="!pb-6 [--swiper-scrollbar-bg-color:var(--color-border)] [--swiper-scrollbar-drag-bg-color:var(--color-brand)] [--swiper-scrollbar-size:6px] [--swiper-scrollbar-sides-offset:0px]"
        >
          {photos.map((photo, i) => (
            <SwiperSlide key={photo} className="h-auto pb-1">
              <Thumbnail photo={photo} sizes="45vw" onOpen={() => setIndex(i)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: view-size picker + grid with numbered pagination */}
      <div ref={gridRef} className="hidden scroll-mt-24 sm:block">
        <div className="mb-6 flex items-center justify-center gap-2">
          {(Object.entries(VIEWS) as [ViewSize, (typeof VIEWS)[ViewSize]][]).map(
            ([key, cfg]) => {
              const Icon = cfg.icon;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => changeView(key)}
                  aria-pressed={view === key}
                  className={cn(
                    buttonVariants({ variant: view === key ? "pill" : "pill-outline", size: "sm" }),
                    "gap-1.5"
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {cfg.label}
                </button>
              );
            }
          )}
        </div>

        <div className={cn("grid gap-4", VIEWS[view].gridClass)}>
          {pagePhotos.map((photo, i) => (
            <Thumbnail
              key={photo}
              photo={photo}
              sizes={VIEWS[view].sizes}
              onOpen={() => setIndex(pageStart + i)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Paginación de fotos"
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Página anterior"
                className={cn(buttonVariants({ variant: "pill-outline", size: "icon" }))}
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  aria-current={p === page ? "page" : undefined}
                  className={cn(
                    buttonVariants({
                      variant: p === page ? "pill" : "pill-outline",
                      size: "icon",
                    })
                  )}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Página siguiente"
                className={cn(buttonVariants({ variant: "pill-outline", size: "icon" }))}
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-sm text-ink-soft">
              Página {page} de {totalPages} · {photos.length} fotos
            </p>
          </nav>
        )}
      </div>

      <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-none bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">Foto ampliada</DialogTitle>
          {index !== null && (
            <div
              className="relative"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const delta = e.changedTouches[0].clientX - touchStartX.current;
                if (delta > SWIPE_THRESHOLD) showPrev();
                else if (delta < -SWIPE_THRESHOLD) showNext();
                touchStartX.current = null;
              }}
            >
              <div className="relative h-[70vh] w-full overflow-hidden rounded-xl bg-black">
                <Image
                  src={photos[index]}
                  alt={ALT}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>

              <DialogClose
                render={
                  <button
                    type="button"
                    aria-label="Cerrar"
                    className="absolute top-2 right-2 flex size-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
                  />
                }
              >
                <X className="size-4.5" aria-hidden="true" />
              </DialogClose>

              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute top-1/2 left-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Foto siguiente"
                className="absolute top-1/2 right-2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>

              <p className="mt-3 text-center text-sm text-white/80">
                {index + 1} / {photos.length}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
