export type CourseSlug = "japones" | "coreano" | "chino-mandarin";

export type Course = {
  slug: CourseSlug;
  name: string;
  image: string;
  imageAlt: string;
  /** Flag-inspired accent colors, used sparingly (underline/dot only). */
  accent: { primary: string; secondary: string };
  whatsappMessage: string;
};

export const COURSES: Course[] = [
  {
    slug: "japones",
    name: "Japonés",
    image: "/images/curso-japones.jpg",
    imageAlt: "Clases de japonés presenciales y virtuales en Buenos Aires",
    accent: { primary: "#BC002D", secondary: "#FFFFFF" },
    whatsappMessage: "Hola! Quisiera información sobre el curso de Japonés.",
  },
  {
    slug: "coreano",
    name: "Coreano",
    image: "/images/curso-coreano.jpg",
    imageAlt: "Clases de coreano presenciales y virtuales en Buenos Aires",
    accent: { primary: "#003478", secondary: "#C60C30" },
    whatsappMessage: "Hola! Quisiera información sobre el curso de Coreano.",
  },
  {
    slug: "chino-mandarin",
    name: "Chino Mandarín",
    image: "/images/curso-chino-mandarin.jpg",
    imageAlt: "Clases de chino mandarín presenciales y virtuales en Buenos Aires",
    accent: { primary: "#DE2910", secondary: "#FFDE00" },
    whatsappMessage: "Hola! Quisiera información sobre el curso de Chino Mandarín.",
  },
];

export function getCourse(slug: CourseSlug) {
  return COURSES.find((c) => c.slug === slug)!;
}
