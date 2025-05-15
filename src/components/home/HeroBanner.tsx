
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { heroItems } from "@/data/mock";

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Change banner every 8 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const activeItem = heroItems[activeIndex];

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-black">
        <img
          src={activeItem.backgroundImage}
          alt={activeItem.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="container relative h-full flex flex-col justify-center pt-16">
        <div className="max-w-lg">
          {activeItem.type === "countdown" && (
            <div className="inline-flex items-center gap-2 mb-4 bg-anitrack-purple/20 text-anitrack-purple px-3 py-1 rounded-full text-sm">
              <span className="animate-pulse-light">●</span> New Episode Coming Soon
            </div>
          )}
          {activeItem.type === "recommendation" && (
            <div className="inline-flex items-center gap-2 mb-4 bg-anitrack-purple/20 text-anitrack-purple px-3 py-1 rounded-full text-sm">
              <span>✦</span> Recommended For You
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {activeItem.title}
          </h1>
          <p className="text-white/80 mb-6 max-w-md line-clamp-3">
            {activeItem.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-anitrack-purple hover:bg-anitrack-purple-dark text-white gap-2"
            >
              <Play className="h-4 w-4 fill-white" />
              {activeItem.type === "countdown" ? "Watch Previous Episode" : "Start Watching"}
            </Button>
            <Button variant="secondary">Add to My List</Button>
          </div>

          {activeItem.type === "countdown" && (
            <div className="mt-8 flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">01</div>
                <div className="text-xs text-white/80">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-white/80">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">35</div>
                <div className="text-xs text-white/80">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">42</div>
                <div className="text-xs text-white/80">Seconds</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Banner navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {heroItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === index 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
