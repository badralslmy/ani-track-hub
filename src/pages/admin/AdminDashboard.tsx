
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminAnimeList from "@/components/admin/AdminAnimeList";
import AdminAddAnime from "@/components/admin/AdminAddAnime";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminStats from "@/components/admin/AdminStats";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminFileStorage from "@/components/admin/AdminFileStorage";
import AdminAniListIntegration from "@/components/admin/AdminAniListIntegration";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BarChart, FilePlus, Database, FolderIcon } from "lucide-react";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get("tab");
  
  // تحديد التبويب النشط من الرابط أو استخدام القيمة الافتراضية
  const [activeTab, setActiveTab] = useState(tabParam || "overview");

  // تحديث عنوان URL عند تغيير التبويب
  useEffect(() => {
    if (tabParam !== activeTab) {
      searchParams.set("tab", activeTab);
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
  }, [activeTab, location.pathname, navigate, searchParams, tabParam]);

  // تحديث التبويب النشط عند تغيير الرابط
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // التنقل إلى التبويب المحدد
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  // عرض المحتوى المناسب حسب التبويب النشط
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview />;
      case "anime-list":
        return <AdminAnimeList />;
      case "add-anime":
        return <AdminAddAnime />;
      case "anilist":
        return <AdminAniListIntegration />;
      case "users":
        return <AdminUsers />;
      case "statistics":
        return <AdminStats />;
      case "settings":
        return <AdminSettings />;
      case "files":
        return <AdminFileStorage />;
      default:
        return <AdminOverview />;
    }
  };

  // قائمة العناصر الرئيسية للقائمة العلوية
  const topMenuItems = [
    {
      title: "إحصائيات الموقع",
      icon: BarChart,
      value: "statistics",
    },
    {
      title: "إضافة عمل",
      icon: FilePlus,
      value: "add-anime",
    },
    {
      title: "فهرس الأعمال",
      icon: Database,
      value: "anime-list",
    },
    {
      title: "فهرس الملفات",
      icon: FolderIcon,
      value: "files",
    },
  ];

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="mb-6">
          <Menubar className="border-none bg-background p-0 justify-center">
            {topMenuItems.map((item) => (
              <MenubarMenu key={item.value}>
                <MenubarTrigger 
                  onClick={() => handleNavigate(item.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    activeTab === item.value ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </MenubarTrigger>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>
        
        <div className="flex flex-col gap-6">
          {renderContent()}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
