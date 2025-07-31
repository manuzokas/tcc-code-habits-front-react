import { Icon } from "@/shared/components/atoms/Icon"; // Certifique-se de que Icon pode aceitar 'string' ou ajuste a tipagem
import { useAuth } from "@/features/auth/hooks/useAuth";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// Defina um tipo para os nomes dos ícones se sua componente Icon.tsx precisar disso
// Exemplo (adapte conforme sua biblioteca de ícones ou implementação de Icon):
type IconName = "LayoutDashboard" | "Activity" | "Timer" | "Music" | "Trophy" | "Settings" | "X" | "Code" | "LogOut";
// Se sua Icon componente aceitar qualquer string, você pode remover este tipo e usar 'string' diretamente.
// Se sua Icon for de uma lib como 'lucide-react', importe seus tipos:
// import type { IconNode } from 'lucide-react'; ou verifique a documentação da sua Icon

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  // Agora desestruturamos 'user', 'profile', 'isLoadingProfile' e 'signOut' do useAuth
  const { user, profile, isLoadingProfile, signOut } = useAuth();

  // Constantes para cálculo de XP e Nível
  const XP_PER_LEVEL = 1000; // XP necessária para cada nível (ajuste como no useGamification)

  // Dados do usuário para exibição
  const userName = profile?.username || user?.email?.split('@')[0] || "Usuário"; // Preferir username do profile, senão email, senão default
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = user?.email || "email@exemplo.com";

  // Dados de Gamificação (XP e Nível)
  const userXp = profile?.xp ?? 0; // Pega a XP do profile, default para 0
  const userLevel = Math.floor(userXp / XP_PER_LEVEL) + 1;
  const xpCurrentLevel = userXp % XP_PER_LEVEL;
  const xpProgressPercentage = (xpCurrentLevel / XP_PER_LEVEL) * 100;


  const navItems: { name: string; icon: IconName; path: string }[] = [ // Usando IconName para tipar
    { name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" },
    { name: "Métricas", icon: "Activity", path: "/metrics" },
    { name: "Timer", icon: "Timer", path: "/timer" },
    { name: "Música", icon: "Music", path: "/music" },
    { name: "Conquistas", icon: "Trophy", path: "/achievements" },
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
        {/* Logo e Botão de Fechar */}
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

        {/* Perfil do Usuário */}
        <div className="flex items-center gap-3 mb-8 p-3 rounded-lg bg-gray-900">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
            {isLoadingProfile ? "" : userInitial} {/* Exibe inicial apenas quando o perfil carregar */}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">
              {isLoadingProfile ? "Carregando..." : userName} {/* Exibe nome ou "Carregando..." */}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Barra de Progresso XP */}
        <div className="mb-8">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold">Nível {userLevel}</span>
            <span className="text-gray-400">{xpCurrentLevel}/{XP_PER_LEVEL} XP</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${xpProgressPercentage}%` }} // Ajusta a largura com base na % de XP
            ></div>
          </div>
        </div>

        {/* Navegação */}
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
                        : "hover:bg-blue-800/50 text-gray-300"
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

        {/* Botão de Sair */}
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