"use client"

import * as React from "react"
import { DayPicker, UI, DayFlag, SelectionState, type DropdownProps } from "react-day-picker"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectContent,
  SelectList,
  SelectItem,
  SelectItemText,
} from "@/components/ui/select"

function CalendarDropdown({
  options,
  value,
  onChange,
  disabled,
  className,
  "aria-label": ariaLabel,
}: DropdownProps) {
  return (
    <Select<number>
      items={options}
      value={typeof value === "number" ? value : Number(value)}
      disabled={disabled}
      onValueChange={(newValue) => {
        onChange?.({
          target: { value: String(newValue) },
        } as React.ChangeEvent<HTMLSelectElement>)
      }}
    >
      <SelectTrigger
        aria-label={ariaLabel}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border border-border bg-white px-2 py-1 text-sm font-semibold text-ink capitalize outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20 disabled:opacity-50",
          className
        )}
      >
        <SelectValue />
        <SelectIcon>
          <ChevronDown className="size-3.5 text-ink-soft" />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent sideOffset={4}>
        <SelectList>
          {options?.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="capitalize"
            >
              <SelectItemText>{option.label}</SelectItemText>
            </SelectItem>
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  )
}

function Calendar({
  className,
  classNames,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn("p-1", className)}
      classNames={{
        [UI.Root]: "relative",
        [UI.Months]: "flex flex-col gap-4",
        [UI.Month]: "space-y-6",
        [UI.MonthCaption]: "flex h-5 items-center justify-center relative",
        [UI.CaptionLabel]: "text-sm font-semibold text-ink capitalize",
        [UI.Dropdowns]: "flex items-center gap-1.5",
        [UI.Nav]:
          "z-10 flex h-7 items-center justify-between absolute inset-x-0 top-0 pointer-events-none",
        [UI.PreviousMonthButton]: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "absolute left-1 bg-white pointer-events-auto"
        ),
        [UI.NextMonthButton]: cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "absolute right-1 bg-white pointer-events-auto"
        ),
        [UI.MonthGrid]: "w-full border-collapse",
        [UI.Weekdays]: "flex",
        [UI.Weekday]:
          "text-ink-soft w-9 font-normal text-xs uppercase tracking-wide text-center",
        [UI.Week]: "flex w-full mt-1",
        [UI.Day]: "size-9 text-center p-0 text-sm",
        [UI.DayButton]: cn(
          "size-9 rounded-full font-normal text-ink transition-colors hover:bg-muted",
          "outline-none focus-visible:ring-3 focus-visible:ring-brand/20"
        ),
        [SelectionState.selected]:
          "[&>button]:bg-brand [&>button]:text-white [&>button]:hover:bg-brand-dark",
        [DayFlag.today]: "[&>button]:font-semibold [&>button]:text-brand",
        [DayFlag.outside]: "[&>button]:text-ink-soft/40",
        [DayFlag.disabled]: "[&>button]:text-ink-soft/30 [&>button]:hover:bg-transparent",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === "left") return <ChevronLeft className="size-4" />
          if (orientation === "right") return <ChevronRight className="size-4" />
          return <ChevronDown className="size-3.5 text-ink-soft" />
        },
        Dropdown: CalendarDropdown,
      }}
      {...props}
    />
  )
}

export { Calendar }
