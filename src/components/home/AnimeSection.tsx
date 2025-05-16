
import { Button } from "@/components/ui/button";
import AnimeCard from "../anime/AnimeCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

interface AnimeSectionProps {
  title: string;
  viewAllLink?: string;
  animeList: Array<{
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
  animeList,
}: AnimeSectionProps) {
  return (
    <section className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink}>
            <Button variant="ghost" className="text-sm gap-1 hover:text-anitrack-purple">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      <div className="relative">
        <Carousel opts={{ align: "start" }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {animeList.map((anime) => (
              <CarouselItem key={anime.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5 xl:basis-1/6">
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
          <CarouselPrevious className="left-1 lg:-left-4 bg-black/50 hover:bg-black/80 border-none text-white" />
          <CarouselNext className="right-1 lg:-right-4 bg-black/50 hover:bg-black/80 border-none text-white" />
        </Carousel>
      </div>
    </section>
  );
}
