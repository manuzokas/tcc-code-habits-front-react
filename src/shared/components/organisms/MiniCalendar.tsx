// @/shared/components/organisms/MiniCalendar.tsx
import { useState } from "react";
import { Icon } from "@/shared/components/atoms/Icon";

export const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Nomes dos meses e dias
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

  // Obter o primeiro dia do mês e o número de dias no mês
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

  // Gerar array de dias do mês
  const renderDays = () => {
    const days = [];

    // Dias vazios para começar no dia correto da semana
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <button
          key={`day-${day}`}
          onClick={() => setSelectedDate(date)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
            ${isSelected ? "bg-blue-500 text-white" : ""}
            ${isToday && !isSelected ? "border border-blue-500 text-blue-500" : ""}
            ${!isSelected && !isToday ? "hover:bg-gray-700" : ""}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Navegar entre meses
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
      {/* Cabeçalho do calendário */}
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

      {/* Dias da semana */}
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

      {/* Dias do mês */}
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>

      {/* Data selecionada */}
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
