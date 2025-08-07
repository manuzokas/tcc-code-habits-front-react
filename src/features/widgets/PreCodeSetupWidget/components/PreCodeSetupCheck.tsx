import { useState } from "react";
import { usePreCodeSetup } from "../hooks/usePreCodeSetup";
import type { CombinedSetupItem } from "../types/setup";

const PreCodeSetupCheck = () => {
  const [expanded, setExpanded] = useState(false);
  const { checklist, completedCount, totalCount, isLoading, toggleItem } =
    usePreCodeSetup();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleToggleItem = (item: CombinedSetupItem) => {
    toggleItem(item.id);
  };

  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section
      className={`bg-gray-900 rounded-xl border border-emerald-400 p-5 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 group w-full max-w-xs mx-auto relative overflow-hidden ${expanded ? "h-auto" : "h-20"}`}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiBvcGFjaXR5PSIwLjAzIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMGFmNzEiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTAgMGg2MDB2NjAwIi8+PHBhdGggZD0iTTAgNjAwaDYwMCIvPjwvZz48L3N2Zz4=')] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>

      <div
        className="flex items-center justify-between relative z-10 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-400/20 group-hover:bg-emerald-500/20 transition-colors duration-300">
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
              className="text-emerald-400"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
              <path d="M5 3v4"></path>
              <path d="M19 17v4"></path>
              <path d="M3 5h4"></path>
              <path d="M17 19h4"></path>
            </svg>
          </div>
          <div>
            <h3 className="bg-gradient-to-r font-semibold from-green-300 to-blue-300 bg-clip-text text-transparent">
              Pre-Code Setup
            </h3>
            <p className="text-xs text-emerald-400/80">
              {expanded
                ? "Prepare-se para codar com saúde"
                : `${completedCount}/${totalCount} completos`}
            </p>
          </div>
        </div>
        <button
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
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
        <div className="mt-4 relative z-10">
          {isLoading ? (
            <p className="text-center text-emerald-400">
              Carregando checklist...
            </p>
          ) : (
            <ul className="space-y-2.5 mb-4">
              {checklist.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 p-1.5 rounded-lg hover:bg-emerald-900/10 transition-colors"
                >
                  <button
                    className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-200 ${
                      item.completed
                        ? "bg-emerald-500/90 border-emerald-500"
                        : "bg-gray-700/50 border-gray-600 hover:border-emerald-400"
                    } border`}
                    onClick={() => handleToggleItem(item)}
                  >
                    {item.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        item.completed ? "text-emerald-200" : "text-gray-200"
                      }`}
                    >
                      {item.description}
                      {!item.completed && (
                        <button className="ml-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="inline align-middle"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                          </svg>
                        </button>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-emerald-400">
                Pronto para codar?
              </span>
              <span className="text-xs font-mono text-emerald-300">
                {progressPercentage}% completo
              </span>
            </div>
            <div className="w-full bg-gray-700/30 rounded-full h-1.5 mb-4">
              <div
                className="bg-gradient-to-r from-emerald-400 to-green-400 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${progressPercentage}%`,
                }}
              ></div>
            </div>
            <button className="w-full py-2.5 bg-emerald-600/30 hover:bg-emerald-500/40 text-emerald-100 hover:text-white rounded-lg border border-emerald-500/30 flex items-center justify-center gap-2 text-sm transition-all duration-200 group/btn">
              <span>Iniciar sessão de código</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-300 group-hover/btn:translate-x-1 transition-transform"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="absolute inset-0 -z-10 rounded-2xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </section>
  );
};

export default PreCodeSetupCheck;
