
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminFileStorage() {
  // Mock
  const links = [
    { id: 1, episode: "S1E1", url: "https://mega.nz/..." },
    { id: 2, episode: "S1E2", url: "https://drive.google.com/..." },
    { id: 3, episode: "S1E3", url: "" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>روابط المشاهدة وإدارة الملفات</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th>الحلقة</th>
              <th>الرابط</th>
              <th>إجراء</th>
            </tr>
          </thead>
          <tbody>
            {links.map(l => (
              <tr key={l.id}>
                <td>{l.episode}</td>
                <td>
                  {l.url ? (
                    <a href={l.url} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                      رابط خارجي
                    </a>
                  ) : <span className="text-muted-foreground">لا يوجد</span>}
                </td>
                <td>
                  <Button size="sm">تعديل</Button>
                  <Button size="sm" variant="destructive" className="ml-2">حذف</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button className="mt-4">إضافة رابط للحلقة</Button>
      </CardContent>
    </Card>
  );
}
