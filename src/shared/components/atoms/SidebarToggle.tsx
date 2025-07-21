import { Icon } from "@/shared/components/atoms/Icon";

interface SidebarToggleProps {
  toggleSidebar: () => void;
}

export function SidebarToggle({ toggleSidebar }: SidebarToggleProps) {
  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-gray-900/80 backdrop-blur border border-white/10 hover:bg-gray-800/80 transition-colors"
    >
      <Icon name="Menu" className="w-5 h-5 text-white" />
    </button>
  );
}
