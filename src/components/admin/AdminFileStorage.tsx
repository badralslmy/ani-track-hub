
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Loader2, PlusCircle, Edit, Trash2, ExternalLink, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllAnime, fetchAnimeEpisodes, addEpisodeLink, deleteEpisodeLink, Episode, AnimeRecord } from "@/services/supabaseService";
import { toast } from "@/components/ui/use-toast";

export default function AdminFileStorage() {
  const [selectedAnimeId, setSelectedAnimeId] = useState<string>("");
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingEpisode, setIsEditingEpisode] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [formData, setFormData] = useState({
    episodeNumber: 1,
    title: "",
    videoUrl: ""
  });

  // جلب قائمة الأنمي
  const { data: animeList } = useQuery({
    queryKey: ['allAnime'],
    queryFn: fetchAllAnime
  });

  // جلب حلقات الأنمي المحدد
  const { data: episodes, isLoading: isLoadingEpisodes, refetch: refetchEpisodes } = useQuery({
    queryKey: ['animeEpisodes', selectedAnimeId],
    queryFn: () => fetchAnimeEpisodes(selectedAnimeId),
    enabled: !!selectedAnimeId
  });

  // تصفية قائمة الأنمي بناء على البحث
  const filteredAnime = animeList?.filter(anime => 
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // تحديث بيانات النموذج عند تغيير رقم الحلقة (فقط للإضافة الجديدة)
  useEffect(() => {
    if (!isEditingEpisode) {
      setFormData(prev => ({
        ...prev,
        title: `الحلقة ${prev.episodeNumber}`
      }));
    }
  }, [formData.episodeNumber, isEditingEpisode]);

  // معالجة إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAnimeId) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار أنمي",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await addEpisodeLink(
        selectedAnimeId,
        formData.episodeNumber,
        formData.videoUrl,
        formData.title
      );
      
      await refetchEpisodes();
      
      // إعادة ضبط النموذج
      setFormData({
        episodeNumber: formData.episodeNumber + 1,
        title: `الحلقة ${formData.episodeNumber + 1}`,
        videoUrl: ""
      });
      
      if (isEditingEpisode) {
        setIsEditingEpisode(false);
        setCurrentEpisode(null);
      }
      
      setIsAddingLink(false);
      
      toast({
        title: "تم بنجاح",
        description: isEditingEpisode 
          ? `تم تحديث رابط الحلقة ${formData.episodeNumber} بنجاح`
          : `تمت إضافة رابط الحلقة ${formData.episodeNumber} بنجاح`,
      });
    } catch (error) {
      console.error("Error adding/editing episode link:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة/تعديل رابط الحلقة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // فتح مربع حوار التعديل مع بيانات الحلقة
  const handleEditEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setFormData({
      episodeNumber: episode.episode_number,
      title: episode.title || `الحلقة ${episode.episode_number}`,
      videoUrl: episode.video_url || ""
    });
    setIsEditingEpisode(true);
    setIsAddingLink(true);
  };

  // حذف رابط الحلقة
  const handleDeleteEpisode = async (episode: Episode) => {
    if (!confirm(`هل أنت متأكد من حذف الحلقة ${episode.episode_number}؟`)) return;
    
    try {
      await deleteEpisodeLink(episode.id);
      await refetchEpisodes();
      
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف الحلقة ${episode.episode_number} بنجاح`,
      });
    } catch (error) {
      console.error("Error deleting episode:", error);
      toast({
        title: "خطأ في الحذف",
        description: "حدث خطأ أثناء محاولة حذف الحلقة",
        variant: "destructive",
      });
    }
  };

  // إعادة ضبط حالة الإضافة عند إغلاق النافذة
  const handleDialogChange = (open: boolean) => {
    setIsAddingLink(open);
    if (!open) {
      setIsEditingEpisode(false);
      setCurrentEpisode(null);
      if (!isEditingEpisode) {
        setFormData({
          episodeNumber: 1,
          title: "الحلقة 1",
          videoUrl: ""
        });
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>روابط المشاهدة وإدارة الملفات</CardTitle>
        <CardDescription>
          أضف وعدل روابط حلقات الأنمي
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <Label htmlFor="anime-search">ابحث عن أنمي</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="anime-search"
                  className="pl-8"
                  placeholder="ابحث عن أنمي..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="anime-select">اختر الأنمي</Label>
              <Select value={selectedAnimeId} onValueChange={setSelectedAnimeId}>
                <SelectTrigger id="anime-select">
                  <SelectValue placeholder="اختر أنمي" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAnime?.map(anime => (
                    <SelectItem key={anime.id} value={anime.id}>
                      {anime.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {selectedAnimeId && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">روابط الحلقات</h3>
              <Dialog open={isAddingLink} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <PlusCircle className="h-4 w-4" /> إضافة رابط حلقة
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {isEditingEpisode ? "تعديل رابط حلقة" : "إضافة رابط حلقة جديدة"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="grid gap-2">
                      <Label htmlFor="episode-number">رقم الحلقة</Label>
                      <Input
                        id="episode-number"
                        type="number"
                        min="1"
                        value={formData.episodeNumber}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          episodeNumber: parseInt(e.target.value) 
                        }))}
                        required
                        disabled={isEditingEpisode}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="episode-title">عنوان الحلقة</Label>
                      <Input
                        id="episode-title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          title: e.target.value 
                        }))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="video-url">رابط الفيديو</Label>
                      <Input
                        id="video-url"
                        placeholder="https://..."
                        value={formData.videoUrl}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          videoUrl: e.target.value 
                        }))}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button type="button" variant="outline">إلغاء</Button>
                      </DialogClose>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" /> جاري الحفظ
                          </>
                        ) : isEditingEpisode ? "تحديث الرابط" : "إضافة الرابط"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {isLoadingEpisodes ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : episodes && episodes.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="py-2 px-4 text-right">رقم الحلقة</th>
                      <th className="py-2 px-4 text-right">العنوان</th>
                      <th className="py-2 px-4 text-right">الرابط</th>
                      <th className="py-2 px-4 text-right">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {episodes.map(episode => (
                      <tr key={episode.id} className="hover:bg-muted/30">
                        <td className="py-2 px-4">{episode.episode_number}</td>
                        <td className="py-2 px-4">{episode.title || `-`}</td>
                        <td className="py-2 px-4 max-w-xs truncate">
                          {episode.video_url ? (
                            <a 
                              href={episode.video_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <span className="truncate">{episode.video_url}</span>
                              <ExternalLink className="h-3 w-3 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-muted-foreground">لا يوجد رابط</span>
                          )}
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditEpisode(episode)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteEpisode(episode)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md">
                <p className="text-muted-foreground">
                  لا توجد حلقات مضافة. استخدم زر "إضافة رابط حلقة" لإضافة حلقات جديدة.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
