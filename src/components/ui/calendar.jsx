import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "dropdown",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames(); // Generate years for dropdown (current year ± 10 years)
  const currentYear = new Date().getFullYear();
  const years = React.useMemo(() => {
    return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  }, [currentYear]); // Generate months for dropdown
  const months = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(i);
      return {
        value: i.toString(),
        label: date.toLocaleString("default", { month: "long" }),
      };
    });
  }, []);
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-white group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]&]:bg-transparent [[data-slot=popover-content]&]:bg-transparent dark:bg-neutral-950",
        String.raw`rtl::[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl::[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        formatYearDropdown: (date) => date.getFullYear().toString(),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-2 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-neutral-950 border-neutral-200 shadow-xs has-focus:ring-neutral-950/50 has-focus:ring-[3px] relative rounded-md border dark:has-focus:border-neutral-300 dark:border-neutral-800 dark:has-focus:ring-neutral-300/50",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-neutral-500 flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5 dark:[&>svg]:text-neutral-400",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-neutral-500 flex-1 select-none rounded-md text-[0.8rem] font-normal dark:text-neutral-400",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-neutral-500 select-none text-[0.8rem] dark:text-neutral-400",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-neutral-100 dark:bg-neutral-800",
          defaultClassNames.range_start
        ),
        range_middle: cn(
          "bg-neutral-100/80 dark:bg-neutral-800/50",
          defaultClassNames.range_middle
        ),
        range_end: cn(
          "bg-neutral-100 dark:bg-neutral-800",
          defaultClassNames.range_end
        ),
        today: cn(
          "bg-neutral-100 text-neutral-900 rounded-md data-[selected=true]:rounded-none dark:bg-neutral-800 dark:text-neutral-50",
          defaultClassNames.today
        ),
        outside: cn(
          "text-neutral-500 aria-selected:text-neutral-500 dark:text-neutral-400 dark:aria-selected:text-neutral-400",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-neutral-500 opacity-50 dark:text-neutral-400",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }
          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }
          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
                           {" "}
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                                {children}             {" "}
              </div>
                         {" "}
            </td>
          );
        }, // Custom Caption component to replace the default one
        Caption: ({ displayMonth, id, ...props }) => {
          const month = displayMonth.getMonth();
          const year = displayMonth.getFullYear();
          return (
            <div className="flex justify-center items-center gap-2 py-2">
                           {" "}
              <Select
                value={month.toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth);
                  newDate.setMonth(Number.parseInt(value));
                  props.onMonthChange?.(newDate);
                }}
              >
                               {" "}
                <SelectTrigger className="h-8 w-[5.5rem] border-none bg-transparent text-sm font-medium">
                                   {" "}
                  <SelectValue>
                                       {" "}
                    {displayMonth.toLocaleString("default", { month: "long" })} 
                                   {" "}
                  </SelectValue>
                                 {" "}
                </SelectTrigger>
                               {" "}
                <SelectContent>
                                   {" "}
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                                            {month.label}                   {" "}
                    </SelectItem>
                  ))}
                                 {" "}
                </SelectContent>
                             {" "}
              </Select>
                             {" "}
              <Select
                value={year.toString()}
                onValueChange={(value) => {
                  const newDate = new Date(displayMonth);
                  newDate.setFullYear(Number.parseInt(value));
                  props.onMonthChange?.(newDate);
                }}
              >
                               {" "}
                <SelectTrigger className="h-8 w-[4rem] border-none bg-transparent text-sm font-medium">
                                    <SelectValue>{year}</SelectValue>           
                     {" "}
                </SelectTrigger>
                               {" "}
                <SelectContent>
                                   {" "}
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                                            {year}                   {" "}
                    </SelectItem>
                  ))}
                                 {" "}
                </SelectContent>
                             {" "}
              </Select>
                         {" "}
            </div>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}
function CalendarDayButton({ className, day, modifiers, ...props }) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]); // Add weekend styling
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
  const weekendClass = isWeekend ? "text-red-500" : "";
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        weekendClass,
        "data-[selected-single=true]:bg-blue-600 data-[selected-single=true]:text-white",
        "data-[range-start=true]:bg-blue-600 data-[range-start=true]:text-white data-[range-start=true]:rounded-l-md data-[range-start=true]:rounded-r-none",
        "data-[range-end=true]:bg-blue-600 data-[range-end=true]:text-white data-[range-end=true]:rounded-r-md data-[range-end=true]:rounded-l-none",
        "data-[range-middle=true]:bg-blue-100 data-[range-middle=true]:text-blue-900 data-[range-middle=true]:rounded-none",
        "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}
export { Calendar, CalendarDayButton };
