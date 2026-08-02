import Link from "next/link";
import { verifySession } from "@/lib/auth/dal";
import { logout } from "@/lib/auth/actions";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifySession();

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-white">
        <Container className="flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin/cursos" className="font-heading text-lg font-semibold text-ink">
              Administración
            </Link>
            <Link href="/admin/cursos" className="text-sm text-ink-soft hover:text-ink">
              Cursos
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-ink-soft hover:text-ink">
              Ver sitio
            </Link>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Cerrar sesión
              </Button>
            </form>
          </div>
        </Container>
      </header>
      <main className="py-10">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
