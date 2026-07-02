import * as React from "react";
import { DayPicker } from "react-day-picker";
import { format, addHours, differenceInMinutes, parse, isValid, addDays } from "date-fns";
import { CalendarDays, Clock3, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  date: string;
  setDate: (date: string) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  minDate?: Date;
}

const timeSlots = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
  "22:00", "22:30", "23:00"
];

const durationPresets = [
  { label: "2 hrs", hours: 2 },
  { label: "3 hrs", hours: 3 },
  { label: "4 hrs", hours: 4 },
  { label: "5 hrs", hours: 5 },
  { label: "6 hrs", hours: 6 },
];

function calculateDuration(start: string, end: string): string {
  if (!start || !end) return "";
  
  try {
    const today = new Date().toISOString().split("T")[0];
    const startDate = parse(`${today} ${start}`, "yyyy-MM-dd HH:mm", new Date());
    const endDate = parse(`${today} ${end}`, "yyyy-MM-dd HH:mm", new Date());
    
    if (!isValid(startDate) || !isValid(endDate)) return "";
    
    let diffMinutes = differenceInMinutes(endDate, startDate);
    
    // Handle overnight
    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }
    
    if (diffMinutes <= 0) return "";
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}hr`;
    return `${hours}hr ${minutes}min`;
  } catch {
    return "";
  }
}

function isValidTimeRange(start: string, end: string): boolean {
  if (!start || !end) return true;
  
  try {
    const today = new Date().toISOString().split("T")[0];
    const startDate = parse(`${today} ${start}`, "yyyy-MM-dd HH:mm", new Date());
    const endDate = parse(`${today} ${end}`, "yyyy-MM-dd HH:mm", new Date());
    
    if (!isValid(startDate) || !isValid(endDate)) return true;
    
    let diffMinutes = differenceInMinutes(endDate, startDate);
    if (diffMinutes < 0) diffMinutes += 24 * 60;
    
    return diffMinutes > 0;
  } catch {
    return true;
  }
}

export function DateTimePicker({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  minDate = new Date(),
}: DateTimePickerProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [startPickerOpen, setStartPickerOpen] = React.useState(false);
  const [endPickerOpen, setEndPickerOpen] = React.useState(false);

  const selectedDate = date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;
  const duration = calculateDuration(startTime, endTime);
  const isInvalidRange = !isValidTimeRange(startTime, endTime);

  const handleDurationPreset = (hours: number) => {
    if (startTime) {
      const [h, m] = startTime.split(":").map(Number);
      const newEnd = addHours(parse(startTime, "HH:mm", new Date()), hours);
      setEndTime(format(newEnd, "HH:mm"));
    }
  };

  const handleStartTimeSelect = (time: string) => {
    setStartTime(time);
    setStartPickerOpen(false);
    
    // Auto-adjust end time if it's now before start
    if (endTime && !isValidTimeRange(time, endTime)) {
      const [h, m] = time.split(":").map(Number);
      const newEnd = addHours(parse(time, "HH:mm", new Date()), 2);
      setEndTime(format(newEnd, "HH:mm"));
    }
  };

  const handleEndTimeSelect = (time: string) => {
    setEndTime(time);
    setEndPickerOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="mb-2 block text-sm font-medium text-white">
          Event Date
        </label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start gap-3 bg-black/20 text-left font-normal",
                !date && "text-muted-foreground",
                "border-white/10 hover:border-white/20 hover:bg-black/30"
              )}
            >
              <CalendarDays className="h-5 w-5 text-primary" />
              <span className={cn(!date && "text-muted-foreground")}>
                {date ? format(parse(date, "yyyy-MM-dd", new Date()), "EEEE, MMMM d, yyyy") : "Select a date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(day) => {
                  if (day) {
                    setDate(format(day, "yyyy-MM-dd"));
                    setCalendarOpen(false);
                  }
                }}
                disabled={[{ before: minDate }]}
                fromDate={minDate}
                toDate={addDays(minDate, 90)}
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-white",
                  nav: "space-x-1 flex items-center",
                  nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-white/10 rounded-lg"
                  ),
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: cn(
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-white/10 rounded-lg transition-colors"
                  ),
                  day_range_end: "day-range-end",
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg",
                  day_today: "bg-white/10 text-white rounded-lg",
                  day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                  day_disabled: "text-muted-foreground opacity-30",
                  day_range_middle: "aria-selected:bg-white/10 aria-selected:text-white rounded-lg",
                  day_hidden: "invisible",
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Selection */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Start Time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Start Time
          </label>
          <Popover open={startPickerOpen} onOpenChange={setStartPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start gap-3 bg-black/20 font-normal",
                  !startTime && "text-muted-foreground",
                  "border-white/10 hover:border-white/20 hover:bg-black/30"
                )}
              >
                <Clock3 className="h-5 w-5 text-primary" />
                {startTime ? format(parse(startTime, "HH:mm", new Date()), "h:mm a") : "Select start time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <div className="max-h-80 overflow-y-auto p-2">
                <div className="grid grid-cols-2 gap-1">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleStartTimeSelect(time)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
                        startTime === time
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-white/10 text-white/80"
                      )}
                    >
                      {format(parse(time, "HH:mm", new Date()), "h:mm a")}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* End Time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            End Time
          </label>
          <Popover open={endPickerOpen} onOpenChange={setEndPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start gap-3 bg-black/20 font-normal",
                  !endTime && "text-muted-foreground",
                  isInvalidRange && "border-red-500/50",
                  "border-white/10 hover:border-white/20 hover:bg-black/30"
                )}
              >
                <Clock3 className={cn("h-5 w-5", isInvalidRange ? "text-red-500" : "text-primary")} />
                {endTime ? format(parse(endTime, "HH:mm", new Date()), "h:mm a") : "Select end time"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <div className="max-h-80 overflow-y-auto p-2">
                <div className="grid grid-cols-2 gap-1">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleEndTimeSelect(time)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
                        endTime === time
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-white/10 text-white/80"
                      )}
                    >
                      {format(parse(time, "HH:mm", new Date()), "h:mm a")}
                    </button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Duration Display & Presets */}
      {startTime && (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Duration</span>
            {duration ? (
              <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                {duration}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Select times above</span>
            )}
          </div>
          
          {isInvalidRange && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              End time must be after start time
            </div>
          )}

          {!isInvalidRange && startTime && (
            <div>
              <p className="mb-2 text-xs text-muted-foreground">Quick duration presets</p>
              <div className="flex flex-wrap gap-2">
                {durationPresets.map((preset) => (
                  <button
                    key={preset.hours}
                    type="button"
                    onClick={() => handleDurationPreset(preset.hours)}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateTimePicker;