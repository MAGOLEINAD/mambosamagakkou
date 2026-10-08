import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHeader } from "@/components/layout/page-header";
import { GalleryTabs } from "@/components/fotos-y-videos/gallery-tabs";
import { PhotoGallery } from "@/components/fotos-y-videos/photo-gallery";
import { FeaturedVideo, VideoGallery } from "@/components/fotos-y-videos/video-gallery";
import { CELEBRACION_PHOTOS, FEATURED_VIDEO, INSTITUTO_PHOTOS, VIDEOS } from "@/lib/gallery";

export const metadata: Metadata = buildMetadata({
  title: "Fotos",
  path: "/fotos-y-videos",
  description:
    "Mirá fotos y videos de las clases y actividades de Mambosamagakkou, academia de idiomas orientales en Buenos Aires.",
});

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
          <div className="mt-10">
            <GalleryTabs
              ariaLabel="Galerías de fotos"
              tabs={[
                {
                  key: "instituto",
                  label: "Instituto",
                  content: <PhotoGallery photos={INSTITUTO_PHOTOS} />,
                },
                {
                  key: "celebracion",
                  label: "Celebración",
                  content: <PhotoGallery photos={CELEBRACION_PHOTOS} />,
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Galería" title="Videos" align="center" />
          <div className="mt-10">
            <GalleryTabs
              ariaLabel="Galerías de videos"
              tabs={[
                {
                  key: "institucional",
                  label: "Institucional",
                  content: <FeaturedVideo video={FEATURED_VIDEO} />,
                },
                { key: "otros", label: "Otros", content: <VideoGallery videos={VIDEOS} /> },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
