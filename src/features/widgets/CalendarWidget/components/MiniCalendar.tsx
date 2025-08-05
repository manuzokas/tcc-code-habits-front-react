import { useState } from "react";
import { Icon } from "@/shared/components/atoms/Icon";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import type { CalendarEvent, NewCalendarEvent } from "../types/calendar";

export const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [hoveredDayEvents, setHoveredDayEvents] = useState<CalendarEvent[]>([]);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const { events, isLoading, addEvent } = useCalendarEvents(currentDate);

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

  const getEventsForDay = (day: number): CalendarEvent[] => {
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return events.filter((event) => {
      const eventStartDate = new Date(event.start_time);
      return eventStartDate.toDateString() === dayDate.toDateString();
    });
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const dayEvents = getEventsForDay(date.getDate());
    if (dayEvents.length > 0) {
      setIsFlipped(true);
    } else {
      setNewEventTitle("");
    }
  };

  const handleMouseEnterDay = (
    day: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const dayEvents = getEventsForDay(day);
    if (dayEvents.length > 0) {
      setHoveredDayEvents(dayEvents);
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY - 10,
      });
    }
  };

  const handleMouseLeaveDay = () => {
    setHoveredDayEvents([]);
    setTooltipPosition(null);
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
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();
      const hasEvent = getEventsForDay(day).length > 0;

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => handleDayClick(date)}
          onMouseEnter={(e) => handleMouseEnterDay(day, e)}
          onMouseLeave={handleMouseLeaveDay}
          className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
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
    setIsFlipped(false);
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setIsFlipped(false);
    setSelectedDate(null);
  };

  const handleAddEvent = async () => {
    if (!selectedDate || !newEventTitle.trim()) return;

    const newEvent: NewCalendarEvent = {
      title: newEventTitle.trim(),
      description: null,
      start_time: selectedDate.toISOString(),
      end_time: new Date(selectedDate.getTime() + 60 * 60 * 1000).toISOString(),
      is_all_day: false,
      location: null,
    };

    try {
      await addEvent(newEvent);
      setNewEventTitle("");
      setIsFlipped(true);
    } catch (error) {
      console.error("Erro ao adicionar evento:", error);
    }
  };

  const handleBackToCalendar = () => {
    setIsFlipped(false);
    setSelectedDate(null);
  };

  const selectedDayEvents = selectedDate
    ? getEventsForDay(selectedDate.getDate())
    : [];

  return (
    <div
      className={`bg-gray-900 rounded-xl border border-green-600 shadow-lg shadow-green-500/30 w-full max-w-xs mx-auto p-4 relative overflow-hidden ${
        selectedDate && !isFlipped ? "h-[360px]" : "h-[300px]"
      }`}
    >
      {hoveredDayEvents.length > 0 && tooltipPosition && (
        <div
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: "translateX(-50%) translateY(-110%)",
          }}
          className="absolute z-50 bg-gray-700 text-white text-xs px-3 py-2 rounded-md shadow-lg whitespace-nowrap pointer-events-none backdrop-blur-sm bg-opacity-90"
        >
          {hoveredDayEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></span>
              <span>{event.title}</span>
            </div>
          ))}
        </div>
      )}

      <div
        className={`transition-all duration-300 ease-in-out ${isFlipped ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-1 text-gray-400 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Icon name="ChevronLeft" className="w-5 h-5" />
          </button>

          <h3 className="text-lg font-medium text-gray-200">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>

          <button
            onClick={nextMonth}
            className="p-1 text-gray-400 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-colors"
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
              Carregando...
            </div>
          ) : (
            renderDays()
          )}
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            selectedDate ? "max-h-20 pt-3 border-t border-gray-800" : "max-h-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Novo evento..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddEvent()}
              className="flex-1 px-3 py-2 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 border border-gray-700 text-sm"
            />
            <button
              onClick={handleAddEvent}
              disabled={!newEventTitle.trim()}
              className={`p-2 rounded-lg transition-colors ${
                newEventTitle.trim()
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Icon name="Plus" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${isFlipped ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBackToCalendar}
            className="p-1 text-gray-400 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Icon name="ChevronLeft" className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-medium text-gray-200">
            {selectedDate?.toLocaleDateString("pt-BR", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </h3>
          <div className="w-10"></div>
        </div>

        <div className="max-h-[220px] overflow-y-auto pr-2">
          {selectedDayEvents.length > 0 ? (
            <div className="space-y-2">
              {selectedDayEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-800 rounded-lg p-3 flex items-start gap-3"
                >
                  <div className="bg-purple-500 rounded-full w-3 h-3 mt-1 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-100">{event.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(event.start_time).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              Nenhum evento marcado
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-800">
          <button
            onClick={() => {
              setIsFlipped(false);
              setNewEventTitle("");
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors text-sm"
          >
            <Icon name="Plus" className="w-4 h-4" />
            Adicionar Evento
          </button>
        </div>
      </div>
    </div>
  );
};
