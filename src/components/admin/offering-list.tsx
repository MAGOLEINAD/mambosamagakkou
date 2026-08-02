"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { CourseOffering } from "@/lib/course-offerings";
import { LANGUAGE_LABELS } from "@/lib/courses";
import { deleteAction, toggleActiveAction } from "@/app/admin/(protected)/cursos/actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatStartDate } from "@/lib/utils";

export function OfferingList({
  offerings,
  onEdit,
}: {
  offerings: CourseOffering[];
  onEdit: (offering: CourseOffering) => void;
}) {
  const [deletingOffering, setDeletingOffering] = useState<CourseOffering | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    if (!deletingOffering) return;
    setIsDeleting(true);
    await deleteAction(deletingOffering._id);
    setIsDeleting(false);
    setDeletingOffering(null);
  }

  if (offerings.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-white p-8 text-center text-sm text-ink-soft">
        Todavía no cargaste ninguna oferta de curso.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-ink-soft">
          <tr>
            <th className="px-4 py-3 font-medium">Título</th>
            <th className="px-4 py-3 font-medium">Idioma</th>
            <th className="px-4 py-3 font-medium">Modalidad</th>
            <th className="px-4 py-3 font-medium">Inicio</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {offerings.map((offering) => (
            <tr key={offering._id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-medium text-ink">{offering.title}</td>
              <td className="px-4 py-3 text-ink-soft">{LANGUAGE_LABELS[offering.language]}</td>
              <td className="px-4 py-3 text-ink-soft capitalize">{offering.modality}</td>
              <td className="px-4 py-3 text-ink-soft">{formatStartDate(offering.startDate)}</td>
              <td className="px-4 py-3">
                <form
                  action={() => toggleActiveAction(offering._id, !offering.isActive)}
                >
                  <button
                    type="submit"
                    className={
                      offering.isActive
                        ? "rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand"
                        : "rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-ink-soft"
                    }
                  >
                    {offering.isActive ? "Activa" : "Inactiva"}
                  </button>
                </form>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(offering)}
                  >
                    <Pencil className="size-3.5" aria-hidden="true" />
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeletingOffering(offering)}
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                    Borrar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AlertDialog
        open={deletingOffering !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingOffering(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar esta oferta?</AlertDialogTitle>
            <AlertDialogDescription>
              {deletingOffering && (
                <>
                  Se va a borrar &ldquo;{deletingOffering.title}&rdquo; de forma permanente. Esta
                  acción no se puede deshacer.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setDeletingOffering(null)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Borrando..." : "Borrar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
