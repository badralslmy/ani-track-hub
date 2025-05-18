
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const [anilistId, setAnilistId] = useState<string>("26586");
  const [anilistSecret, setAnilistSecret] = useState<string>("rCCmKCWrxTFiuayWx9O46u9pFjzMnoZ87v3eZaiu");

  const handleSaveApiChanges = () => {
    // In a real app, you would save these to a database
    localStorage.setItem('anilist_id', anilistId);
    localStorage.setItem('anilist_secret', anilistSecret);
    toast({
      title: "Settings saved",
      description: "Your API settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">System Settings</h2>
        <p className="text-muted-foreground">
          Configure your application settings and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the general settings for your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="AniTrack" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea id="site-description" defaultValue="Your personal anime tracking companion to organize and discover your favorite anime shows." />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@anitrack.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@anitrack.com" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" defaultValue="/lovable-uploads/e81bef10-14f1-4e17-901d-64735aae78ab.png" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input id="favicon" defaultValue="/lovable-uploads/e81bef10-14f1-4e17-901d-64735aae78ab.png" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode-default" defaultChecked />
                <Label htmlFor="dark-mode-default">Use Dark Mode by Default</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>
                Configure external API integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="anilist-id">AniList Client ID</Label>
                <Input 
                  id="anilist-id" 
                  value={anilistId}
                  onChange={(e) => setAnilistId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anilist-secret">AniList Client Secret</Label>
                <Input 
                  id="anilist-secret" 
                  type="password" 
                  value={anilistSecret}
                  onChange={(e) => setAnilistSecret(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mal-api">MyAnimeList API Key</Label>
                <Input id="mal-api" type="password" defaultValue="•••••••••••••••••" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-sync" defaultChecked />
                <Label htmlFor="auto-sync">Auto-sync with External APIs</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveApiChanges}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure permissions for different user roles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Admin Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-manage-users" defaultChecked />
                      <Label htmlFor="admin-manage-users">Manage Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-manage-content" defaultChecked />
                      <Label htmlFor="admin-manage-content">Manage Content</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-manage-settings" defaultChecked />
                      <Label htmlFor="admin-manage-settings">Manage Settings</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Moderator Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="mod-manage-users" />
                      <Label htmlFor="mod-manage-users">Manage Users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="mod-manage-content" defaultChecked />
                      <Label htmlFor="mod-manage-content">Manage Content</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="mod-manage-settings" />
                      <Label htmlFor="mod-manage-settings">Manage Settings</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
