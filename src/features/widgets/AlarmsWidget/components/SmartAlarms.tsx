import { useState } from "react";
import { useSmartAlarms } from "../hooks/useSmartAlarms";
import { motion, AnimatePresence } from "framer-motion";

const SmartAlarms = () => {
  const [expanded, setExpanded] = useState(false);
  const {
    alarms,
    isLoading,
    addAlarm,
    deleteAlarm,
    toggleAlarm,
    ringingAlarmId,
    dismissAlarm,
  } = useSmartAlarms();

  const [newAlarmData, setNewAlarmData] = useState({
    time: "09:00",
    title: "",
    days_of_week: ["Daily"],
  });

  const ringingAlarm = alarms.find((alarm) => alarm.id === ringingAlarmId);

  const toggleExpand = () => {
    if (ringingAlarmId) return;
    setExpanded(!expanded);
  };

  const handleAddAlarm = async () => {
    if (newAlarmData.title.trim() === "") return;
    await addAlarm({
      title: newAlarmData.title,
      time: newAlarmData.time,
      days_of_week: newAlarmData.days_of_week,
    });
    setNewAlarmData({ time: "09:00", title: "", days_of_week: ["Daily"] });
  };

  const handleDeleteAlarm = async (alarmId: string) => {
    await deleteAlarm(alarmId);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAlarmData({ ...newAlarmData, time: e.target.value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAlarmData({ ...newAlarmData, title: e.target.value });
  };

  const handleRepeatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewAlarmData({ ...newAlarmData, days_of_week: [e.target.value] });
  };

  return (
    <section
      className={`relative bg-gray-900 rounded-xl border border-blue-400 p-5 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 group w-full max-w-xs mx-auto overflow-hidden ${
        ringingAlarmId ? "h-[170px]" : expanded ? "h-auto" : "h-20" // Altura fixa quando toca
      }`}
    >
      <AnimatePresence>
        {ringingAlarm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                transition: { duration: 1, repeat: Infinity },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-200"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </motion.div>

            <h3 className="text-lg font-bold text-red-500">
              Alarme Tocando!
            </h3>
            <p className="text-red-200 mb-4">{ringingAlarm.title}</p>

            <button
              onClick={dismissAlarm}
              className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-lg transition-colors"
            >
              Dispensar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

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
                ? "Gerencie seus lembretes"
                : `${alarms.filter((a) => a.is_active).length} ativos`}
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

      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 relative z-10 space-y-4"
        >
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
            {isLoading ? (
              <p className="text-xs text-center text-blue-400/60 py-2">
                Loading alarms...
              </p>
            ) : alarms.length > 0 ? (
              alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="flex items-center justify-between p-2 bg-blue-900/20 rounded border border-blue-700/30"
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAlarm(alarm.id, alarm.is_active)}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-colors ${alarm.is_active ? "bg-blue-400 animate-pulse" : "bg-gray-500"}`}
                      ></div>
                    </button>
                    <span className="font-mono text-sm">
                      {alarm.time.substring(0, 5)}
                    </span>
                    <span className="text-xs text-blue-300/70">
                      {alarm.title}
                    </span>
                  </div>
                  <button
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => handleDeleteAlarm(alarm.id)}
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
          <div className="pt-2 border-t border-blue-900/50">
            <h4 className="text-sm font-medium text-blue-200 mb-2">
              New Alarm
            </h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="time"
                className="bg-blue-900/30 border border-blue-700/30 rounded px-2 py-1 text-sm font-mono w-full"
                value={newAlarmData.time}
                onChange={handleTimeChange}
              />
              <input
                type="text"
                placeholder="Alarm name"
                className="bg-blue-900/30 border border-blue-700/30 rounded px-2 py-1 text-sm w-full"
                value={newAlarmData.title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <select
                className="bg-blue-900/30 border border-blue-700/30 rounded px-2 py-1 text-xs w-full"
                value={newAlarmData.days_of_week[0] || "Daily"}
                onChange={handleRepeatChange}
              >
                <option value="Daily">Daily</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            <button
              className="w-full text-sm bg-blue-600/20 hover:bg-blue-600/40 text-white px-4 py-2 rounded-lg border border-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={handleAddAlarm}
              disabled={!newAlarmData.title.trim()}
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
        </motion.div>
      )}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </section>
  );
};

export default SmartAlarms;
