// src/components/GptSearch/GptSearchBar.js (Updated)
import React, { useRef } from "react";
import run from "./Gemini";
import { useDispatch } from "react-redux";
import { startGptSearch, setGptMovies } from "../Redux/GptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const fetchMovieFromTMDB = async (movieName) => {
  const url = `/api/tmdb?path=search/movie&query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.results?.[0] || null;
  } catch (error) {
    console.error(`Error fetching TMDB movie "${movieName}":`, error);
    return null;
  }
};

  const handleGptSearch = async () => {
   const query = searchText.current.value.trim();
  if (!query) return;

  // Check if quota is likely exceeded (e.g., based on time or a manual flag)
  const currentTime = new Date();
  const resetTime = new Date(currentTime);
  resetTime.setUTCHours(0, 0, 0, 0); // Midnight UTC
  resetTime.setUTCDate(resetTime.getUTCDate() + 1); // Next day
  if (currentTime > new Date("2025-08-12T15:39:00Z") && currentTime < resetTime) { // Adjust based on last known usage
    alert("Quota exceeded. Please try again after 7:30 AM IST on August 13, 2025.");
    return;
  }

  dispatch(startGptSearch())

    const gptQuery = `Act as a Movie Recommendation system and suggest 5 movies for: ${query}. Return only names, comma-separated.`; // Reduced to 5 for faster response

    try {
      const gptResponse = await run(gptQuery);
      const movieNames = gptResponse.split(",").map((name) => name.trim());

      // Fetch TMDB data concurrently with a timeout
      const fetchWithTimeout = async (name) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout per movie
        try {
          const result = await fetchMovieFromTMDB(name, { signal: controller.signal });
          clearTimeout(timeoutId);
          return result;
        } catch (error) {
          clearTimeout(timeoutId);
          console.error(`Failed to fetch "${name}":`, error);
          return null;
        }
      };

      const movieDetails = await Promise.all(movieNames.map(fetchWithTimeout));
      const filteredMovies = movieDetails.filter(Boolean);
      dispatch(setGptMovies(filteredMovies));
    } catch (error) {
      console.error("Error in GPT search:", error);
      dispatch(setGptMovies([])); // Reset on error
    }
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36 flex justify-center">
      <form
        className="w-11/12 sm:w-4/5 md:w-3/4 lg:w-1/2 bg-black grid grid-cols-12 rounded-lg overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder="What do you want to watch today?"
          className="col-span-8 sm:col-span-9 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg outline-none bg-gray-800 text-white"
        />
        <button
          type="button"
          onClick={handleGptSearch}
          className="col-span-4 sm:col-span-3 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base md:text-lg font-semibold"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;