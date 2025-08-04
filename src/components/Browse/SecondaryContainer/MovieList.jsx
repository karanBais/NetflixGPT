import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use any icons

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  if (!Array.isArray(movies)) return null;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <div className="p-2">
      <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>

      <div className="relative group">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/60 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 z-10"
          onClick={scrollLeft}
        >
          <ChevronLeft size={28} />
        </button>

        {/* Movie Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/60 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 z-10"
          onClick={scrollRight}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
