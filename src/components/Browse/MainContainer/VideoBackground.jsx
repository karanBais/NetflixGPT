import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMG_API_URL, MOVIE_API_OPTION } from "../../../Constants";

const VideoBackground = ({ movieId }) => {
  const movieDetails = useSelector((store) =>
    store.movies?.nowPlayingMovies?.find((m) => m.id === movieId)
  );
  const backdropUrl = movieDetails?.backdrop_path
    ? `${IMG_API_URL}${movieDetails.backdrop_path}`
    : null;

  const [videoKey, setVideoKey] = useState(null);

  // Fetch video data from TMDB dynamically
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          MOVIE_API_OPTION
        );
        const data = await res.json();
        if (!data.results || data.results.length === 0) return;

        // Priority order: Trailer → Teaser → Clip → Behind the Scenes
        const priorityTypes = ["Trailer", "Teaser", "Clip", "Behind the Scenes"];
        for (let type of priorityTypes) {
          const match = data.results.find((v) => v.type === type && v.site === "YouTube");
          if (match) {
            setVideoKey(match.key);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching video:", err);
      }
    };

    if (movieId) {
      fetchVideo();
    }
  }, [movieId]);

  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
      {videoKey ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&loop=1&playlist=${videoKey}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="w-screen h-screen aspect-video object-cover pointer-events-none scale-125" // Added scale-125 to ensure it fills the screen without letterboxing
        ></iframe>
      ) : backdropUrl ? (
        <img
          src={backdropUrl}
          alt="Movie Background"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-black"></div>
      )}

      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
    </div>
  );
};

export default VideoBackground;