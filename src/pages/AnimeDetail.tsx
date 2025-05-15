
import { useParams } from "react-router-dom";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BookmarkPlus, 
  Star, 
  Clock, 
  Play,
  CheckCircle,
  ThumbsUp
} from "lucide-react";
import { 
  trendingAnime, 
  seasonalAnime, 
  recommendedAnime, 
  continueWatchingAnime 
} from "@/data/mock";

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("episodes");
  
  // Find anime data from our mock data
  const allAnime = [
    ...trendingAnime, 
    ...seasonalAnime, 
    ...recommendedAnime, 
    ...continueWatchingAnime
  ];
  
  // Find the anime with the matching id
  const animeData = allAnime.find(anime => anime.id === id) || allAnime[0];
  
  // Mock data for episodes
  const episodes = [
    { season: 1, episodes: Array.from({ length: 12 }, (_, i) => ({ 
      number: i + 1, 
      title: `Episode ${i + 1}`, 
      watched: true,
      duration: "23:45"
    }))},
    { season: 2, episodes: Array.from({ length: 10 }, (_, i) => ({ 
      number: i + 1, 
      title: `Episode ${i + 1}`, 
      watched: i < 6,
      duration: "23:45" 
    }))},
  ];
  
  // Mock data for characters
  const characters = [
    {
      id: "c1",
      name: "Main Character",
      image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      role: "Protagonist",
      voiceActor: "Yuki Kaji",
      voiceActorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "c2",
      name: "Supporting Character",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      role: "Support",
      voiceActor: "Kana Hanazawa",
      voiceActorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "c3",
      name: "Rival Character",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      role: "Rival",
      voiceActor: "Mamoru Miyano",
      voiceActorImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "c4",
      name: "Comic Relief",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      role: "Comic Relief",
      voiceActor: "Yoshitsugu Matsuoka",
      voiceActorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
  ];

  return (
    <AppLayout>
      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img
            src={animeData.image}
            alt={animeData.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
      </div>
      
      <div className="container">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3 lg:col-span-2">
            <div className="relative -mt-32 mb-6">
              <img
                src={animeData.image}
                alt={animeData.title}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-xl border-4 border-background"
              />
            </div>
            
            <div className="space-y-3">
              <Button className="w-full bg-anitrack-purple hover:bg-anitrack-purple-dark gap-2">
                <Play className="h-4 w-4 fill-white" />
                Watch Now
              </Button>
              
              <Button variant="outline" className="w-full gap-2">
                <BookmarkPlus className="h-4 w-4" />
                Add to List
              </Button>
              
              <div className="flex gap-2 py-3">
                <Button variant="outline" size="icon" className="flex-1">
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <Clock className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-6 space-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <span className="ml-2">TV</span>
              </div>
              <div>
                <span className="text-muted-foreground">Episodes:</span>
                <span className="ml-2">24</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="ml-2">Finished Airing</span>
              </div>
              <div>
                <span className="text-muted-foreground">Aired:</span>
                <span className="ml-2">Apr 3, 2024 to Sep 18, 2024</span>
              </div>
              <div>
                <span className="text-muted-foreground">Studios:</span>
                <span className="ml-2">MAPPA</span>
              </div>
              <div>
                <span className="text-muted-foreground">Source:</span>
                <span className="ml-2">Manga</span>
              </div>
              <div>
                <span className="text-muted-foreground">Genres:</span>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-secondary text-xs rounded-full">Action</span>
                  <span className="px-2 py-1 bg-secondary text-xs rounded-full">Adventure</span>
                  <span className="px-2 py-1 bg-secondary text-xs rounded-full">Fantasy</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-9 lg:col-span-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{animeData.title}</h1>
            
            <div className="flex items-center gap-3 mb-6 text-sm">
              <div className="flex items-center text-yellow-500">
                <Star className="h-4 w-4 fill-yellow-500" />
                <span className="ml-1 font-medium">{animeData.rating?.toFixed(1) || "9.1"}</span>
              </div>
              <span className="text-muted-foreground">2024</span>
              <span className="text-muted-foreground">TV</span>
              <span className="text-muted-foreground">HD</span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Synopsis</h3>
              <p className="text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam euismod, nisi vel consectetur
                interdum, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi. Nam euismod, 
                nisi vel consectetur interdum, nisl nisi consectetur nisi, eget consectetur nisi nisi vel nisi.
                Nam euismod, nisi vel consectetur interdum, nisl nisi consectetur nisi, eget consectetur nisi
                nisi vel nisi.
              </p>
            </div>
            
            <Tabs defaultValue="episodes" value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <TabsList className="mb-6">
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="characters">Characters</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="episodes" className="pt-2">
                <div className="space-y-6">
                  {episodes.map((season, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium mb-4">Season {season.season}</h3>
                      <div className="grid gap-3">
                        {season.episodes.map((episode) => (
                          <div 
                            key={episode.number} 
                            className="flex items-center bg-card p-3 rounded-lg hover:bg-accent/50 cursor-pointer"
                          >
                            <div className="mr-4 text-muted-foreground">
                              {episode.watched ? (
                                <CheckCircle className="h-5 w-5 text-anitrack-purple" />
                              ) : (
                                <span className="font-medium">{episode.number}</span>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <p className={`font-medium ${episode.watched ? "text-muted-foreground" : ""}`}>
                                Episode {episode.number}
                              </p>
                            </div>
                            
                            <div className="text-muted-foreground text-sm">
                              {episode.duration}
                            </div>
                            
                            <Button variant="ghost" size="icon" className="ml-2">
                              <Play className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="characters" className="pt-2">
                <div className="grid sm:grid-cols-2 gap-6">
                  {characters.map((character) => (
                    <div key={character.id} className="flex bg-card rounded-lg overflow-hidden">
                      <div className="w-1/3">
                        <img 
                          src={character.image} 
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-4 flex-1">
                        <h4 className="font-medium">{character.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{character.role}</p>
                        
                        <div className="flex items-center">
                          <img 
                            src={character.voiceActorImage} 
                            alt={character.voiceActor}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-3">
                            <p className="text-sm">{character.voiceActor}</p>
                            <p className="text-xs text-muted-foreground">Voice Actor</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="staff" className="pt-2">
                <div className="text-center py-8 text-muted-foreground">
                  Staff information will be available soon.
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-2">
                <div className="text-center py-8 text-muted-foreground">
                  No reviews available yet.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <h2 className="section-title mb-6">Similar Anime</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recommendedAnime.slice(0, 6).map((anime) => (
            <div key={anime.id} className="anime-card">
              <img
                src={anime.image}
                alt={anime.title}
                className="anime-card-image"
              />
              <div className="anime-card-content">
                <div className="flex items-center mb-1 text-yellow-400">
                  <Star size={14} className="fill-yellow-400" />
                  <span className="text-xs ml-1">{anime.rating?.toFixed(1)}</span>
                </div>
                <h3 className="font-medium text-sm line-clamp-2">{anime.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AnimeDetail;
