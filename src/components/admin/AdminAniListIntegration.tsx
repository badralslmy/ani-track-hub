
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Loader2, Check, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchAnimeById, searchAnime, AniListMedia } from "@/services/aniListApi";
import { toast } from "@/components/ui/use-toast";
import { 
  addAnimeFromAniList, 
  addAnimeToCategory, 
  fetchAnimeCategories, 
  AnimeCategory 
} from "@/services/supabaseService";

const AdminAniListIntegration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeId, setAnimeId] = useState("");
  const [searchResults, setSearchResults] = useState<AniListMedia[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AniListMedia | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [addingToDb, setAddingToDb] = useState<Record<number, boolean>>({});

  // جلب فئات الأنمي من قاعدة البيانات
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['animeCategories'],
    queryFn: fetchAnimeCategories
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    try {
      const results = await searchAnime(searchTerm);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "فشل البحث",
        description: "تعذر البحث عن الأنمي. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFetchById = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeId) return;

    setLoading(true);
    try {
      const anime = await fetchAnimeById(Number(animeId));
      setSelectedAnime(anime);
    } catch (error) {
      toast({
        title: "فشل الجلب",
        description: "تعذر جلب الأنمي بواسطة المعرف. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = async (anime: AniListMedia) => {
    if (!selectedCategory) {
      toast({
        title: "تنبيه",
        description: "يرجى اختيار فئة لإضافة الأنمي إليها",
        variant: "destructive",
      });
      return;
    }

    setAddingToDb({...addingToDb, [anime.id]: true});
    
    try {
      // إضافة الأنمي إلى قاعدة البيانات
      const addedAnime = await addAnimeFromAniList(anime);
      
      // إضافة الأنمي إلى الفئة المحددة
      await addAnimeToCategory(addedAnime.id, selectedCategory);
      
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تمت إضافة ${anime.title.english || anime.title.romaji} إلى المكتبة.`,
      });
      
      // عرض التفاصيل
      setSelectedAnime(anime);
    } catch (error) {
      console.error("خطأ عند إضافة الأنمي:", error);
      toast({
        title: "خطأ في الإضافة",
        description: "تعذرت إضافة الأنمي إلى المكتبة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setAddingToDb({...addingToDb, [anime.id]: false});
    }
  };

  const handleAddToBanner = async (anime: AniListMedia) => {
    setAddingToDb({...addingToDb, [anime.id]: true});

    try {
      // البحث عن فئة البانر
      const bannerCategory = categories?.find(cat => cat.name === 'hero_banner');
      
      if (!bannerCategory) {
        throw new Error("فئة البانر غير موجودة");
      }
      
      // إضافة الأنمي إلى قاعدة البيانات
      const addedAnime = await addAnimeFromAniList(anime);
      
      // إضافة الأنمي إلى فئة البانر
      await addAnimeToCategory(addedAnime.id, bannerCategory.id);
      
      toast({
        title: "تمت الإضافة إلى البانر",
        description: `تمت إضافة ${anime.title.english || anime.title.romaji} إلى البانر الرئيسي.`,
      });
    } catch (error) {
      console.error("خطأ عند الإضافة للبانر:", error);
      toast({
        title: "خطأ في الإضافة",
        description: "تعذرت إضافة الأنمي إلى البانر. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setAddingToDb({...addingToDb, [anime.id]: false});
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">تكامل AniList</h2>
        <p className="text-muted-foreground">
          ابحث واستورد أنمي من واجهة برمجة تطبيقات AniList.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اختر الفئة</CardTitle>
          <CardDescription>
            حدد الفئة التي تريد إضافة الأنمي إليها
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">الفئة</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="اختر فئة" />
              </SelectTrigger>
              <SelectContent>
                {loadingCategories ? (
                  <div className="p-2 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  categories?.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.display_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          {!selectedCategory && (
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 rounded-md flex gap-2 items-center">
              <AlertTriangle className="h-5 w-5" />
              <span>يرجى اختيار فئة قبل إضافة أي أنمي</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search">البحث عن أنمي</TabsTrigger>
          <TabsTrigger value="id">جلب بواسطة المعرف</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>البحث عن أنمي</CardTitle>
              <CardDescription>
                ابحث عن أنمي على AniList بواسطة العنوان
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
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
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "بحث"
                  )}
                </Button>
              </form>

              {searchResults.length > 0 && (
                <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((anime) => (
                    <Card key={anime.id} className="overflow-hidden">
                      <div className="aspect-[3/4] relative">
                        <img
                          src={anime.coverImage.large}
                          alt={anime.title.english || anime.title.romaji}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-1">
                          {anime.title.english || anime.title.romaji}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
                          <span>{anime.episodes || '?'} حلقة</span>
                          <span>•</span>
                          <span>{anime.season} {anime.seasonYear}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleAddToLibrary(anime)}
                          disabled={addingToDb[anime.id]}
                        >
                          {addingToDb[anime.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                          ) : (
                            <Plus className="h-4 w-4 mr-1" />
                          )}
                          إضافة للمكتبة
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleAddToBanner(anime)}
                          disabled={addingToDb[anime.id]}
                        >
                          {addingToDb[anime.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-1" />
                          ) : "إضافة للبانر"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="id">
          <Card>
            <CardHeader>
              <CardTitle>جلب بواسطة المعرف</CardTitle>
              <CardDescription>
                احصل على أنمي بواسطة معرف AniList
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFetchById} className="flex gap-2">
                <Input
                  type="number"
                  placeholder="معرف AniList (مثال: 21)"
                  value={animeId}
                  onChange={(e) => setAnimeId(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "جلب"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedAnime && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>الأنمي المُحدد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="md:flex gap-6">
              <div className="md:w-1/4">
                <img
                  src={selectedAnime.coverImage.large}
                  alt={selectedAnime.title.english || selectedAnime.title.romaji}
                  className="w-full rounded-md"
                />
              </div>
              <div className="md:w-3/4 space-y-4 mt-4 md:mt-0">
                <h2 className="text-xl font-bold">
                  {selectedAnime.title.english || selectedAnime.title.romaji}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {selectedAnime.genres.map((genre) => (
                    <span 
                      key={genre} 
                      className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-md text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground">الحالة:</span>{" "}
                      <span>{selectedAnime.status}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">عدد الحلقات:</span>{" "}
                      <span>{selectedAnime.episodes || "?"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">التقييم:</span>{" "}
                      <span>{selectedAnime.meanScore / 10}/10</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الشعبية:</span>{" "}
                      <span>{selectedAnime.popularity}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">الوصف</h3>
                  <p 
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: selectedAnime.description }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button 
              onClick={() => handleAddToBanner(selectedAnime)}
              disabled={addingToDb[selectedAnime.id]}
            >
              {addingToDb[selectedAnime.id] ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : "إضافة للبانر"}
            </Button>
            <Button 
              onClick={() => handleAddToLibrary(selectedAnime)}
              disabled={addingToDb[selectedAnime.id]}
            >
              {addingToDb[selectedAnime.id] ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : "إضافة للمكتبة"}
            </Button>
            <Button variant="outline" onClick={() => setSelectedAnime(null)}>
              إلغاء
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AdminAniListIntegration;
