import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../../Hooks/useMovieTrailer";
import { IMG_API_URL } from "../../../Constants";

const VideoBackground = ({ movieId }) => {
   useMovieTrailer(movieId);

  const trailerVideo = useSelector((store) => store.movies?.addTrailerVideos);
  const movieDetails = useSelector((store) =>
    store.movies?.nowPlayingMovies?.find((m) => m.id === movieId)
  );

  const backdropUrl = movieDetails?.backdrop_path
    ? `${IMG_API_URL}${movieDetails.backdrop_path}`
    : null;

  const playerRef = useRef(null);

  // Load YouTube API script
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // Initialize YouTube player
  useEffect(() => {
    if (!trailerVideo?.key) return;

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("trailer-player", {
        videoId: trailerVideo.key,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          playlist: trailerVideo.key,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, [trailerVideo]);
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
      {trailerVideo?.key ? (
        <div
          id="trailer-player"
          className="w-screen h-screen aspect-video  object-cover pointer-events-none"
        ></div>
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
