"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatDateInputValue, formatStartDate, parseDateInput } from "@/lib/utils";

const currentYear = new Date().getFullYear();

export function DatePickerField({
  id,
  name,
  defaultValue,
}: {
  id?: string;
  name: string;
  defaultValue?: string;
}) {
  const [date, setDate] = useState<Date | undefined>(() => parseDateInput(defaultValue));
  const [open, setOpen] = useState(false);

  const value = date ? formatDateInputValue(date) : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input type="hidden" name={name} value={value} />
      <PopoverTrigger
        id={id}
        type="button"
        className="flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-left text-sm text-ink outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20"
      >
        <CalendarDays className="size-4 shrink-0 text-ink-soft" aria-hidden="true" />
        <span className={date ? "text-ink" : "text-ink-soft"}>
          {date ? formatStartDate(value) : "Elegir fecha"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          startMonth={new Date(currentYear - 1, 0)}
          endMonth={new Date(currentYear + 3, 11)}
          selected={date}
          defaultMonth={date}
          onSelect={(selected) => {
            setDate(selected);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
