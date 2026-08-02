import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth/session";

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginRoute = path === "/admin/login";
  const isProtectedRoute = path.startsWith("/admin") && !isLoginRoute;

  const cookie = request.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.admin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginRoute && session?.admin) {
    return NextResponse.redirect(new URL("/admin/cursos", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
