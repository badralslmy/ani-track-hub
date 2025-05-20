
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminStats = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">الإحصائيات والتحليلات</h2>
        <p className="text-muted-foreground">
          عرض إحصائيات مفصلة حول استخدام المنصة والتفاعل.
        </p>
      </div>
      
      <Tabs defaultValue="user" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user">إحصائيات المستخدمين</TabsTrigger>
          <TabsTrigger value="content">إحصائيات المحتوى</TabsTrigger>
          <TabsTrigger value="engagement">التفاعل</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>نمو المستخدمين</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                رسم بياني لنمو المستخدمين
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>ديموغرافيا المستخدمين</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                رسم بياني للبيانات الديموغرافية
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>الأنواع الشائعة</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                رسم بياني للأنواع
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>توزيع التقييمات</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                رسم بياني للتقييمات
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>المستخدمين النشطين يوميًا</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                رسم بياني للمستخدمين النشطين يوميًا
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>خريطة حرارة النشاط</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                خريطة الحرارة
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminStats;
