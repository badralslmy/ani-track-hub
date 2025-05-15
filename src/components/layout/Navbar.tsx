
import { Link } from "react-router-dom";
import { Search, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 overflow-hidden">
              <img
                src="/lovable-uploads/e81bef10-14f1-4e17-901d-64735aae78ab.png"
                alt="AniTrack"
                className="object-contain w-full h-full"
              />
            </div>
            <h1 className="font-bold text-xl hidden sm:block">
              AN<span className="text-anitrack-purple">i</span>TRACK
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              to="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse
            </Link>
            <Link
              to="/mylist"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              My List
            </Link>
            <Link
              to="/admin"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Admin
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Search</span>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-anitrack-purple text-white">
              AT
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 border-b bg-background shadow-lg animate-slide-left md:hidden">
            <nav className="container py-4 flex flex-col gap-2">
              <Link
                to="/"
                className="p-2 hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="p-2 hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                to="/mylist"
                className="p-2 hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                My List
              </Link>
              <Link
                to="/admin"
                className="p-2 hover:bg-secondary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <div className="flex items-center gap-4 mt-2 pt-2 border-t">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-5 w-5" />
                </Button>
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-anitrack-purple text-white text-xs">
                    AT
                  </AvatarFallback>
                </Avatar>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
