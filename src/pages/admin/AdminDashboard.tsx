
import { useState } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  Database, 
  FilePlus, 
  Users, 
  BarChart 
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminOverview from "@/components/admin/AdminOverview";
import AdminAnimeList from "@/components/admin/AdminAnimeList";
import AdminAddAnime from "@/components/admin/AdminAddAnime";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminStats from "@/components/admin/AdminStats";
import AdminSettings from "@/components/admin/AdminSettings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout>
      <div className="container py-6">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your anime database, users, and application settings.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="anime-list" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">Anime List</span>
              </TabsTrigger>
              <TabsTrigger value="add-anime" className="flex items-center gap-2">
                <FilePlus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Anime</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                <span className="hidden sm:inline">Statistics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <AdminOverview />
            </TabsContent>
            
            <TabsContent value="anime-list" className="mt-6">
              <AdminAnimeList />
            </TabsContent>
            
            <TabsContent value="add-anime" className="mt-6">
              <AdminAddAnime />
            </TabsContent>
            
            <TabsContent value="users" className="mt-6">
              <AdminUsers />
            </TabsContent>
            
            <TabsContent value="statistics" className="mt-6">
              <AdminStats />
            </TabsContent>
            
            <TabsContent value="settings" className="mt-6">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
