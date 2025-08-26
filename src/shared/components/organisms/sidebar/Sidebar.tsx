import { Icon } from "@/shared/components/atoms/Icon"; 
import { useAuth } from "@/features/auth/hooks/useAuth";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import type { IconName } from "@/shared/types/iconTypes";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {

  const { user, profile, isLoadingProfile, signOut } = useAuth();

  const XP_PER_LEVEL = 1000;

  const userName = profile?.username || user?.email?.split('@')[0] || "Usuário";
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = user?.email || "email@exemplo.com";

  const userXp = profile?.xp ?? 0;
  const userLevel = Math.floor(userXp / XP_PER_LEVEL) + 1;
  const xpCurrentLevel = userXp % XP_PER_LEVEL;
  const xpProgressPercentage = (xpCurrentLevel / XP_PER_LEVEL) * 100;


  const navItems: { name: string; icon: IconName; path: string }[] = [
    { name: "Hub", icon: "LayoutGrid", path: "/hub" },
    { name: "Métricas", icon: "Activity", path: "/metrics" },
    { name: "Timer", icon: "Timer", path: "/timer" },
    // { name: "Música", icon: "Music", path: "/music" },
    // { name: "Conquistas", icon: "Trophy", path: "/achievements" },
    { name: "Configurações", icon: "Settings", path: "/settings" },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 h-screen bg-gray-950/90 backdrop-blur-lg z-50 flex flex-col shadow-xl shadow-emerald-400 ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500/20 to-blue-500/20 shadow-lg shadow-green-500 rounded-lg">
              <Icon name="Code" className="w-5 h-5 text-green-300" />
            </div>
            <span className="text-xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-semibold">
              CodeHabits
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-800"
          >
            <Icon name="X" className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8 p-3 rounded-lg bg-gray-900">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
            {isLoadingProfile ? "" : userInitial} 
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">
              {isLoadingProfile ? "Carregando..." : userName}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {userEmail}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold">Nível {userLevel}</span>
            <span className="text-gray-400">{xpCurrentLevel}/{XP_PER_LEVEL} XP</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${xpProgressPercentage}%` }} 
            ></div>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-500/10 text-green-400"
                        : "hover:bg-blue-500/10 text-gray-300"
                    }`
                  }
                >
                  <Icon name={item.icon} className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={signOut}
          className="mt-auto flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800/50"
        >
          <Icon name="LogOut" className="w-5 h-5 text-red-500" />
          <span className="text-red-500 font-semibold">Sair</span>
        </button>
      </div>
    </motion.div>
  );
}