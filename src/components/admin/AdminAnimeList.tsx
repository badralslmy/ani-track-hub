
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const AdminAnimeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock anime data
  const animes = [
    { id: 1, title: "Attack on Titan", genres: "Action, Drama, Fantasy", episodes: 75, status: "Completed" },
    { id: 2, title: "Demon Slayer", genres: "Action, Fantasy", episodes: 44, status: "Ongoing" },
    { id: 3, title: "My Hero Academia", genres: "Action, Comedy", episodes: 113, status: "Ongoing" },
    { id: 4, title: "Jujutsu Kaisen", genres: "Action, Fantasy", episodes: 24, status: "Ongoing" },
    { id: 5, title: "One Piece", genres: "Action, Adventure, Comedy", episodes: 1000, status: "Ongoing" },
    { id: 6, title: "Naruto", genres: "Action, Adventure", episodes: 720, status: "Completed" },
    { id: 7, title: "Death Note", genres: "Mystery, Psychological", episodes: 37, status: "Completed" },
  ];
  
  const filteredAnimes = animes.filter(anime => 
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Anime Database</h2>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anime..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Genres</TableHead>
              <TableHead className="hidden md:table-cell">Episodes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnimes.map((anime) => (
              <TableRow key={anime.id}>
                <TableCell className="font-medium">{anime.title}</TableCell>
                <TableCell className="hidden md:table-cell">{anime.genres}</TableCell>
                <TableCell className="hidden md:table-cell">{anime.episodes}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                    anime.status === "Completed" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    {anime.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminAnimeList;
