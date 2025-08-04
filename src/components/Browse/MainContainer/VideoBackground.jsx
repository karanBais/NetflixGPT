import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../../Hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId); // ✅ Correct usage

  const trailerVideo = useSelector((store) => store.movies?.addTrailerVideos);

  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden z-0">
      <iframe
        className="w-screen aspect-video object-cover pointer-events-none"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      {/* Optional: Add a dark gradient overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
    </div>
  );
};

export default VideoBackground;
