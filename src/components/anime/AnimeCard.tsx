
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { StarIcon } from "lucide-react";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  rating?: number;
  episodesWatched?: number;
  totalEpisodes?: number;
}

export default function AnimeCard({
  id,
  title,
  image,
  rating,
  episodesWatched,
  totalEpisodes,
}: AnimeCardProps) {
  return (
    <Link to={`/anime/${id}`} className="anime-card">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="anime-card-image"
          loading="lazy"
        />
        {(episodesWatched !== undefined && totalEpisodes !== undefined) && (
          <div className="absolute bottom-14 left-2 right-2">
            <Progress 
              value={(episodesWatched / totalEpisodes) * 100} 
              className="h-1 bg-white/30"
            />
            <p className="text-xs text-white/90 mt-1 text-right">
              {episodesWatched}/{totalEpisodes}
            </p>
          </div>
        )}
        <div className="anime-card-content">
          {rating !== undefined && (
            <div className="flex items-center mb-1 text-yellow-400">
              <StarIcon size={14} className="fill-yellow-400" />
              <span className="text-xs ml-1">{rating.toFixed(1)}</span>
            </div>
          )}
          <h3 className="font-medium text-sm line-clamp-2">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
