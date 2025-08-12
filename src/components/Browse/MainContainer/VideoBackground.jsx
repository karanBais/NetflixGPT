import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { IMG_API_URL, TMDB_API_OPTIONS } from "../../../Constants";

const VideoBackground = ({ movieId }) => {
  const movieDetails = useSelector((store) =>
    store.movies?.nowPlayingMovies?.find((m) => m.id === movieId)
  );
  const backdropUrl = movieDetails?.backdrop_path
    ? `${IMG_API_URL}${movieDetails.backdrop_path}`
    : null;

  const [videoKey, setVideoKey] = useState(null);
  const playerRef = useRef(null);

  // 1. Fetch video data from TMDB dynamically
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          TMDB_API_OPTIONS
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

  // 2. Load YouTube API
  useEffect(() => {
    if (!videoKey) return;

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("trailer-player", {
        videoId: videoKey,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          loop: 1,
          playlist: videoKey,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  }, [videoKey]);

  return (
       <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-0">
      {videoKey ? (
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
