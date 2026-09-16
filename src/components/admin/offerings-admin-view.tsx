"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { CourseOffering } from "@/lib/course-offerings";
import { createAction, updateAction } from "@/app/admin/(protected)/cursos/actions";
import { OfferingList } from "@/components/admin/offering-list";
import { OfferingForm } from "@/components/admin/offering-form";
import {
  OfferingsFilters,
  filtrarOfferings,
  FILTROS_VACIOS,
  type OfferingFilters,
} from "@/components/admin/offerings-filters";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function OfferingsAdminView({ offerings }: { offerings: CourseOffering[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editingOffering, setEditingOffering] = useState<CourseOffering | null>(null);
  const [filtros, setFiltros] = useState<OfferingFilters>(FILTROS_VACIOS);

  const visibles = filtrarOfferings(offerings, filtros);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">Cursos disponibles</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Gestioná las ofertas de cursos que se muestran en /cursos.
          </p>
        </div>
        <Button type="button" variant="pill" onClick={() => setCreateOpen(true)}>
          <Plus className="size-4" aria-hidden="true" />
          Nueva oferta
        </Button>
      </div>

      {/* Los filtros solo aparecen cuando hay lista que filtrar: con dos cursos
          cargados son ruido, y en el estado vacío no tienen nada que hacer. */}
      {offerings.length > 3 && (
        <div className="mt-8">
          <OfferingsFilters
            filtros={filtros}
            onChange={setFiltros}
            total={offerings.length}
            visibles={visibles.length}
          />
        </div>
      )}

      <div className="mt-6">
        {offerings.length > 0 && visibles.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-white p-8 text-center text-sm text-ink-soft">
            Ningún curso coincide con los filtros.
          </p>
        ) : (
          <OfferingList offerings={visibles} onEdit={setEditingOffering} />
        )}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nueva oferta</DialogTitle>
          </DialogHeader>
          <OfferingForm action={createAction} onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={editingOffering !== null}
        onOpenChange={(open) => {
          if (!open) setEditingOffering(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar oferta</DialogTitle>
          </DialogHeader>
          {editingOffering && (
            <OfferingForm
              key={editingOffering._id}
              action={updateAction.bind(null, editingOffering._id)}
              offering={editingOffering}
              onSuccess={() => setEditingOffering(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
