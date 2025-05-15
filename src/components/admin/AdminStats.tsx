
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminStats = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics & Statistics</h2>
        <p className="text-muted-foreground">
          View detailed statistics about your platform usage and engagement.
        </p>
      </div>
      
      <Tabs defaultValue="user" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user">User Stats</TabsTrigger>
          <TabsTrigger value="content">Content Stats</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                User Growth Chart Placeholder
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>User Demographics</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                Demographics Chart Placeholder
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Popular Genres</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                Genres Chart Placeholder
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                Rating Chart Placeholder
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Daily Active Users</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                DAU Chart Placeholder
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Activity Heatmap</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                Heatmap Placeholder
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminStats;
