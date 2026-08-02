import "server-only";
import { ObjectId, type Document, type WithId } from "mongodb";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import type { CourseSlug } from "@/lib/courses";

const LANGUAGES: [CourseSlug, ...CourseSlug[]] = ["japones", "coreano", "chino-mandarin"];
export const LEVELS = ["inicial", "intermedio", "avanzado", "todos"] as const;
export type OfferingLevel = (typeof LEVELS)[number];
const MATERIALS = ["none", "digital", "fisico"] as const;

const emptyToUndefined = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

export const OfferingSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio."),
  language: z.enum(LANGUAGES),
  modality: z.enum(["presencial", "virtual"]),
  level: z.enum(LEVELS),
  startDate: z.string().trim().min(1, "Indicá la fecha de inicio."),
  requisitos: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  includes: z.object({
    certificate: z.coerce.boolean().default(false),
    recordings: z.coerce.boolean().default(false),
    whatsappGroup: z.coerce.boolean().default(false),
    materials: z.enum(MATERIALS).default("none"),
  }),
  schedule: z.string().trim().min(1, "Indicá el día y horario."),
  classDuration: z.string().trim().min(1, "Indicá la duración de cada clase."),
  frequency: z.string().trim().min(1, "Indicá la frecuencia."),
  duration: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  studyPlanUrl: z.preprocess(
    emptyToUndefined,
    z.string().trim().url("Ingresá una URL válida.").optional()
  ),
  location: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  capacity: z.preprocess(emptyToUndefined, z.coerce.number().int().positive().optional()),
  tuitionFee: z.preprocess(emptyToUndefined, z.coerce.number().nonnegative().optional()),
  monthlyFee: z.preprocess(emptyToUndefined, z.coerce.number().nonnegative().optional()),
  details: z.array(z.string().trim().min(1)).default([]),
  whatsappMessage: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  isActive: z.coerce.boolean().default(true),
  order: z.coerce.number().int().default(0),
});

export type OfferingInput = z.infer<typeof OfferingSchema>;

export type CourseOffering = OfferingInput & {
  _id: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type CourseOfferingDocument = OfferingInput & {
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function toCourseOffering(doc: WithId<Document>): CourseOffering {
  const { _id, ...rest } = doc;
  return {
    ...(rest as CourseOfferingDocument),
    _id: _id.toString(),
  };
}

async function collection() {
  const db = await getDb();
  return db.collection<CourseOfferingDocument>("courseOfferings");
}

export async function getActiveOfferings(): Promise<CourseOffering[]> {
  const col = await collection();
  const docs = await col.find({ isActive: true }).sort({ order: 1 }).toArray();
  return docs.map(toCourseOffering);
}

export async function getAllOfferings(): Promise<CourseOffering[]> {
  const col = await collection();
  const docs = await col.find({}).sort({ order: 1 }).toArray();
  return docs.map(toCourseOffering);
}

export async function getOfferingById(id: string): Promise<CourseOffering | null> {
  if (!ObjectId.isValid(id)) return null;
  const col = await collection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  return doc ? toCourseOffering(doc) : null;
}

export async function createOffering(data: OfferingInput & { imageUrl: string | null }) {
  const col = await collection();
  const now = new Date();
  const result = await col.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return result.insertedId.toString();
}

export async function updateOffering(
  id: string,
  data: Partial<OfferingInput> & { imageUrl?: string | null }
) {
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date() } }
  );
}

export async function deleteOffering(id: string) {
  const col = await collection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function setOfferingActive(id: string, isActive: boolean) {
  const col = await collection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { isActive, updatedAt: new Date() } }
  );
}
