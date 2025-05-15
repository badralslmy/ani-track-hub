import { useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Plus, Share2, Play } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AnimeCard from "@/components/anime/AnimeCard";
import { recommendedAnime } from "@/data/mock";

// Mock data for current anime
const ANIME = {
  id: "1",
  title: "Attack on Titan: The Final Season",
  alternativeTitle: "進撃の巨人 The Final Season",
  description: `Gabi Braun and Falco Grice have been training their entire lives to inherit one of the seven Titans under Marley's control and aid their nation in eradicating the Eldians on Paradis. However, just as all seems well, their peace is interrupted by the return of the Attack Titan and the founding of a new Eldian empire. Now, the Marleyans make desperate attempts to take back what they have lost, as the Eldians struggle with the reality of their new empire.`,
  coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx110277-qDRIhu50PXzz.jpg",
  bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/110277-iuGaGN4KeWLF.jpg",
  status: "Completed",
  episodes: 16,
  duration: 24,
  genres: ["Action", "Drama", "Fantasy", "Mystery"],
  studios: ["MAPPA"],
  season: "Winter",
  seasonYear: 2021,
  averageScore: 87,
  popularity: 239423,
  nextAiringEpisode: null,
  characters: [
    {
      id: "1",
      name: "Eren Yeager",
      image: "https://s4.anilist.co/file/anilistcdn/character/large/b40882-F3gr1PJP3Eo0.png",
      role: "Main",
      voiceActor: {
        name: "Yuki Kaji",
        image: "https://s4.anilist.co/file/anilistcdn/staff/large/n95672-2RfLzncNyvbR.jpg"
      }
    },
    {
      id: "2",
      name: "Mikasa Ackerman",
      image: "https://s4.anilist.co/file/anilistcdn/character/large/b40881-dlqNdbjJ83ZL.jpg",
      role: "Main",
      voiceActor: {
        name: "Yui Ishikawa",
        image: "https://s4.anilist.co/file/anilistcdn/staff/large/n100142-lJt9Gp3rN00N.png"
      }
    },
    {
      id: "3",
      name: "Armin Arlert",
      image: "https://s4.anilist.co/file/anilistcdn/character/large/b46494-g7xYYuBtYPnO.png",
      role: "Main",
      voiceActor: {
        name: "Marina Inoue",
        image: "https://s4.anilist.co/file/anilistcdn/staff/large/n95158-ZZWAa2YPDvim.png"
      }
    },
    {
      id: "4",
      name: "Reiner Braun",
      image: "https://s4.anilist.co/file/anilistcdn/character/large/b46496-MMbxALnGxDdR.jpg",
      role: "Main",
      voiceActor: {
        name: "Yoshimasa Hosoya",
        image: "https://s4.anilist.co/file/anilistcdn/staff/large/n103806-vtuQqPVBcxzp.png"
      }
    },
  ],
  seasons: [
    {
      id: "s1",
      title: "Season 1",
      episodes: [
        { number: 1, title: "To You, 2,000 Years Later", duration: 24 },
        { number: 2, title: "That Day", duration: 24 },
        { number: 3, title: "A Dim Light Amid Despair", duration: 24 },
        // ...more episodes
      ]
    },
    {
      id: "s2",
      title: "Season 2",
      episodes: [
        { number: 1, title: "Beast Titan", duration: 24 },
        { number: 2, title: "I'm Home", duration: 24 },
        { number: 3, title: "Southwestward", duration: 24 },
        // ...more episodes
      ]
    },
    {
      id: "s3p1",
      title: "Season 3 Part 1",
      episodes: [
        { number: 1, title: "Smoke Signal", duration: 24 },
        { number: 2, title: "Pain", duration: 24 },
        { number: 3, title: "Old Story", duration: 24 },
        // ...more episodes
      ]
    },
    {
      id: "s3p2",
      title: "Season 3 Part 2",
      episodes: [
        { number: 1, title: "The Town Where Everything Began", duration: 24 },
        { number: 2, title: "Thunder Spears", duration: 24 },
        { number: 3, title: "Descent", duration: 24 },
        // ...more episodes
      ]
    },
    {
      id: "s4",
      title: "The Final Season",
      episodes: [
        { number: 1, title: "The Other Side of the Sea", duration: 24 },
        { number: 2, title: "Midnight Train", duration: 24 },
        { number: 3, title: "The Door of Hope", duration: 24 },
        // ...more episodes
      ]
    }
  ]
};

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedSeason, setSelectedSeason] = useState(ANIME.seasons[ANIME.seasons.length - 1].id);
  
  // This would fetch the anime data based on the id in a real application
  console.log("Anime ID:", id);
  
  // Find the currently selected season
  const currentSeason = ANIME.seasons.find(season => season.id === selectedSeason) || ANIME.seasons[0];

  return (
    <AppLayout>
      {/* Banner Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img
            src={ANIME.bannerImage}
            alt={ANIME.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      </div>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 -mt-32 md:-mt-40 mb-6 relative z-10">
          {/* Anime Poster */}
          <div className="hidden md:block">
            <div className="rounded-lg overflow-hidden border shadow-lg">
              <img 
                src={ANIME.coverImage} 
                alt={ANIME.title}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>
            
            <div className="mt-4 space-y-3">
              <Button className="w-full bg-anitrack-purple hover:bg-anitrack-purple-dark gap-2">
                <Plus className="w-4 h-4" /> Add to List
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <Star className="w-4 h-4 mr-2" /> Rate
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Studios</h4>
                <p>{ANIME.studios.join(", ")}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Season</h4>
                <p>{ANIME.season} {ANIME.seasonYear}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Episodes</h4>
                <p>{ANIME.episodes} episodes</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Duration</h4>
                <p>{ANIME.duration} minutes</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <p>{ANIME.status}</p>
              </div>
            </div>
          </div>
          
          {/* Anime Details */}
          <div className="space-y-6">
            <div className="md:flex md:items-start md:gap-6">
              <div className="md:hidden mb-4">
                <div className="rounded-lg overflow-hidden border shadow-lg w-[200px] mx-auto">
                  <img 
                    src={ANIME.coverImage} 
                    alt={ANIME.title}
                    className="w-full aspect-[2/3] object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <h1 className="text-2xl md:text-3xl font-bold">{ANIME.title}</h1>
                  {ANIME.alternativeTitle && (
                    <p className="text-muted-foreground">{ANIME.alternativeTitle}</p>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {ANIME.genres.map((genre) => (
                    <span key={genre} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{ANIME.averageScore / 10}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-muted-foreground">{ANIME.popularity.toLocaleString()} members</span>
                </div>
                
                <div className="md:hidden mt-4 space-y-3">
                  <Button className="w-full bg-anitrack-purple hover:bg-anitrack-purple-dark gap-2">
                    <Plus className="w-4 h-4" /> Add to List
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full">
                      <Star className="w-4 h-4 mr-2" /> Rate
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{ANIME.description}</p>
              </div>
            </div>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="characters">Characters</TabsTrigger>
                <TabsTrigger value="related">Related</TabsTrigger>
              </TabsList>
              
              <TabsContent value="episodes" className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <h3 className="font-medium">Seasons</h3>
                  <div className="flex flex-wrap gap-2">
                    {ANIME.seasons.map((season) => (
                      <Button
                        key={season.id}
                        variant={selectedSeason === season.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSeason(season.id)}
                      >
                        {season.title}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{currentSeason.title}</CardTitle>
                    <CardDescription>
                      {currentSeason.episodes.length} episodes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {currentSeason.episodes.map((episode) => (
                        <div key={episode.number} className="flex items-center p-4 hover:bg-muted/50">
                          <div className="w-10 text-center font-medium">{episode.number}</div>
                          <div className="flex-1 ml-2">{episode.title}</div>
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="characters" className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {ANIME.characters.map((character) => (
                    <div key={character.id} className="flex border rounded-lg overflow-hidden">
                      <div className="w-16 h-20 relative overflow-hidden shrink-0">
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <h4 className="font-medium">{character.name}</h4>
                        <p className="text-xs text-muted-foreground">{character.role}</p>
                      </div>
                      <div className="w-16 h-20 relative overflow-hidden shrink-0 border-l">
                        <img 
                          src={character.voiceActor.image} 
                          alt={character.voiceActor.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <h4 className="font-medium">{character.voiceActor.name}</h4>
                        <p className="text-xs text-muted-foreground">Japanese</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="related" className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {recommendedAnime.slice(0, 5).map((anime) => (
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
        </div>
        
        {/* Recommendations */}
        <div className="my-10">
          <h2 className="section-title">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recommendedAnime.slice(0, 10).map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={anime.title}
                image={anime.image}
                rating={anime.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnimeDetail;
