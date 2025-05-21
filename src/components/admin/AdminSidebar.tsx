
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
import { Button } from "@/components/ui/button";

export default function AdminSidebar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || "overview";
  
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
    <div className="bg-card border-l p-4 w-64">
      <div className="border-b pb-2 mb-4">
        <h2 className="font-bold text-xl">لوحة الإدارة</h2>
      </div>
      
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link 
            key={item.value}
            to={`/admin?tab=${item.value}`}
            className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted ${
              currentTab === item.value ? "bg-secondary text-secondary-foreground font-medium" : ""
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-8 pt-4 border-t">
        <Link to="/">
          <Button variant="outline" className="w-full">
            العودة إلى الموقع
          </Button>
        </Link>
      </div>
    </div>
  );
}
