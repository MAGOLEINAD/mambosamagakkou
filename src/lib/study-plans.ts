import type { CourseSlug } from "@/lib/courses";

export type StudyPlanSection = {
  title: string;
  items: string[];
};

export type StudyPlan = {
  /** Set to true once real content below has been filled in. */
  available: boolean;
  intro?: string;
  sections?: StudyPlanSection[];
};

/**
 * TODO: replace with the real per-course study plan content (levels, modules,
 * durations) once supplied. Until then `available: false` makes
 * StudyPlanDrawer render a WhatsApp fallback instead of empty content.
 */
export const STUDY_PLANS: Record<CourseSlug, StudyPlan> = {
  japones: { available: false },
  coreano: { available: false },
  "chino-mandarin": { available: false },
};
