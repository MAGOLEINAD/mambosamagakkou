import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Acceso administrador | Mambosamagakkou",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
          <h1 className="font-heading text-xl font-semibold text-ink">Acceso administrador</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Ingresá tus credenciales para gestionar los cursos disponibles.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
