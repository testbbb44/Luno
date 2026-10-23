import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Calendar = () => {
  // Get current date
  const today = new Date();

  // State for selected dates and their colors
  const [selectedDates, setSelectedDates] = useState({});
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [calendarDays, setCalendarDays] = useState([]);

  // Calendar data
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Default color assignments (now using date strings as keys)
  const defaultColors = {
    "2023-11-09": "bg-green-600",
    "2023-11-13": "bg-olive-600",
    "2023-11-18": "bg-green-600",
    "2023-11-23": "bg-brown-600",
    "2023-11-27": "bg-olive-600",
  };

  // Generate calendar days for the current month
  useEffect(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    setCalendarDays(days);
  }, [currentMonth, currentYear]);

  // Handle date click
  const handleDateClick = (date) => {
    if (!date) return; // Don't handle clicks on empty cells

    const dateString = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;

    setSelectedDates((prev) => {
      const colors = ["bg-[#817E18]", "bg-[#256C14]", "bg-[#812B18]"];
      const currentColorIndex = colors.indexOf(prev[dateString] || "");
      const nextColorIndex = (currentColorIndex + 1) % colors.length;

      return {
        ...prev,
        [dateString]: colors[nextColorIndex],
      };
    });
  };

  // Get color for a date
  const getDateColor = (date) => {
    if (!date) return ""; // Return empty string for null dates
    const dateString = `${currentYear}-${(currentMonth + 1)
      .toString()
      .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
    return selectedDates[dateString] || defaultColors[dateString] || "";
  };

  // Handle year change
  const changeYear = (increment) => {
    setCurrentYear((prev) => prev + increment);
  };

  return (
    <div className="p-6 max-w-[450px] border bg-white rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <div className="flex items-center gap-4">
          {/* Year navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeYear(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium">{currentYear}</span>
            <button
              onClick={() => changeYear(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Month selection */}
          <Select
            value={currentMonth.toString()}
            onValueChange={(value) => setCurrentMonth(Number.parseInt(value))}
          >
            <SelectTrigger className="border-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue>{months[currentMonth]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {/* Week day headers */}
        {days.map((day, index) => (
          <div key={index} className="text-center font-medium">
            {day}
          </div>
        ))}

        {/* Date cells */}
        {calendarDays.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`
              w-8 h-8 p-6 flex items-center justify-center rounded-full cursor-pointer
              ${date ? getDateColor(date) : ""}
              ${
                date
                  ? getDateColor(date)
                    ? "text-white"
                    : "hover:bg-gray-100"
                  : ""
              }
            `}
          >
            {date}
          </div>
        ))}
      </div>

      {/* <button className="mt-6 text-blue-600 text-sm">View More</button> */}
    </div>
  );
};

export default Calendar;
