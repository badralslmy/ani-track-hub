
import { Button } from "@/components/ui/button";
import AnimeCard from "../anime/AnimeCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {animeList.map((anime) => (
          <AnimeCard
            key={anime.id}
            id={anime.id}
            title={anime.title}
            image={anime.image}
            rating={anime.rating}
            episodesWatched={anime.episodesWatched}
            totalEpisodes={anime.totalEpisodes}
          />
        ))}
      </div>
    </section>
  );
}
