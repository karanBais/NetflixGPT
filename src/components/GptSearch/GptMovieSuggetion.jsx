import React from "react";
import { useSelector } from "react-redux";

const GptMovieSuggestion = () => {
  const movies = useSelector((state) => state.gpt.gptMovies);

  if (!movies.length) return null;

 return (
  <div className="pt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
    {movies.map((movie) => (
      <div key={movie.id} className="bg-gray-900 p-2 rounded-lg">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="h-72 bg-gray-700 flex items-center justify-center">
            No Image
          </div>
        )}
        <h3 className="mt-2 text-m font-bold text-center text-white-500">{movie.title}</h3>
      </div>
    ))}
  </div>
);
}

export default GptMovieSuggestion;
