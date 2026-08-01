import { ADDRESS, EMAIL, PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/constants";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  description:
    "Academia de idiomas orientales en Buenos Aires. Cursos de Japonés, Coreano y Chino Mandarín para adultos y niños, en modalidad presencial y virtual, todos los niveles.",
  email: EMAIL,
  telephone: PHONE_DISPLAY,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Azcuénaga 714, Espacio Delfos",
    addressLocality: "CABA",
    postalCode: "C1029",
    addressCountry: "AR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
};
