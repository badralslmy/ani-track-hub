
import AppLayout from "@/components/layout/AppLayout";
import HeroBanner from "@/components/home/HeroBanner";
import AnimeSection from "@/components/home/AnimeSection";
import { 
  trendingAnime,
  continueWatchingAnime,
  seasonalAnime,
  newReleaseAnime,
  recommendedAnime 
} from "@/data/mock";

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

  return (
    <AppLayout>
      <HeroBanner />
      
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
