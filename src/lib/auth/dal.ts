import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "@/lib/auth/session";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.admin) {
    redirect("/admin/login");
  }

  return { isAuth: true as const };
});

/** Like verifySession, but returns a boolean instead of redirecting — for optional UI (e.g. header CTA). */
export const isAdminSession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return Boolean(session?.admin);
});
