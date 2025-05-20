
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Database,
  FilePlus,
  ExternalLink,
  Users,
  BarChart,
  Settings,
  FolderIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const menuItems = [
    {
      title: "لوحة المعلومات",
      icon: LayoutDashboard,
      value: "overview",
    },
    {
      title: "قائمة الأنمي",
      icon: Database,
      value: "anime-list",
    },
    {
      title: "إضافة أنمي",
      icon: FilePlus,
      value: "add-anime",
    },
    {
      title: "AniList API",
      icon: ExternalLink,
      value: "anilist",
    },
    {
      title: "المستخدمين",
      icon: Users,
      value: "users",
    },
    {
      title: "الإحصائيات",
      icon: BarChart,
      value: "statistics",
    },
    {
      title: "الإعدادات",
      icon: Settings,
      value: "settings",
    },
    {
      title: "إدارة الملفات",
      icon: FolderIcon,
      value: "files",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between p-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">لوحة الإدارة</span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="py-4">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.value}>
                <SidebarMenuButton
                  asChild
                  isActive={currentPath.includes(`/admin?tab=${item.value}`)}
                >
                  <Link to={`/admin?tab=${item.value}`}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Link to="/">
          <Button variant="outline" className="w-full">
            العودة إلى الموقع
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
