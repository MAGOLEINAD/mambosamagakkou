import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ADDRESS, EMAIL, HOURS, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";

const ITEMS = [
  { icon: MapPin, label: "Dirección", value: ADDRESS },
  { icon: Phone, label: "Teléfono", value: PHONE_DISPLAY, href: `tel:+${WHATSAPP_NUMBER}` },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
];

export function ContactInfo() {
  return (
    <div className="divide-y divide-white/10">
      {ITEMS.map(({ icon: Icon, label, value, href }) => (
        <div key={label} className="flex items-center gap-4 py-3.5 first:pt-0">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
            <Icon className="size-4.5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-wider text-gold uppercase">{label}</p>
            {href ? (
              <a
                href={href}
                className="block text-[15px] font-medium break-words text-white hover:text-white/80"
              >
                {value}
              </a>
            ) : (
              <p className="text-[15px] font-medium break-words text-white">{value}</p>
            )}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 py-3.5 last:pb-0">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">
          <Clock className="size-4.5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-wider text-gold uppercase">Horarios</p>
          <p className="text-[15px] font-medium text-white">
            {HOURS.map((h) => `${h.days} ${h.time}`).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}
