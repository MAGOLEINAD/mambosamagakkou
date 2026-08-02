"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { put, del } from "@vercel/blob";
import { verifySession } from "@/lib/auth/dal";
import {
  OfferingSchema,
  createOffering,
  updateOffering,
  deleteOffering,
  setOfferingActive,
  getOfferingById,
} from "@/lib/course-offerings";

export type OfferingFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
      success?: boolean;
    }
  | undefined;

function readFormValues(formData: FormData) {
  return {
    ...Object.fromEntries(formData),
    details: formData.getAll("details").filter((line) => typeof line === "string" && line.trim().length > 0),
    isActive: formData.get("isActive") === "on",
    includes: {
      certificate: formData.get("includes.certificate") === "on",
      recordings: formData.get("includes.recordings") === "on",
      whatsappGroup: formData.get("includes.whatsappGroup") === "on",
      materials: formData.get("includes.materials") || "none",
    },
  };
}

async function uploadImageIfProvided(formData: FormData): Promise<string | null | undefined> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const blob = await put(`course-offerings/${crypto.randomUUID()}-${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

async function deleteBlobIfExists(url: string | null | undefined) {
  if (!url) return;
  try {
    await del(url);
  } catch {
    // Ignore: the blob may already be gone, or the URL may point outside our store.
  }
}

export async function createAction(
  _state: OfferingFormState,
  formData: FormData
): Promise<OfferingFormState> {
  await verifySession();

  const parsed = OfferingSchema.safeParse(readFormValues(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const imageUrl = await uploadImageIfProvided(formData);

  await createOffering({ ...parsed.data, imageUrl: imageUrl ?? null });
  revalidatePath("/cursos");
  revalidatePath("/admin/cursos");
  return { success: true };
}

export async function updateAction(
  id: string,
  _state: OfferingFormState,
  formData: FormData
): Promise<OfferingFormState> {
  await verifySession();

  const parsed = OfferingSchema.safeParse(readFormValues(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const imageUrl = await uploadImageIfProvided(formData);

  if (imageUrl !== undefined) {
    const existing = await getOfferingById(id);
    await deleteBlobIfExists(existing?.imageUrl);
  }

  await updateOffering(id, {
    ...parsed.data,
    ...(imageUrl !== undefined ? { imageUrl } : {}),
  });
  revalidatePath("/cursos");
  revalidatePath("/admin/cursos");
  return { success: true };
}

const IdSchema = z.string().min(1);

export async function deleteAction(id: string) {
  await verifySession();
  IdSchema.parse(id);

  const existing = await getOfferingById(id);
  await deleteOffering(id);
  await deleteBlobIfExists(existing?.imageUrl);

  revalidatePath("/cursos");
  revalidatePath("/admin/cursos");
}

export async function toggleActiveAction(id: string, isActive: boolean) {
  await verifySession();
  IdSchema.parse(id);
  await setOfferingActive(id, isActive);
  revalidatePath("/cursos");
  revalidatePath("/admin/cursos");
}
