"use client";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { COURSES } from "@/lib/courses";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/lib/constants";

export function WhatsAppButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label="Escribinos por WhatsApp"
            className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
          />
        }
      >
        <WhatsAppIcon className="size-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" sideOffset={12} className="w-64">
        <p className="px-1.5 py-1 text-xs font-medium text-muted-foreground">
          ¿Sobre qué querés consultar?
        </p>
        <DropdownMenuSeparator />
        {COURSES.map((course) => (
          <DropdownMenuLinkItem
            key={course.slug}
            href={whatsappLink(course.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Curso de {course.name}
          </DropdownMenuLinkItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLinkItem
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulta general
        </DropdownMenuLinkItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
