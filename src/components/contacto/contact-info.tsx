import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ADDRESS, EMAIL, HOURS, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";

const ITEMS = [
  { icon: MapPin, label: "Dirección", value: ADDRESS },
  { icon: Phone, label: "Teléfono", value: PHONE_DISPLAY, href: `tel:+${WHATSAPP_NUMBER}` },
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {ITEMS.map(({ icon: Icon, label, value, href }) => (
        <div key={label} className="flex items-start gap-4">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-wide text-ink-soft uppercase">{label}</p>
            {href ? (
              <a href={href} className="text-base text-ink hover:text-brand">
                {value}
              </a>
            ) : (
              <p className="text-base text-ink">{value}</p>
            )}
          </div>
        </div>
      ))}

      <div className="flex items-start gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Clock className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-wide text-ink-soft uppercase">Horarios</p>
          {HOURS.map((h) => (
            <p key={h.days} className="text-base text-ink">
              {h.days}: {h.time}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
