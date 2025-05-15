
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const AdminAddAnime = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Add New Anime</h2>
        <p className="text-muted-foreground">
          Add a new anime to the database or import from external API.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-lg font-semibold">Import from External API</h3>
              <div className="flex gap-2">
                <Input 
                  type="text" 
                  placeholder="Search by title..." 
                  className="w-full md:w-64"
                />
                <Button>Search</Button>
              </div>
            </div>
            <div className="text-center py-10 text-muted-foreground">
              Search for an anime to import from external API
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-6">Enter Manually</h3>
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
              
              <Button type="submit" className="w-full md:w-auto">Add Anime</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAddAnime;
