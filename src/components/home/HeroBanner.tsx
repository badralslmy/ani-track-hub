
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play, Star, Loader2 } from "lucide-react";
import { fetchAnimeByCategory } from "@/services/supabaseService";
import CountdownTimer from "@/components/anime/CountdownTimer";

export interface BannerItem {
  id: string;
  title: string;
  description: string | null;
  backgroundImage: string | null;
  type: "countdown" | "recommendation" | "rating" | "seasonal" | "trending";
  nextEpisodeDate?: Date | null;
}

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  // استخدام React Query لجلب بيانات البانر
  const { data: bannerAnime, isLoading, error } = useQuery({
    queryKey: ['heroAnime'],
    queryFn: async () => {
      try {
        return await fetchAnimeByCategory('hero_banner');
      } catch (error) {
        console.error("Error fetching hero banner anime:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false
  });

  // تحويل بيانات الأنمي إلى تنسيق البانر
  const bannerItems: BannerItem[] = bannerAnime?.map((anime, index) => {
    // إنشاء تاريخ للحلقة القادمة (استخدام تاريخ الحلقة إذا كان متوفراً أو تاريخ تقريبي)
    const nextEpisodeDate = anime.next_episode_date 
      ? new Date(anime.next_episode_date) 
      : new Date(Date.now() + (((index % 7) + 1) * 24 * 60 * 60 * 1000)); // بين 1-7 أيام
    
    return {
      id: anime.id,
      title: anime.title,
      description: anime.description,
      backgroundImage: anime.banner_image || anime.cover_image,
      // تحديد نوع العرض بشكل عشوائي
      type: (["trending", "recommendation", "countdown", "seasonal", "rating"] as const)[index % 5],
      nextEpisodeDate: nextEpisodeDate
    };
  }) || [];

  useEffect(() => {
    // تغيير البانر كل 8 ثوان إذا كان هناك أكثر من عنصر
    if (bannerItems.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [bannerItems.length]);

  // عدم عرض البانر أثناء التحميل
  if (isLoading) {
    return (
      <div className="h-[300px] flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // إذا لم تكن هناك أي بيانات للعرض أو حدث خطأ
  if (bannerItems.length === 0 || error) {
    return (
      <div className="h-[300px] flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <p className="text-muted-foreground">لا توجد أعمال متاحة للعرض في البانر</p>
      </div>
    );
  }

  const activeItem = bannerItems[activeIndex];

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img
          src={activeItem.backgroundImage || "/placeholder.svg"}
          alt={activeItem.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="container relative h-full flex flex-col justify-center pt-16">
        <div className="max-w-lg">
          {activeItem.type === "countdown" && (
            <div className="inline-flex items-center gap-2 mb-4 bg-anitrack-purple/20 text-anitrack-purple px-3 py-1 rounded-full text-sm">
              <span className="animate-pulse-light">●</span> حلقة جديدة قريبًا
            </div>
          )}
          {activeItem.type === "recommendation" && (
            <div className="inline-flex items-center gap-2 mb-4 bg-anitrack-purple/20 text-anitrack-purple px-3 py-1 rounded-full text-sm">
              <span>✦</span> مُوصى به لك
            </div>
          )}
          {activeItem.type === "rating" && (
            <div className="inline-flex items-center gap-2 mb-4 bg-anitrack-purple/20 text-anitrack-purple px-3 py-1 rounded-full text-sm">
              <Star className="h-4 w-4" /> تقييم عالي
            </div>
          )}
          {activeItem.type === "seasonal" && (
            <div className="inline-flex items-center gap-2 mb-4 bg-anitrack-purple/20 text-anitrack-purple px-3 py-1 rounded-full text-sm">
              <span>✦</span> مفضل الموسم
            </div>
          )}
          {activeItem.type === "trending" && (
            <div className="inline-flex items-center gap-2 mb-4 bg-anitrack-purple/20 text-anitrack-purple px-3 py-1 rounded-full text-sm">
              <span>🔥</span> رائج الآن
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {activeItem.title}
          </h1>
          
          <p className="text-white/80 mb-6 max-w-md line-clamp-3">
            {activeItem.description || "لا يوجد وصف متاح."}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-anitrack-purple hover:bg-anitrack-purple-dark text-white gap-2"
            >
              <Play className="h-4 w-4 fill-white" />
              {activeItem.type === "countdown" ? "مشاهدة الحلقة السابقة" : "بدء المشاهدة"}
            </Button>
            <Button variant="secondary">إضافة إلى قائمتي</Button>
          </div>

          {activeItem.type === "countdown" && activeItem.nextEpisodeDate && (
            <div className="mt-8">
              <CountdownTimer targetDate={activeItem.nextEpisodeDate} />
            </div>
          )}
        </div>
      </div>

      {/* نقاط التنقل في البانر */}
      {bannerItems.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {bannerItems.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === index 
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
