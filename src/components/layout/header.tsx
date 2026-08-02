"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { WhatsAppMenu } from "@/components/shared/whatsapp-menu";
import { checkAdminSession } from "@/lib/auth/actions";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminSession().then(setIsAdmin);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-paper/95 backdrop-blur supports-backdrop-filter:bg-paper/80">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Mambosamagakkou - Inicio">
          <Image
            src="/images/logo.png"
            alt="Mambosamagakkou - Academia de idiomas orientales"
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-full object-cover"
          />
          <span className="font-heading text-lg font-semibold text-ink">Mambosamagakkou</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand",
                  isActive ? "text-brand" : "text-ink-soft"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {isAdmin ? (
          <Link
            href="/admin/cursos"
            className={cn(buttonVariants({ variant: "pill", size: "lg" }), "hidden px-7 md:inline-flex")}
          >
            Admin
          </Link>
        ) : (
          <WhatsAppMenu
            align="end"
            side="bottom"
            sideOffset={10}
            trigger={
              <button
                type="button"
                className={cn(
                  buttonVariants({ variant: "pill", size: "lg" }),
                  "hidden px-7 md:inline-flex"
                )}
              />
            }
          >
            Inscribirse
          </WhatsAppMenu>
        )}

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú" />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-3/4 sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4" aria-label="Navegación móvil">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-accent hover:text-brand"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
              {isAdmin ? (
                <SheetClose
                  render={
                    <Link
                      href="/admin/cursos"
                      className={cn(
                        buttonVariants({ variant: "pill", size: "lg" }),
                        "mt-4 justify-center px-7"
                      )}
                    />
                  }
                >
                  Admin
                </SheetClose>
              ) : (
                <WhatsAppMenu
                  align="center"
                  side="top"
                  sideOffset={10}
                  trigger={
                    <button
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "pill", size: "lg" }),
                        "mt-4 justify-center px-7"
                      )}
                    />
                  }
                >
                  Inscribirse
                </WhatsAppMenu>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
