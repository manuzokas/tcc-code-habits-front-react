import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/shared/components/organisms/navbar";
import { Sidebar } from "@/shared/components/organisms/sidebar/Sidebar";
import { SidebarToggle } from "@/shared/components/atoms/SidebarToggle";
import { cn } from "@/features/theme/utils/tw";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function RootLayout() {
  const { user } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div
      className={cn(
        "min-h-screen w-full overflow-x-hidden transition-colors duration-300",
        "bg-gray-50 text-gray-900 dark:bg-[#0d1117] dark:text-gray-100",
        // Adiciona padding top apenas quando navbar estiver visível
        { "pt-0": !user }
      )}
    >
      {/* Renderiza Navbar apenas para usuários não logados */}
      {!user && <Navbar />}

      {/* Renderiza Sidebar e toggle apenas para usuários logados */}
      {user && (
        <>
          <Sidebar
            isOpen={isMobileOpen}
            toggleSidebar={() => setIsMobileOpen(!isMobileOpen)}
          />
          <SidebarToggle toggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />
        </>
      )}

      {/* Conteúdo principal com margem adaptável */}
      <main
        className={cn(
          "transition-all duration-300",
          // Ajusta margem baseado no estado de autenticação e mobile
          user && {
            "ml-0": !isMobileOpen,
            "ml-1": isMobileOpen,
            "md:ml-0": true, // Sempre margem no desktop quando logado
          }
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
