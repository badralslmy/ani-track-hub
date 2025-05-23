
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Edit, Search, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { fetchAllAnime, deleteAnime, AnimeRecord } from "@/services/supabaseService";
import { toast } from "@/components/ui/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const AdminAnimeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [animeToDelete, setAnimeToDelete] = useState<AnimeRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  
  // استخدام React Query لجلب بيانات الأنمي
  const { data: animes, isLoading, error, refetch } = useQuery({
    queryKey: ['allAnime'],
    queryFn: fetchAllAnime
  });
  
  // إذا كان هناك خطأ في جلب البيانات
  useEffect(() => {
    if (error) {
      toast({
        title: "خطأ في جلب البيانات",
        description: "تعذر جلب قائمة الأنمي من قاعدة البيانات.",
        variant: "destructive",
      });
    }
  }, [error]);

  // تصفية الأنمي بناءً على مصطلح البحث
  const filteredAnimes = animes?.filter(anime => 
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // فتح مربع حوار تأكيد الحذف
  const openDeleteDialog = (anime: AnimeRecord) => {
    setAnimeToDelete(anime);
    setDeleteDialogOpen(true);
  };

  // تنفيذ عملية الحذف
  const handleDeleteAnime = async () => {
    if (!animeToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteAnime(animeToDelete.id);
      await refetch();
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف الأنمي "${animeToDelete.title}" بنجاح`,
      });
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting anime:", error);
      toast({
        title: "خطأ في الحذف",
        description: "تعذر حذف الأنمي. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // توجيه المستخدم إلى صفحة تعديل الأنمي
  const handleEditAnime = (anime: AnimeRecord) => {
    // حفظ بيانات الأنمي المحدد في localStorage للاستخدام في صفحة التعديل
    localStorage.setItem('animeToEdit', JSON.stringify(anime));
    navigate(`/admin?tab=add-anime&edit=${anime.id}`);
    
    toast({
      title: "تحرير الأنمي",
      description: `انتقل إلى تحرير "${anime.title}"`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">قاعدة بيانات الأنمي</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="ابحث عن أنمي..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir="auto"
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredAnimes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            {animes?.length === 0
              ? "لا يوجد أنمي في قاعدة البيانات بعد. أضف بعض الأنمي باستخدام تكامل AniList."
              : "لا توجد نتائج تطابق بحثك."}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead className="hidden md:table-cell">التصنيفات</TableHead>
                <TableHead className="hidden md:table-cell">عدد الحلقات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnimes.map((anime) => (
                <TableRow key={anime.id}>
                  <TableCell className="font-medium">{anime.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{anime.genres?.join(", ") || "-"}</TableCell>
                  <TableCell className="hidden md:table-cell">{anime.episodes || "-"}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                      anime.status === "FINISHED" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                        : anime.status === "RELEASING"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                    }`}>
                      {anime.status || "غير معروف"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditAnime(anime)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openDeleteDialog(anime)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* مربع حوار تأكيد الحذف */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد أنك تريد حذف الأنمي "{animeToDelete?.title}"؟
              <br />
              هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAnime}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> 
                  جاري الحذف...
                </>
              ) : "تأكيد الحذف"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAnimeList;
