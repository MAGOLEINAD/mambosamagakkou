"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/auth/session";
import { isAdminSession } from "@/lib/auth/dal";

const LoginSchema = z.object({
  username: z.string().trim().min(1, "Ingresá tu usuario."),
  password: z.string().min(1, "Ingresá tu contraseña."),
});

export type LoginState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const validatedFields = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, password } = validatedFields.data;

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    return { message: "El acceso de administrador no está configurado." };
  }

  const usernameMatches = username === adminUsername;
  const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

  if (!usernameMatches || !passwordMatches) {
    return { message: "Usuario o contraseña incorrectos." };
  }

  await createSession();
  redirect("/admin/cursos");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

/** Client-callable check used by the public header to decide whether to show the admin CTA. */
export async function checkAdminSession() {
  return isAdminSession();
}
