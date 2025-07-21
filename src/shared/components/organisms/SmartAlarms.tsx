import { useState } from "react";

const SmartAlarms = () => {
  const [expanded, setExpanded] = useState(false);
  const [alarms, setAlarms] = useState([
    { id: 1, time: "09:30", name: "Daily Standup", active: true },
    { id: 2, time: "11:00", name: "Code Review", active: true },
    { id: 3, time: "14:00", name: "Lunch Break", active: false },
  ]);
  const [newAlarm, setNewAlarm] = useState({
    time: "15:00",
    name: "",
    repeat: true,
    frequency: "Daily",
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAddAlarm = () => {
    if (newAlarm.name.trim() === "") return;

    const newAlarmObj = {
      id: Date.now(),
      time: newAlarm.time,
      name: newAlarm.name,
      active: true,
    };

    setAlarms([...alarms, newAlarmObj]);
    setNewAlarm({
      time: "15:00",
      name: "",
      repeat: true,
      frequency: "Daily",
    });
  };

  const deleteAlarm = (id) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  return (
    <section
      className={`bg-gradient-to-br from-gray-900 to-blue-900/20 rounded-2xl border border-blue-400/20 p-5 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 group w-full max-w-xs mx-auto relative overflow-hidden ${expanded ? "h-auto" : "h-20"}`}
    >
      {/* Efeito de background sutil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBvcGFjaXR5PSIwLjAzIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiA0YjY2ZmYiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMGg2MDB2NjAwIi8+PHBhdGggZD0iTTAgNjAwaDYwMCIvPjwvZz48L3N2Zz4=')] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

      {/* Header clicável */}
      <div
        className="flex items-center justify-between relative z-10 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-400/20 group-hover:bg-blue-500/20 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-400"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 15 15"></polyline>
            </svg>
          </div>
          <div>
            <h3 className="bg-gradient-to-r font-semibold from-blue-300 to-blue-300 bg-clip-text text-transparent">
              Smart Alarms
            </h3>
            <p className="text-xs text-blue-400/80">
              {expanded
                ? "Gerencie seus lembretes inteligentes"
                : `${alarms.filter((a) => a.active).length} ativos`}
            </p>
          </div>
        </div>
        <button
          className="text-blue-400 hover:text-blue-300 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toggleExpand();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </div>

      {/* Conteúdo expandível */}
      {expanded && (
        <div className="mt-4 relative z-10 space-y-4">
          {/* Alarmes ativos */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-blue-200 flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Active Alarms
            </h4>

            {alarms.length > 0 ? (
              alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="flex items-center justify-between p-2 bg-blue-900/20 rounded border border-blue-700/30"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${alarm.active ? "bg-blue-400 animate-pulse" : "bg-gray-500"}`}
                    ></div>
                    <span className="font-mono">{alarm.time}</span>
                    <span className="text-xs text-blue-300/70">
                      {alarm.name}
                    </span>
                  </div>
                  <button
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => deleteAlarm(alarm.id)}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-blue-400/60 text-center py-2">
                No alarms set
              </p>
            )}
          </div>

          {/* Criar novo alarme */}
          <div className="pt-2 border-t border-blue-900/50">
            <h4 className="text-sm font-medium text-blue-200 mb-2">
              New Alarm
            </h4>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  className="bg-blue-900/30 border border-blue-700/30 rounded px-2 py-1 text-sm font-mono w-full"
                  value={newAlarm.time}
                  onChange={(e) =>
                    setNewAlarm({ ...newAlarm, time: e.target.value })
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Alarm name"
                className="bg-blue-900/30 border border-blue-700/30 rounded px-2 py-1 text-sm w-full"
                value={newAlarm.name}
                onChange={(e) =>
                  setNewAlarm({ ...newAlarm, name: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2 mb-3">
              <label className="flex items-center gap-1 text-xs text-blue-300/80">
                <input
                  type="checkbox"
                  className="rounded border-blue-500"
                  checked={newAlarm.repeat}
                  onChange={(e) =>
                    setNewAlarm({ ...newAlarm, repeat: e.target.checked })
                  }
                />
                Repeat
              </label>

              {newAlarm.repeat && (
                <select
                  className="bg-blue-900/30 border border-blue-700/30 rounded px-2 py-1 text-xs"
                  value={newAlarm.frequency}
                  onChange={(e) =>
                    setNewAlarm({ ...newAlarm, frequency: e.target.value })
                  }
                >
                  <option>Daily</option>
                  <option>Weekdays</option>
                  <option>Weekly</option>
                </select>
              )}
            </div>

            <button
              className="w-full text-sm bg-blue-600/20 hover:bg-blue-600/40 text-white px-4 py-2 rounded-lg border border-blue-700 flex items-center justify-center gap-2"
              onClick={handleAddAlarm}
              disabled={!newAlarm.name.trim()}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Alarm
            </button>
          </div>
        </div>
      )}

      {/* Efeito de hover */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </section>
  );
};

export default SmartAlarms;
