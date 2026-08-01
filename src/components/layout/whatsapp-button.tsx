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
            className="fixed right-5 bottom-5 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105"
          />
        }
      >
        <WhatsAppIcon className="size-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="top"
        sideOffset={14}
        className="w-72 rounded-2xl border border-gold/20 bg-white p-2 shadow-2xl ring-0"
      >
        <p className="px-3 pt-2 pb-1.5 font-heading text-sm font-semibold text-ink">
          ¿Sobre qué querés consultar?
        </p>
        <DropdownMenuSeparator className="bg-border" />
        <div className="mt-1 flex flex-col gap-0.5">
          {COURSES.map((course) => (
            <DropdownMenuLinkItem
              key={course.slug}
              href={whatsappLink(course.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] text-ink-soft focus:bg-brand/8 focus:text-brand"
            >
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: course.accent.primary }}
                aria-hidden="true"
              />
              Curso de {course.name}
            </DropdownMenuLinkItem>
          ))}
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuLinkItem
          href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] font-medium text-brand focus:bg-brand/8"
        >
          <WhatsAppIcon className="size-4 shrink-0" />
          Consulta general
        </DropdownMenuLinkItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
