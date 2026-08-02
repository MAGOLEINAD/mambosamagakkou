"use client";

import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { GalleryVideo } from "@/lib/gallery";

function VideoEmbed({
  video,
  interactive = true,
}: {
  video: GalleryVideo;
  interactive?: boolean;
}) {
  const [activated, setActivated] = useState(interactive);

  return (
    <div className="scroll-mt-24">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border">
        <iframe
          src={`https://drive.google.com/file/d/${video.driveId}/preview`}
          title={video.title}
          allow="autoplay"
          allowFullScreen
          className="absolute inset-0 size-full scroll-mt-24"
        />
        {!activated && (
          <div
            role="button"
            tabIndex={0}
            aria-label={`Activar reproductor: ${video.title}`}
            onClick={() => setActivated(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActivated(true);
            }}
            className="absolute inset-0"
          />
        )}
      </div>
      <p className="mt-3 text-center font-heading text-base font-semibold text-ink">
        {video.title}
      </p>
    </div>
  );
}

export function VideoGallery({ videos }: { videos: GalleryVideo[] }) {
  return (
    <>
      {/* Mobile: swipeable carousel */}
      <div className="sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.05}
          className="pb-10! [--swiper-pagination-bullet-inactive-color:var(--color-border)] [--swiper-pagination-bullet-inactive-opacity:1] [--swiper-pagination-color:var(--color-brand)]"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.driveId} className="h-auto pb-1">
              <VideoEmbed video={video} interactive={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: grid */}
      <div className="hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoEmbed key={video.driveId} video={video} />
        ))}
      </div>
    </>
  );
}
