
import AppLayout from "@/components/layout/AppLayout";
import HeroBanner from "@/components/home/HeroBanner";
import AnimeSection from "@/components/home/AnimeSection";
import AnimeCard from "@/components/anime/AnimeCard";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { 
  trendingAnime,
  continueWatchingAnime,
  seasonalAnime,
  newReleaseAnime,
  recommendedAnime 
} from "@/data/mock";
import { Link } from "react-router-dom";

const Index = () => {
  // Function to shuffle sections (except hero banner)
  const getSections = () => {
    const sections = [
      { 
        title: "Continue Watching", 
        viewAllLink: "/mylist", 
        animeList: continueWatchingAnime 
      },
      { 
        title: "Top Trending", 
        viewAllLink: "/browse?sort=trending", 
        animeList: trendingAnime 
      },
      { 
        title: "New Releases", 
        viewAllLink: "/browse?sort=newest", 
        animeList: newReleaseAnime 
      },
      { 
        title: "Spring 2025 Season", 
        viewAllLink: "/browse?season=spring-2025", 
        animeList: seasonalAnime 
      },
      { 
        title: "Recommended For You", 
        viewAllLink: "/browse?recommended=true", 
        animeList: recommendedAnime 
      },
    ];
    
    // Shuffle the sections array
    for (let i = sections.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sections[i], sections[j]] = [sections[j], sections[i]];
    }
    
    return sections;
  };
  
  const sections = getSections();

  const top10Anime = trendingAnime
    .slice()
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0,10);

  return (
    <AppLayout>
      <HeroBanner />
      
      <section className="container py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Top 10 Anime</h2>
          <Link 
            to="/browse?sort=top" 
            className="text-sm text-anitrack-purple hover:text-anitrack-purple-light"
          >
            View All
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {top10Anime.map(anime => (
              <CarouselItem key={anime.id} className="md:basis-1/5 lg:basis-1/5">
                <AnimeCard 
                  id={anime.id} 
                  title={anime.title} 
                  image={anime.image} 
                  rating={anime.rating} 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {sections.map((section, index) => (
        <AnimeSection
          key={index}
          title={section.title}
          viewAllLink={section.viewAllLink}
          animeList={section.animeList}
        />
      ))}
    </AppLayout>
  );
};

export default Index;
