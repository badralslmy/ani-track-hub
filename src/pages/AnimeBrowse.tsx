
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import AnimeCard from "@/components/anime/AnimeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";
import { 
  trendingAnime, 
  newReleaseAnime, 
  seasonalAnime, 
  recommendedAnime 
} from "@/data/mock";

const AnimeBrowse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Combine all anime lists for browse page
  const allAnime = [
    ...trendingAnime,
    ...newReleaseAnime, 
    ...seasonalAnime,
    ...recommendedAnime
  ];
  
  // Remove duplicates by id
  const uniqueAnime = allAnime.filter(
    (anime, index, self) => index === self.findIndex((a) => a.id === anime.id)
  );

  // Filter anime based on search query
  const filteredAnime = searchQuery 
    ? uniqueAnime.filter(anime => 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : uniqueAnime;

  return (
    <AppLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Browse Anime</h1>
        
        {/* Search and filter section */}
        <div className="mb-8 grid gap-4 md:grid-cols-12">
          <div className="relative md:col-span-5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by title, genre, studio..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-2">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="action">Action</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="older">2019 & older</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="fall">Fall</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="md:col-span-1 flex gap-2">
            <FilterX className="h-4 w-4" />
            Reset
          </Button>
        </div>
        
        {/* Results section */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            {filteredAnime.length} results found
          </p>
        </div>
        
        {/* Anime grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredAnime.map((anime) => (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={anime.title}
              image={anime.image}
              rating={anime.rating}
            />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" disabled>
              &lt;
            </Button>
            <Button size="sm" className="bg-anitrack-purple hover:bg-anitrack-purple-dark">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">4</Button>
            <Button variant="outline" size="sm">5</Button>
            <Button variant="outline" size="icon">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnimeBrowse;
