
import AppLayout from "@/components/layout/AppLayout";
import HeroBanner from "@/components/home/HeroBanner";
import AnimeSection from "@/components/home/AnimeSection";
import { 
  trendingAnime,
  continueWatchingAnime,
  seasonalAnime,
  newReleaseAnime,
  recommendedAnime 
} from "@/data/mock"; // استخدام البيانات الوهمية كاحتياطي

const Index = () => {
  // تحديد أقسام الأنمي التي سيتم عرضها
  const sections = [
    { 
      title: "متابعة المشاهدة", 
      viewAllLink: "/mylist", 
      categoryName: "continue_watching",
      fallbackAnimeList: continueWatchingAnime
    },
    { 
      title: "الأكثر مشاهدة", 
      viewAllLink: "/browse?sort=trending", 
      categoryName: "trending",
      fallbackAnimeList: trendingAnime
    },
    { 
      title: "أحدث الإصدارات", 
      viewAllLink: "/browse?sort=newest", 
      categoryName: "new_releases",
      fallbackAnimeList: newReleaseAnime
    },
    { 
      title: "أنمي الموسم", 
      viewAllLink: "/browse?season=current", 
      categoryName: "season_anime",
      fallbackAnimeList: seasonalAnime
    },
    { 
      title: "مُوصى به لك", 
      viewAllLink: "/browse?recommended=true", 
      categoryName: "recommended",
      fallbackAnimeList: recommendedAnime
    }
  ];

  return (
    <AppLayout>
      <HeroBanner />
      
      {sections.map((section, index) => (
        <AnimeSection
          key={index}
          title={section.title}
          viewAllLink={section.viewAllLink}
          categoryName={section.categoryName}
          fallbackAnimeList={section.fallbackAnimeList}
        />
      ))}
    </AppLayout>
  );
};

export default Index;
