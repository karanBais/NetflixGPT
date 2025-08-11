import React, { useRef } from "react";
import run from "./Gemini";
import { MOVIE_API_OPTION } from "../../Constants";
import { useDispatch } from "react-redux";
import { setGptMovies } from "../Redux/GptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const fetchMovieFromTMDB = async (movieName) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movieName
    )}&include_adult=false&language=en-US&page=1`;

    const response = await fetch(url, MOVIE_API_OPTION);
    const data = await response.json();
    return data.results?.[0];
  };

  const handleGptSearch = async () => {
    const query = searchText.current.value.trim();
    if (!query) return;

    const gptQuery = `Act as a Movie Recommendation system and suggest 10 movies for: ${query}. Return only names, comma-separated.`;

    try {
      const gptResponse = await run(gptQuery);
      const movieNames = gptResponse.split(",").map((name) => name.trim());

      const movieDetails = await Promise.all(
        movieNames.map((name) => fetchMovieFromTMDB(name))
      );

      const filteredMovies = movieDetails.filter(Boolean);
      dispatch(setGptMovies(filteredMovies));
    } catch (error) {
      console.error("Error fetching GPT movies:", error);
    }
  };

   return (
    <div className="pt-[10%] md:pt-[5%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder="What do you want to watch today?"
          className="col-span-9 px-4 py-3 text-lg outline-none bg-gray-800 text-white"
        />
        <button
          type="button"
          onClick={handleGptSearch}
          className="col-span-3 bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
