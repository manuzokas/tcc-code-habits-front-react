import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/shared/components/organisms/navbar";
import { Sidebar } from "@/shared/components/organisms/sidebar/Sidebar";
import { SidebarToggle } from "@/shared/components/atoms/SidebarToggle";
import { cn } from "@/assets/styles/utils/tw";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuthRedirect } from "@/features/auth/hooks/useAuthRedirect";

export function RootLayout() {
  const { session } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useAuthRedirect();

  return (
    <div
      className={cn(
        "min-h-screen w-full overflow-x-hidden transition-colors duration-300",
        "bg-gray-50 text-gray-900 dark:bg-[#0d1117] dark:text-gray-100",
        { "pt-0": !session }
      )}
    >
      {!session && <Navbar />}

      {session && (
        <>
          <Sidebar
            isOpen={isMobileOpen}
            toggleSidebar={() => setIsMobileOpen(!isMobileOpen)}
          />
          <SidebarToggle toggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />
        </>
      )}

      <main
        className={cn(
          "transition-all duration-300",
          session && {
            "ml-0": !isMobileOpen,
            "ml-1": isMobileOpen,
            "md:ml-0": true,
          }
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
