import { Award, Globe2, Lightbulb, TrendingUp, ShieldCheck, GraduationCap } from "lucide-react";

const VALORES = [
  { title: "Compromiso con la calidad", icon: Award },
  { title: "Respeto por la diversidad cultural", icon: Globe2 },
  { title: "Innovación educativa", icon: Lightbulb },
  { title: "Crecimiento continuo", icon: TrendingUp },
  { title: "Responsabilidad y ética", icon: ShieldCheck },
  { title: "Orientación al alumno", icon: GraduationCap },
];

export function ValoresList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {VALORES.map(({ title, icon: Icon }) => (
        <div
          key={title}
          className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <p className="pt-1.5 font-medium text-ink">{title}</p>
        </div>
      ))}
    </div>
  );
}
