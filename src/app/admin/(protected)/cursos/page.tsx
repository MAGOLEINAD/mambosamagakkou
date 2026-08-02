import type { Metadata } from "next";
import { getAllOfferings } from "@/lib/course-offerings";
import { OfferingsAdminView } from "@/components/admin/offerings-admin-view";

export const metadata: Metadata = {
  title: "Cursos disponibles | Administración",
  robots: { index: false, follow: false },
};

export default async function AdminCursosPage() {
  const offerings = await getAllOfferings();

  return <OfferingsAdminView offerings={offerings} />;
}
