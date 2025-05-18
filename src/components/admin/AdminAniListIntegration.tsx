
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAnimeById, searchAnime, AniListMedia } from "@/services/aniListApi";
import { toast } from "@/components/ui/use-toast";

const AdminAniListIntegration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeId, setAnimeId] = useState("");
  const [searchResults, setSearchResults] = useState<AniListMedia[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AniListMedia | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    try {
      const results = await searchAnime(searchTerm);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Failed to search for anime. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFetchById = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeId) return;

    setLoading(true);
    try {
      const anime = await fetchAnimeById(Number(animeId));
      setSelectedAnime(anime);
    } catch (error) {
      toast({
        title: "Fetch failed",
        description: "Failed to fetch anime by ID. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = (anime: AniListMedia) => {
    // In a real app, you would save this to your database
    toast({
      title: "Anime added",
      description: `${anime.title.english || anime.title.romaji} has been added to your library.`,
    });
    
    // Set as selected to show details
    setSelectedAnime(anime);
  };

  const handleAddToBanner = (anime: AniListMedia) => {
    // In a real app, you would save this to your database
    toast({
      title: "Added to banner",
      description: `${anime.title.english || anime.title.romaji} has been added to the banner.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AniList Integration</h2>
        <p className="text-muted-foreground">
          Search and import anime from AniList API.
        </p>
      </div>

      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search">Search Anime</TabsTrigger>
          <TabsTrigger value="id">Fetch by ID</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Search Anime</CardTitle>
              <CardDescription>
                Search for anime on AniList by title
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search anime..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </form>

              {searchResults.length > 0 && (
                <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((anime) => (
                    <Card key={anime.id} className="overflow-hidden">
                      <div className="aspect-[3/4] relative">
                        <img
                          src={anime.coverImage.large}
                          alt={anime.title.english || anime.title.romaji}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium line-clamp-1">
                          {anime.title.english || anime.title.romaji}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground gap-1 mt-1">
                          <span>{anime.episodes || '?'} episodes</span>
                          <span>•</span>
                          <span>{anime.season} {anime.seasonYear}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 pt-0 flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleAddToLibrary(anime)}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add to Library
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleAddToBanner(anime)}
                        >
                          Add to Banner
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="id">
          <Card>
            <CardHeader>
              <CardTitle>Fetch by ID</CardTitle>
              <CardDescription>
                Get anime by AniList ID
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFetchById} className="flex gap-2">
                <Input
                  type="number"
                  placeholder="AniList ID (e.g. 21)"
                  value={animeId}
                  onChange={(e) => setAnimeId(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Fetch"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedAnime && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Selected Anime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="md:flex gap-6">
              <div className="md:w-1/4">
                <img
                  src={selectedAnime.coverImage.large}
                  alt={selectedAnime.title.english || selectedAnime.title.romaji}
                  className="w-full rounded-md"
                />
              </div>
              <div className="md:w-3/4 space-y-4 mt-4 md:mt-0">
                <h2 className="text-xl font-bold">
                  {selectedAnime.title.english || selectedAnime.title.romaji}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {selectedAnime.genres.map((genre) => (
                    <span 
                      key={genre} 
                      className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded-md text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-muted-foreground">Status:</span>{" "}
                      <span>{selectedAnime.status}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Episodes:</span>{" "}
                      <span>{selectedAnime.episodes || "?"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Score:</span>{" "}
                      <span>{selectedAnime.meanScore / 10}/10</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Popularity:</span>{" "}
                      <span>{selectedAnime.popularity}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Description</h3>
                  <p 
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: selectedAnime.description }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={() => handleAddToBanner(selectedAnime)}>
              Add to Banner
            </Button>
            <Button variant="outline" onClick={() => setSelectedAnime(null)}>
              Clear
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AdminAniListIntegration;
