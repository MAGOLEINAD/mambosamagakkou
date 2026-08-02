import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { PhotoGallery } from "@/components/fotos-y-videos/photo-gallery";
import { VideoGallery } from "@/components/fotos-y-videos/video-gallery";
import { PHOTOS, VIDEOS } from "@/lib/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Fotos",
  path: "/fotos-y-videos",
  description:
    "Mirá fotos y videos de las clases y actividades de Mambosamagakkou, academia de idiomas orientales en Buenos Aires.",
});

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-white/60 px-6 py-16 text-center">
      <Camera className="size-8 text-brand" aria-hidden="true" />
      <p className="text-base text-ink-soft">{message}</p>
    </div>
  );
}

export default function FotosYVideosPage() {
  return (
    <>
      <PageHeader
        image="/images/hero-home.jpg"
        imageAlt="Estudiantes de Mambosamagakkou en clase"
        eyebrow="Nuestra comunidad"
        title="Fotos"
        description="Un vistazo a nuestras clases, actividades y estudiantes."
      />

      <section className="pt-16 pb-8 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Galería" title="Fotos" align="center" />
          <div className="mt-12">
            {PHOTOS.length > 0 ? (
              <PhotoGallery photos={PHOTOS} />
            ) : (
              <EmptyState message="Muy pronto vamos a compartir fotos de nuestras clases." />
            )}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Institucional" title="Videos" align="center" />
          <div className="mt-12">
            {VIDEOS.length > 0 ? (
              <VideoGallery videos={VIDEOS} />
            ) : (
              <EmptyState message="Muy pronto vamos a compartir videos de nuestras clases." />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
