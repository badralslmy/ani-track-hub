
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimeCard from "@/components/anime/AnimeCard";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";
import { continueWatchingAnime, trendingAnime, seasonalAnime } from "@/data/mock";

const MyList = () => {
  // Mock data for statistics
  const statusData = [
    { name: "Watching", value: 12, color: "#8B5CF6" },
    { name: "Completed", value: 45, color: "#22C55E" },
    { name: "Want to Watch", value: 25, color: "#3B82F6" },
    { name: "Watch Later", value: 18, color: "#F59E0B" },
    { name: "Not Interested", value: 5, color: "#EF4444" },
  ];
  
  const genreData = [
    { name: "Action", count: 30 },
    { name: "Romance", count: 22 },
    { name: "Comedy", count: 18 },
    { name: "Fantasy", count: 15 },
    { name: "Drama", count: 12 },
    { name: "Sci-Fi", count: 8 },
  ];

  return (
    <AppLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">My Anime List</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="font-medium mb-4">Your Anime Status</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={(entry) => entry.name}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} Anime`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="font-medium mb-4">Favorite Genres</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={genreData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} Anime`, 'Count']} />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Anime List Tabs */}
        <Tabs defaultValue="watching" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="watching">Watching Now</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="want">Want to Watch</TabsTrigger>
            <TabsTrigger value="later">Watch Later</TabsTrigger>
            <TabsTrigger value="not">Not Interested</TabsTrigger>
          </TabsList>
          
          <TabsContent value="watching" className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {continueWatchingAnime.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  episodesWatched={anime.episodesWatched}
                  totalEpisodes={anime.totalEpisodes}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {trendingAnime.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  rating={anime.rating}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="want" className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {seasonalAnime.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  rating={anime.rating}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="later" className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {seasonalAnime.slice(2, 5).map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  rating={anime.rating}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="not" className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {trendingAnime.slice(3, 5).map((anime) => (
                <AnimeCard
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  rating={anime.rating}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MyList;
