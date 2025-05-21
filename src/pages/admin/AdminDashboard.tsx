
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminAnimeList from "@/components/admin/AdminAnimeList";
import AdminAddAnime from "@/components/admin/AdminAddAnime";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminStats from "@/components/admin/AdminStats";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminFileStorage from "@/components/admin/AdminFileStorage";
import AdminAniListIntegration from "@/components/admin/AdminAniListIntegration";

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

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          {renderContent()}
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
