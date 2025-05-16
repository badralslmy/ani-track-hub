
import { Link } from "react-router-dom";
import AnimeCard from "@/components/anime/AnimeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface AnimeSectionProps {
  title: string;
  viewAllLink: string;
  animeList: Array<{
    id: string;
    title: string;
    image: string;
    rating?: number;
    episodesWatched?: number;
    totalEpisodes?: number;
  }>;
}

export default function AnimeSection({ title, viewAllLink, animeList }: AnimeSectionProps) {
  return (
    <section className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          to={viewAllLink}
          className="text-sm text-anitrack-purple hover:text-anitrack-purple-light"
        >
          View All
        </Link>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {animeList.map((anime) => (
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
    </section>
  );
}
