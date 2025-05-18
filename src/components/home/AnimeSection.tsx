
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AnimeCard from "@/components/anime/AnimeCard";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { fetchAnimeByCategory, AnimeRecord } from "@/services/supabaseService";

interface AnimeSectionProps {
  title: string;
  viewAllLink: string;
  categoryName: string;
  fallbackAnimeList?: Array<{
    id: string;
    title: string;
    image: string;
    rating?: number;
    episodesWatched?: number;
    totalEpisodes?: number;
  }>;
}

export default function AnimeSection({ 
  title, 
  viewAllLink, 
  categoryName,
  fallbackAnimeList = [] 
}: AnimeSectionProps) {
  // استخدام React Query لجلب بيانات الأنمي حسب الفئة
  const { data: animeList, isLoading } = useQuery({
    queryKey: ['animeCategory', categoryName],
    queryFn: async () => {
      try {
        return await fetchAnimeByCategory(categoryName);
      } catch (error) {
        console.error(`Error fetching ${categoryName} anime:`, error);
        return [];
      }
    },
    refetchOnWindowFocus: false
  });

  // تحويل البيانات من قاعدة البيانات إلى الشكل المطلوب للعرض
  const displayAnime = animeList?.map(anime => ({
    id: anime.id,
    title: anime.title,
    image: anime.cover_image || "/placeholder.svg",
    rating: anime.mean_score,
    totalEpisodes: anime.episodes || undefined
  })) || [];

  // استخدام البيانات الوهمية إذا لم تكن هناك بيانات في قاعدة البيانات
  const animeToDisplay = displayAnime.length > 0 ? displayAnime : fallbackAnimeList;

  return (
    <section className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          to={viewAllLink}
          className="text-sm text-anitrack-purple hover:text-anitrack-purple-light"
        >
          عرض الكل
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {animeToDisplay.map((anime) => (
              <CarouselItem key={anime.id} className="md:basis-1/5 lg:basis-1/5">
                <AnimeCard
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  rating={anime.rating}
                  episodesWatched={anime.episodesWatched}
                  totalEpisodes={anime.totalEpisodes}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </section>
  );
}
