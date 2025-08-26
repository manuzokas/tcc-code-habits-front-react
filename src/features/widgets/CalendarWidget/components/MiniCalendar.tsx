import { useState } from "react";
import { Icon } from "@/shared/components/atoms/Icon";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import type { CalendarEvent, NewCalendarEvent } from "../types/calendar";
import { motion, AnimatePresence } from "framer-motion";

export const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [hoveredDayEvents, setHoveredDayEvents] = useState<CalendarEvent[]>([]);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
    if (isFlipped) {
      setIsFlipped(false);
    }
  };

  const { events, isLoading, addEvent, deleteEvent } =
    useCalendarEvents(currentDate);

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
    return events.filter(
      (event) =>
        new Date(event.start_time).toDateString() === dayDate.toDateString()
    );
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    const dayEvents = getEventsForDay(date.getDate());
    // se houver eventos, vira o card para mostrar a lista
    if (dayEvents.length > 0) {
      setIsFlipped(true);
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
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
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

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      if (selectedDayEvents.length === 1) {
        setIsFlipped(false);
        setSelectedDate(null);
      }
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
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
    <section
      className={`relative bg-gray-900 rounded-xl border border-green-400 p-5 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 group w-full max-w-xs mx-auto overflow-hidden ${expanded ? "h-auto" : "h-20"}`}
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

      {/* CABEÇALHO DO WIDGET */}
      <div
        className="flex items-center justify-between relative z-10 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg border border-green-400/20 group-hover:bg-green-500/20 transition-colors duration-300">
            <Icon name="Calendar" className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="bg-gradient-to-r font-semibold from-green-300 to-green-300 bg-clip-text text-transparent">
              Calendário
            </h3>
            <p className="text-xs text-green-400/80">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </p>
          </div>
        </div>
        <button
          className="text-green-400 hover:text-green-300 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
        >
          <Icon
            name="ChevronDown"
            className={`w-5 h-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* CONTEÚDO EXPANSÍVEL */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 relative z-10 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {/* VISTA DO CALENDÁRIO */}
              {!isFlipped && (
                <motion.div
                  key="calendar-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={prevMonth}
                      className="p-1 text-gray-400 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <Icon name="ChevronLeft" className="w-5 h-5" />
                    </button>
                    <h3 className="text-md font-medium text-gray-200">
                      {monthNames[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
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
                    className={`transition-all duration-300 overflow-hidden ${selectedDate && !isFlipped ? "max-h-20 pt-3 mt-2 border-t border-gray-800" : "max-h-0"}`}
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
                        className={`p-2 rounded-lg transition-colors ${newEventTitle.trim() ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}
                      >
                        <Icon name="Plus" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VISTA DA LISTA DE EVENTOS */}
              {isFlipped && selectedDate && (
                <motion.div
                  key="events-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handleBackToCalendar}
                      className="p-1 text-gray-400 hover:text-purple-400 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <Icon name="ArrowLeft" className="w-5 h-5" />
                    </button>
                    <h3 className="text-md font-medium text-gray-200">
                      {selectedDate.toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                      })}
                    </h3>
                    <div className="w-8"></div>
                  </div>
                  <div className="max-h-[220px] overflow-y-auto pr-2 space-y-2">
                    {selectedDayEvents.length > 0 ? (
                      selectedDayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="bg-gray-800 rounded-lg p-3 flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <div className="bg-purple-500 rounded-full w-2.5 h-2.5 mt-1.5 flex-shrink-0"></div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-100 text-sm">
                                {event.title}
                              </h4>
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(event.start_time).toLocaleTimeString(
                                  "pt-BR",
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Icon name="Trash2" className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500 text-sm">
                        Nenhum evento para este dia.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
