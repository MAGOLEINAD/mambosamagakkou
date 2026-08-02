import type { CourseSlug } from "@/lib/courses";

export type StudyPlanSection = {
  title: string;
  items: string[];
};

export type StudyPlanDocument = {
  title: string;
  fileUrl: string;
};

export type StudyPlan = {
  /** Set to true once real content below has been filled in. */
  available: boolean;
  intro?: string;
  sections?: StudyPlanSection[];
  documents?: StudyPlanDocument[];
};

export const STUDY_PLANS: Record<CourseSlug, StudyPlan> = {
  japones: {
    available: true,
    intro:
      "Nuestro plan de estudio de japonés guía a los estudiantes a través de los desafíos únicos del idioma: la progresión sistemática por hiragana, katakana y kanji, la estructura gramatical (partículas, honoríficos y conjugaciones distintas de los idiomas occidentales), la pronunciación y entonación desde el nivel principiante, y la relevancia cultural de modismos, saludos y etiqueta social.",
    sections: [
      {
        title: "Niveles disponibles",
        items: ["Introductorio", "N7", "N6", "JLPT N5"],
      },
    ],
    documents: [
      {
        title: "Introductorio",
        fileUrl: "/images/programas/japones/Plan-de-Estudio-de-Japones-Introductorio.pdf",
      },
      {
        title: "N7",
        fileUrl: "/images/programas/japones/Plan-de-Estudio-Japones-N7.pdf",
      },
      {
        title: "N6",
        fileUrl: "/images/programas/japones/Plan-de-Estudio-Japones-N6.pdf",
      },
      {
        title: "JLPT N5",
        fileUrl:
          "/images/programas/japones/Plan-de-Estudio-Completo-para-JLPT-N5-Guia-Definitiva-para-Principiantes.pdf",
      },
    ],
  },
  coreano: {
    available: true,
    intro:
      "Nuestro plan de estudio de coreano guía a los estudiantes a través de los desafíos únicos del idioma: la progresión sistemática por el hangul, la estructura gramatical (partículas, honoríficos y conjugaciones distintas de los idiomas occidentales), la pronunciación y entonación desde el nivel principiante, y la relevancia cultural de modismos, saludos y etiqueta social. El programa está organizado según los niveles del examen TOPIK.",
    sections: [
      {
        title: "Niveles disponibles",
        items: ["TOPIK I (niveles 1 y 2)", "TOPIK II (niveles 3 a 6)"],
      },
    ],
    documents: [
      {
        title: "TOPIK I (niveles 1 y 2)",
        fileUrl:
          "/images/programas/coreano/Plan-de-Estudio-Completo-TOPIK-I-Niveles-1-y-2.pdf",
      },
      {
        title: "TOPIK II (niveles 3 a 6)",
        fileUrl:
          "/images/programas/coreano/Plan-de-Estudio-Completo-TOPIK-II-Niveles-3a6.pdf",
      },
    ],
  },
  "chino-mandarin": {
    available: true,
    intro:
      "Nuestro plan de estudio de chino mandarín guía a los estudiantes a través de los desafíos únicos del idioma: la progresión sistemática por caracteres y pinyin, la estructura gramatical, la pronunciación y los tonos desde el nivel principiante, y la relevancia cultural de modismos, saludos y etiqueta social. El programa está organizado según los niveles del examen HSK.",
    sections: [
      {
        title: "Niveles disponibles",
        items: ["Introductorio", "HSK 1", "HSK 2", "HSK 3"],
      },
    ],
    documents: [
      {
        title: "Introductorio",
        fileUrl: "/images/programas/chino/Plan de estudio Chino introductorio.pdf",
      },
      {
        title: "HSK 1",
        fileUrl: "/images/programas/chino/Programa-de-Idiomas-Chino-HSK 1.pdf",
      },
      {
        title: "HSK 2",
        fileUrl: "/images/programas/chino/Programa-de-Idiomas-Chino-HSK 2.pdf",
      },
      {
        title: "HSK 3",
        fileUrl: "/images/programas/chino/Programa-de-Idiomas-Chino-HSK 3.pdf",
      },
    ],
  },
};
