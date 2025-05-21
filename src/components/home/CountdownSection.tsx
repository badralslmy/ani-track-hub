
import { useState } from "react";
import { Card } from "@/components/ui/card";
import CountdownTimer from "@/components/anime/CountdownTimer";
import { CalendarClock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeByCategory } from "@/services/supabaseService";

interface CountdownItem {
  id: string;
  title: string;
  releaseDate: Date;
  image: string;
}

export default function CountdownSection() {
  // استخدام React Query لجلب بيانات الأنمي التي لها حلقات قادمة
  const { data: animeList, isLoading, error } = useQuery({
    queryKey: ['animeWithUpcomingEpisodes'],
    queryFn: async () => {
      try {
        // محاولة جلب أنمي من فئة مخصصة للحلقات القادمة إذا كانت موجودة
        // أو يمكن استخدام جميع الأنمي وتصفيتها حسب وجود تاريخ للحلقة القادمة
        const allAnime = await fetchAnimeByCategory('upcoming_episodes');
        return allAnime.filter(anime => anime.next_episode_date != null);
      } catch (error) {
        console.error("Error fetching upcoming episodes:", error);
        return [];
      }
    },
    refetchOnWindowFocus: false
  });

  // تحويل البيانات إلى تنسيق العد التنازلي
  const upcomingEpisodes: CountdownItem[] = animeList?.map(anime => ({
    id: anime.id,
    title: anime.title,
    releaseDate: anime.next_episode_date ? new Date(anime.next_episode_date) : new Date(),
    image: anime.cover_image || "/placeholder.svg"
  })) || [];
  
  // إذا لم تكن هناك حلقات قادمة، نظهر رسالة بدلاً من العد التنازلي
  if (upcomingEpisodes.length === 0) {
    return (
      <div className="container my-8">
        <div className="flex items-center gap-2 mb-4">
          <CalendarClock className="h-5 w-5 text-anitrack-purple" />
          <h2 className="text-xl font-bold">العد التنازلي للحلقات القادمة</h2>
        </div>
        
        <Card className="bg-gradient-to-r from-anitrack-purple/10 to-anitrack-purple/5 border-anitrack-purple/20 p-6 rounded-xl text-center">
          <p className="text-muted-foreground mb-2">لا توجد حلقات قادمة حالياً</p>
          <p className="text-sm">سيظهر هنا موعد الحلقات القادمة للأنمي الذي تتابعه</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container my-8">
      <div className="flex items-center gap-2 mb-4">
        <CalendarClock className="h-5 w-5 text-anitrack-purple" />
        <h2 className="text-xl font-bold">العد التنازلي للحلقات القادمة</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEpisodes.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden rounded-xl flex flex-col bg-gradient-to-r from-anitrack-purple/10 to-anitrack-purple/5 border-anitrack-purple/20"
          >
            <div className="relative h-32">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex items-end p-3">
                <h3 className="text-white font-bold">{item.title}</h3>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center items-center">
              <p className="text-center mb-2 text-sm">موعد الحلقة القادمة</p>
              <CountdownTimer 
                targetDate={item.releaseDate} 
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
