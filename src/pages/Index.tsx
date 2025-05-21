
import AppLayout from "@/components/layout/AppLayout";
import HeroBanner from "@/components/home/HeroBanner";
import AnimeSection from "@/components/home/AnimeSection";
import CountdownSection from "@/components/home/CountdownSection";

const Index = () => {
  // تحديد أقسام الأنمي التي سيتم عرضها
  const sections = [
    { 
      title: "متابعة المشاهدة", 
      viewAllLink: "/mylist", 
      categoryName: "continue_watching",
      fallbackAnimeList: []
    },
    { 
      title: "الأكثر مشاهدة", 
      viewAllLink: "/browse?sort=trending", 
      categoryName: "trending",
      fallbackAnimeList: []
    },
    { 
      title: "أحدث الإصدارات", 
      viewAllLink: "/browse?sort=newest", 
      categoryName: "new_releases",
      fallbackAnimeList: []
    },
    { 
      title: "أنمي الموسم", 
      viewAllLink: "/browse?season=current", 
      categoryName: "season_anime",
      fallbackAnimeList: []
    },
    { 
      title: "مُوصى به لك", 
      viewAllLink: "/browse?recommended=true", 
      categoryName: "recommended",
      fallbackAnimeList: []
    }
  ];

  return (
    <AppLayout>
      <HeroBanner />
      
      <CountdownSection />
      
      {sections.map((section, index) => (
        <AnimeSection
          key={index}
          title={section.title}
          viewAllLink={section.viewAllLink}
          categoryName={section.categoryName}
          fallbackAnimeList={[]}
        />
      ))}
    </AppLayout>
  );
};

export default Index;
