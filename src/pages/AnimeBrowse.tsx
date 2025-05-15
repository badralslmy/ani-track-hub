
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AnimeCard from "@/components/anime/AnimeCard";
import { Pagination } from "@/components/ui/pagination";
import { trendingAnime } from "@/data/mock";

const genres = ["Action", "Drama", "Comedy", "Fantasy", "Romance", "Mystery"];
const years = Array.from({ length: 20 }, (_, i) => `${2025 - i}`);
const seasons = ["Winter", "Spring", "Summer", "Fall"];
const ratings = [10, 9, 8, 7, 6];

export default function AnimeBrowse() {
  const [filters, setFilters] = useState({
    keyword: "",
    genre: "",
    season: "",
    year: "",
    rating: ""
  });
  const [page, setPage] = useState(1);

  // Mock Filter: Only for demonstration, replace with real filter logic/data later
  const filtered = trendingAnime
    .filter((a) =>
      (filters.keyword === "" || a.title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
      (filters.genre === "" || a.genres?.includes(filters.genre)) &&
      (filters.season === "" || a.season === filters.season) &&
      (filters.year === "" || a.year?.toString() === filters.year) &&
      (filters.rating === "" || Math.floor(a.rating) >= Number(filters.rating))
    );

  const perPage = 12; // for UX now, can upgrade to 100/صفحة
  const total = filtered.length;
  const maxPage = Math.ceil(total / perPage);
  const animeList = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <AppLayout>
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-6">تصفح الأنمي</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <Input
            placeholder="بحث بعنوان الأنمي"
            onChange={e => setFilters(f => ({ ...f, keyword: e.target.value }))}
            className="w-56"
          />
          <Select onValueChange={val => setFilters(f => ({ ...f, genre: val }))}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map(g => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={val => setFilters(f => ({ ...f, year: val }))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(y => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={val => setFilters(f => ({ ...f, season: val }))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map(s => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={val => setFilters(f => ({ ...f, rating: val }))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {ratings.map(r => (
                <SelectItem key={r} value={r.toString()}>
                  {r}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setFilters({ keyword: "", genre: "", season: "", year: "", rating: "" })}>
            إعادة ضبط
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map(anime => (
            <AnimeCard key={anime.id} id={anime.id} title={anime.title} image={anime.image} rating={anime.rating} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            page={page}
            onChange={setPage}
            total={maxPage}
          />
        </div>
      </div>
    </AppLayout>
  );
}
