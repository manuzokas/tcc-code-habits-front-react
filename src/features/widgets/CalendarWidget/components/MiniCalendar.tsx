import { useState } from "react";
import { Icon } from "@/shared/components/atoms/Icon";
import { useCalendarEvents } from "../hooks/useCalendarEvents";

export const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { events, isLoading } = useCalendarEvents(currentDate);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const hasEvents = (day: number) => {
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return events.some((event) => {
      const eventStartDate = new Date(event.start_time);
      return eventStartDate.toDateString() === dayDate.toDateString();
    });
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();
      const hasEvent = hasEvents(day);

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => setSelectedDate(date)}
          className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${isToday && !isSelected ? "border border-purple-500 text-purple-500" : ""}
            ${!isSelected && !isToday ? "hover:bg-gray-700" : ""}
          `}
        >
          {day}
          {hasEvent && (
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
          )}
        </button>
      );
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/20 w-full max-w-xs mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 text-gray-400 hover:text-purple-400 rounded-full hover:bg-gray-800"
        >
          <Icon name="ChevronLeft" className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-medium text-gray-200">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>

        <button
          onClick={nextMonth}
          className="p-1 text-gray-400 hover:text-purple-400 rounded-full hover:bg-gray-800"
        >
          <Icon name="ChevronRight" className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-gray-500 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {isLoading ? (
          <div className="col-span-7 text-center text-gray-400 text-sm py-4">
            Loading...
          </div>
        ) : (
          renderDays()
        )}
      </div>

      {selectedDate && (
        <div className="mt-4 pt-3 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">Selecionado:</p>
          <p className="text-purple-400 font-medium">
            {selectedDate.toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
};
