
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Play, Star, Loader2 } from "lucide-react";
import { fetchAnimeByCategory } from "@/services/supabaseService";
import { heroItems } from "@/data/mock"; // استخدام البيانات الوهمية كاحتياطي

export interface BannerItem {
  id: string;
  title: string;
  description: string | null;
  backgroundImage: string | null;
  type: "countdown" | "recommendation" | "rating" | "seasonal" | "trending";
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
  const bannerItems: BannerItem[] = bannerAnime?.map((anime, index) => ({
    id: anime.id,
    title: anime.title,
    description: anime.description,
    backgroundImage: anime.banner_image || anime.cover_image,
    // تحديد نوع العرض بناءً على الموقع في القائمة
    type: (["trending", "recommendation", "countdown", "seasonal", "rating"] as const)[index % 5]
  })) || [];
  
  // استخدام البيانات الوهمية إذا لم تكن هناك بيانات في قاعدة البيانات
  const displayItems = bannerItems.length > 0 ? bannerItems : heroItems;

  useEffect(() => {
    // تغيير البانر كل 8 ثوان
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % displayItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [displayItems.length]);

  // عدم عرض البانر أثناء التحميل
  if (isLoading) {
    return (
      <div className="h-[300px] flex justify-center items-center bg-slate-100 dark:bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const activeItem = displayItems[activeIndex];

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

          {activeItem.type === "countdown" && (
            <div className="mt-8 flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">01</div>
                <div className="text-xs text-white/80">أيام</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-white/80">ساعات</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">35</div>
                <div className="text-xs text-white/80">دقائق</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">42</div>
                <div className="text-xs text-white/80">ثواني</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* نقاط التنقل في البانر */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {displayItems.map((_, index) => (
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
    </section>
  );
}
