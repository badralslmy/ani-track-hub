
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { searchAnime } from "@/services/aniListApi";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminAddAnime = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      await searchAnime(searchTerm);
      // بعد البحث، قم بتوجيه المستخدم إلى صفحة تكامل AniList
      navigate("/admin?tab=anilist");
      
      // إظهار رسالة توضيحية
      toast({
        title: "تم البحث بنجاح",
        description: "تم توجيهك إلى صفحة تكامل AniList لعرض النتائج واستيراد الأنمي",
      });
    } catch (error) {
      console.error("Error searching anime:", error);
      toast({
        title: "خطأ في البحث",
        description: "تعذر البحث عن الأنمي. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">إضافة أنمي جديد</h2>
        <p className="text-muted-foreground">
          أضف أنمي جديد إلى قاعدة البيانات أو استورد من AniList API.
        </p>
      </div>

      <Tabs defaultValue="anilist" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="anilist">استيراد من AniList</TabsTrigger>
          <TabsTrigger value="manual">إدخال يدوي</TabsTrigger>
        </TabsList>

        <TabsContent value="anilist">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <h3 className="text-lg font-semibold">استيراد من AniList API</h3>
                <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                  <Input 
                    type="text" 
                    placeholder="ابحث باسم الأنمي..." 
                    className="w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" disabled={isSearching}>
                    {isSearching ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    بحث
                  </Button>
                </form>
              </div>
              <div className="text-center py-10 text-muted-foreground">
                ابحث عن أنمي لاستيراده من AniList API
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-6">إدخال يدوي</h3>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Anime title" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alternative-title">Alternative Title</Label>
                    <Input id="alternative-title" placeholder="Alternative title (optional)" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Anime description" className="min-h-[120px]" />
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="airing">Currently Airing</SelectItem>
                        <SelectItem value="finished">Finished Airing</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tv">TV</SelectItem>
                        <SelectItem value="movie">Movie</SelectItem>
                        <SelectItem value="ova">OVA</SelectItem>
                        <SelectItem value="special">Special</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="episodes">Episodes</Label>
                    <Input id="episodes" type="number" placeholder="Number of episodes" />
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="season">Season</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="winter">Winter</SelectItem>
                        <SelectItem value="spring">Spring</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                        <SelectItem value="fall">Fall</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" placeholder="Year of release" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="genres">Genres</Label>
                  <Input id="genres" placeholder="Separate genres with commas" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cover">Cover Image URL</Label>
                  <Input id="cover" placeholder="URL to cover image" />
                </div>
                
                <Button type="submit" className="w-full md:w-auto">إضافة الأنمي</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAddAnime;
