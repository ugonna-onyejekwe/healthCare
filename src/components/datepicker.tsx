import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DatePicker = ({ date, setDate }: datePickerTypes) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full  flex-1 justify-start text-left px-[19px] py-[18px] border border-dark-500 bg-dark-400 "
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-dark-700 " />
          {date ? (
            <span className="text-dark-700">{format(date, "PPP")}</span>
          ) : (
            <span className="text-dark-700">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="bg-dark-400 text-light-200 overflow-hidden"
        />
      </PopoverContent>
    </Popover>
  );
};
