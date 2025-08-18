import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/shared/components/organisms/navbar";
import { Sidebar } from "@/shared/components/organisms/sidebar/Sidebar";
import { SidebarToggle } from "@/shared/components/atoms/SidebarToggle";
import { cn } from "@/assets/styles/utils/tw";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export function RootLayout() {
  const { session } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-gray-950 text-gray-100"
      )}
    >
      {!session && <Navbar />}

      {session && (
        <>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <SidebarToggle toggleSidebar={toggleSidebar} />
        </>
      )}

      <main
        className={cn(
          "transition-all duration-300",
          session && {
            "pl-16 md:pl-18": !isSidebarOpen, 
            "pl-64 md:pl-64": isSidebarOpen,
          }
        )}
      >
        <Outlet />{" "}
      </main>
    </div>
  );
}
