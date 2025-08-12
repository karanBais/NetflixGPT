import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../../Hooks/useMovieTrailer";
import { IMG_API_URL } from "../../../Constants";

const VideoBackground = ({ movieId }) => {
  useMovieTrailer(movieId); // Fetch trailer when component mounts

  const trailerVideo = useSelector((store) => store.movies?.addTrailerVideos);
  const movieDetails = useSelector((store) => store.movies?.nowPlayingMovies?.find(m => m.id === movieId));

  const backdropUrl = movieDetails?.backdrop_path 
    ? `${IMG_API_URL}${movieDetails.backdrop_path}`
    : null;

    useEffect(() => {
  if (window.YT && trailerVideo?.key) {
    const player = new window.YT.Player("trailer-player", {
      events: {
        onReady: (event) => event.target.playVideo(),
      },
    });
  }
}, [trailerVideo]);

  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
      {trailerVideo?.key ? (
        <iframe
          className="w-screen aspect-video object-cover pointer-events-none"
          src={`https://www.youtube.com/embed/${trailerVideo?.key}?mute=1&autoplay=1&controls=0&loop=1&playlist=${trailerVideo?.key}&enablejsapi=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : backdropUrl ? (
        <img
          src={backdropUrl}
          alt="Movie Background"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-black"></div> // pure black fallback
      )}

      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
    </div>
  );
};

export default VideoBackground;
