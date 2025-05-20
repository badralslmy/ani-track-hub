
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Plus, Share2, Play, Loader2, Calendar, Clock, Film, Heart } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import AnimeCard from "@/components/anime/AnimeCard";
import CountdownTimer from "@/components/anime/CountdownTimer";
import { toast } from "sonner";
import { recommendedAnime } from "@/data/mock";

// نوع البيانات للأنمي
interface AnimeDetail {
  id: string;
  title: string;
  alternativeTitle?: string;
  description: string | null;
  coverImage: string | null;
  bannerImage: string | null;
  status: string | null;
  episodes: number | null;
  duration: number | null;
  genres: string[] | null;
  studios: string[] | null;
  season: string | null;
  seasonYear: number | null;
  averageScore: number | null;
  popularity: number | null;
  nextAiringEpisode: {
    episode: number;
    airingAt: number;
  } | null;
  characters: Array<{
    id: string;
    name: string;
    image: string;
    role: string;
    voiceActor?: {
      name: string;
      image: string;
    };
  }>;
  seasons: Array<{
    id: string;
    title: string;
    episodes: Array<{
      number: number;
      title: string;
      duration: number;
    }>;
  }>;
  writer: string | null;
}

// دالة لجلب تفاصيل الأنمي من قاعدة البيانات
const fetchAnimeDetails = async (id: string): Promise<AnimeDetail | null> => {
  try {
    // هنا يمكن إضافة طلب API لجلب البيانات من supabase أو API خارجي
    // يتم استخدام بيانات وهمية مؤقتاً للعرض
    
    // للتوضيح: في التطبيق الحقيقي، ستقوم بجلب البيانات من قاعدة البيانات بدلاً من هذا التأخير الصناعي
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // تحقق من وجود معرف الأنمي في البيانات الوهمية لأغراض العرض
    const foundAnime = recommendedAnime.find(anime => anime.id === id);
    
    if (!foundAnime) {
      throw new Error("لم يتم العثور على الأنمي");
    }

    // حساب وقت البث القادم للعد التنازلي - عشوائي للعرض التجريبي
    const nextAiringDate = new Date();
    nextAiringDate.setDate(nextAiringDate.getDate() + Math.floor(Math.random() * 7) + 1); // بين 1-7 أيام
    
    // بناء كائن الأنمي بناءً على البيانات المتوفرة
    return {
      id: foundAnime.id,
      title: foundAnime.title,
      alternativeTitle: `الاسم البديل للأنمي ${foundAnime.title}`,
      description: "هذا وصف مؤقت للأنمي. في التطبيق الحقيقي، سيتم استرداد هذا من قاعدة البيانات.",
      coverImage: foundAnime.image,
      bannerImage: foundAnime.image, // استخدام نفس الصورة كصورة غلاف مؤقتاً
      status: "اكتمل",
      episodes: 12,
      duration: 24,
      genres: ["أكشن", "مغامرة", "خيال"],
      studios: ["استوديو 1"],
      season: "ربيع",
      seasonYear: 2023,
      averageScore: foundAnime.rating ? foundAnime.rating * 10 : 80,
      popularity: 10000,
      nextAiringEpisode: {
        episode: foundAnime.id.charCodeAt(0) % 24 + 1, // عشوائي للعرض التجريبي
        airingAt: nextAiringDate.getTime() / 1000
      },
      characters: [
        {
          id: "1",
          name: "شخصية 1",
          image: "https://s4.anilist.co/file/anilistcdn/character/large/b40882-F3gr1PJP3Eo0.png",
          role: "رئيسي",
          voiceActor: {
            name: "ممثل صوتي 1",
            image: "https://s4.anilist.co/file/anilistcdn/staff/large/n95672-2RfLzncNyvbR.jpg"
          }
        },
        {
          id: "2",
          name: "شخصية 2",
          image: "https://s4.anilist.co/file/anilistcdn/character/large/b40881-dlqNdbjJ83ZL.jpg",
          role: "رئيسي",
          voiceActor: {
            name: "ممثل صوتي 2",
            image: "https://s4.anilist.co/file/anilistcdn/staff/large/n100142-lJt9Gp3rN00N.png"
          }
        },
        {
          id: "3",
          name: "شخصية 3",
          image: "https://s4.anilist.co/file/anilistcdn/character/large/b40882-F3gr1PJP3Eo0.png",
          role: "ثانوي",
          voiceActor: {
            name: "ممثل صوتي 3",
            image: "https://s4.anilist.co/file/anilistcdn/staff/large/n95672-2RfLzncNyvbR.jpg"
          }
        },
      ],
      seasons: [
        {
          id: "s1",
          title: "الموسم 1",
          episodes: Array.from({ length: 12 }, (_, i) => ({
            number: i + 1,
            title: `الحلقة ${i + 1}`,
            duration: 24
          }))
        },
        {
          id: "s2",
          title: "الموسم 2",
          episodes: Array.from({ length: 12 }, (_, i) => ({
            number: i + 1,
            title: `الحلقة ${i + 1}`,
            duration: 24
          }))
        }
      ],
      writer: "كاتب الأنمي"
    };
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return null;
  }
};

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState("episodes");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [watchProgress, setWatchProgress] = useState(35);
  
  // استخدام React Query لجلب بيانات الأنمي
  const { data: anime, isLoading, error } = useQuery({
    queryKey: ['anime', id],
    queryFn: () => fetchAnimeDetails(id || ""),
    enabled: !!id
  });
  
  // تعيين الموسم الافتراضي عند تحميل البيانات
  useEffect(() => {
    if (anime && anime.seasons.length > 0) {
      setSelectedSeason(anime.seasons[anime.seasons.length - 1].id);
    }
  }, [anime]);
  
  // إيجاد الموسم المختار
  const currentSeason = anime?.seasons.find(season => season.id === selectedSeason) || anime?.seasons[0];

  // دالة تحويل timestamp إلى تاريخ
  const getNextEpisodeDate = (timestamp: number) => {
    return new Date(timestamp * 1000);
  };

  // إظهار رسالة التحميل
  if (isLoading) {
    return (
      <AppLayout>
        <div className="container flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-anitrack-purple" />
            <p className="text-muted-foreground">جاري تحميل تفاصيل الأنمي...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // إظهار رسالة الخطأ
  if (error || !anime) {
    return (
      <AppLayout>
        <div className="container flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">لم يتم العثور على الأنمي</h2>
            <p className="text-muted-foreground mb-4">
              عذراً، لم نتمكن من العثور على تفاصيل هذا الأنمي
            </p>
            <Button onClick={() => window.history.back()}>العودة للخلف</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // دالة إضافة الأنمي إلى قائمة المشاهدة
  const handleAddToList = () => {
    toast.success("تمت إضافة الأنمي إلى قائمتك", {
      description: `تمت إضافة ${anime.title} إلى قائمة المشاهدة الخاصة بك`
    });
  };

  // دالة تقييم الأنمي
  const handleRateAnime = () => {
    toast.success("تم حفظ تقييمك", {
      description: `شكراً لك على تقييم ${anime.title}`
    });
  };

  return (
    <AppLayout>
      {/* قسم الغلاف */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img
            src={anime.bannerImage || anime.coverImage || "/placeholder.svg"}
            alt={anime.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      </div>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 -mt-32 md:-mt-40 mb-6 relative z-10">
          {/* صورة غلاف الأنمي */}
          <div className="hidden md:block">
            <div className="rounded-lg overflow-hidden border shadow-lg">
              <img 
                src={anime.coverImage || "/placeholder.svg"} 
                alt={anime.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
            
            <div className="mt-4 space-y-3">
              <Button 
                className="w-full bg-anitrack-purple hover:bg-anitrack-purple-dark gap-2"
                onClick={handleAddToList}
              >
                <Plus className="w-4 h-4" /> إضافة إلى القائمة
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" onClick={handleRateAnime}>
                  <Star className="w-4 h-4 ml-2" /> تقييم
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 ml-2" /> مشاركة
                </Button>
              </div>
            </div>

            {/* معلومات إضافية */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{anime.season || "غير محدد"} {anime.seasonYear || ""}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Film className="w-4 h-4" />
                <span>{anime.episodes || "غير محدد"} حلقة</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{anime.duration || "غير محدد"} دقيقة</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4" />
                <span>{anime.status || "غير محدد"}</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">الاستوديوهات</h4>
                <p>{anime.studios?.join(", ") || "غير محدد"}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">الكاتب</h4>
                <p>{anime.writer || "غير محدد"}</p>
              </div>
            </div>
          </div>
          
          {/* تفاصيل الأنمي */}
          <div className="space-y-6">
            <div className="md:flex md:items-start md:gap-6">
              <div className="md:hidden mb-4">
                <div className="rounded-lg overflow-hidden border shadow-lg w-[200px] mx-auto">
                  <img 
                    src={anime.coverImage || "/placeholder.svg"} 
                    alt={anime.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold">{anime.title}</h1>
                  {anime.alternativeTitle && (
                    <p className="text-muted-foreground">{anime.alternativeTitle}</p>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {anime.genres?.map((genre, index) => (
                    <Link 
                      to={`/browse?genre=${genre}`}
                      key={index} 
                      className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground hover:bg-anitrack-purple hover:text-white transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="mr-1 font-medium">{anime.averageScore ? (anime.averageScore / 10).toFixed(1) : "غير محدد"}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-muted-foreground">{anime.popularity?.toLocaleString() || "0"} متابع</span>
                </div>
                
                {/* إضافة نظام التقدم في المشاهدة */}
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">تقدم المشاهدة</span>
                    <span className="text-sm font-medium">{watchProgress}%</span>
                  </div>
                  <Slider
                    defaultValue={[watchProgress]}
                    max={100}
                    step={1}
                    onValueChange={(values) => setWatchProgress(values[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>الحلقة {Math.ceil((watchProgress / 100) * (anime.episodes || 12))}/{anime.episodes || 12}</span>
                    <Link to="#" className="text-anitrack-purple hover:text-anitrack-purple-dark">
                      متابعة المشاهدة
                    </Link>
                  </div>
                </div>
                
                <div className="md:hidden mt-4 space-y-3">
                  <Button 
                    className="w-full bg-anitrack-purple hover:bg-anitrack-purple-dark gap-2"
                    onClick={handleAddToList}
                  >
                    <Plus className="w-4 h-4" /> إضافة إلى القائمة
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full" onClick={handleRateAnime}>
                      <Star className="w-4 h-4 ml-2" /> تقييم
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 ml-2" /> مشاركة
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{anime.description || "لا يوجد وصف متاح"}</p>

                {/* إضافة العد التنازلي للحلقة القادمة إذا كانت متاحة */}
                {anime.nextAiringEpisode && (
                  <div className="bg-anitrack-purple/10 p-4 rounded-lg space-y-3">
                    <div className="text-anitrack-purple font-medium">
                      الحلقة {anime.nextAiringEpisode.episode} قادمة في:
                    </div>
                    <CountdownTimer 
                      targetDate={getNextEpisodeDate(anime.nextAiringEpisode.airingAt)}
                      onComplete={() => toast.success("الحلقة متاحة الآن!", {
                        description: `يمكنك الآن مشاهدة الحلقة ${anime.nextAiringEpisode?.episode}`
                      })}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="episodes">الحلقات</TabsTrigger>
                <TabsTrigger value="characters">الشخصيات</TabsTrigger>
                <TabsTrigger value="related">ذات صلة</TabsTrigger>
              </TabsList>
              
              <TabsContent value="episodes" className="space-y-4">
                {anime.seasons.length > 0 && (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <h3 className="font-medium">المواسم</h3>
                      <div className="flex flex-wrap gap-2">
                        {anime.seasons.map((season) => (
                          <Button
                            key={season.id}
                            variant={selectedSeason === season.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSeason(season.id)}
                          >
                            {season.title}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {currentSeason && (
                      <Card>
                        <CardHeader>
                          <CardTitle>{currentSeason.title}</CardTitle>
                          <CardDescription>
                            {currentSeason.episodes.length} حلقة
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="divide-y">
                            {currentSeason.episodes.map((episode) => (
                              <div key={episode.number} className="flex items-center p-4 hover:bg-muted/50">
                                <div className="w-10 text-center font-medium">{episode.number}</div>
                                <div className="flex-1 mr-2">{episode.title}</div>
                                <div className="hidden sm:block text-sm text-muted-foreground ml-4">{episode.duration} دقيقة</div>
                                <Button variant="ghost" size="icon" className="mr-auto">
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="characters" className="space-y-6">
                {anime.characters.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {anime.characters.map((character) => (
                      <div key={character.id} className="flex border rounded-lg overflow-hidden">
                        <div className="w-16 h-20 relative overflow-hidden shrink-0">
                          <img 
                            src={character.image || "/placeholder.svg"} 
                            alt={character.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 flex-1">
                          <h4 className="font-medium">{character.name}</h4>
                          <p className="text-xs text-muted-foreground">{character.role}</p>
                        </div>
                        {character.voiceActor && (
                          <>
                            <div className="w-16 h-20 relative overflow-hidden shrink-0 border-r">
                              <img 
                                src={character.voiceActor.image || "/placeholder.svg"} 
                                alt={character.voiceActor.name}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 flex-1">
                              <h4 className="font-medium">{character.voiceActor.name}</h4>
                              <p className="text-xs text-muted-foreground">ممثل صوتي</p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-muted-foreground">لا يوجد بيانات للشخصيات</p>
                )}
              </TabsContent>
              
              <TabsContent value="related" className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recommendedAnime.slice(0, 5).map((animeItem) => (
                    <AnimeCard
                      key={animeItem.id}
                      id={animeItem.id}
                      title={animeItem.title}
                      image={animeItem.image}
                      rating={animeItem.rating}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* التوصيات */}
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-4">قد يعجبك أيضاً</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendedAnime.slice(0, 10).map((animeItem) => (
              <AnimeCard
                key={animeItem.id}
                id={animeItem.id}
                title={animeItem.title}
                image={animeItem.image}
                rating={animeItem.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnimeDetail;
