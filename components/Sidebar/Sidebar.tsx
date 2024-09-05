import { Logo } from "@/components/Logo";
import { SidebarRoutes } from "../SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col border-r">
        <Logo />
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
