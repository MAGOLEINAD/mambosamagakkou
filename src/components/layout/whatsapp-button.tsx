"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { WhatsAppMenu } from "@/components/shared/whatsapp-menu";

export function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname === "/contacto") {
    return null;
  }

  return (
    <WhatsAppMenu
      align="end"
      side="top"
      sideOffset={14}
      trigger={
        <button
          type="button"
          aria-label="Escribinos por WhatsApp"
          className="fixed right-5 bottom-5 z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105"
        />
      }
    >
      <WhatsAppIcon className="size-7" />
    </WhatsAppMenu>
  );
}
