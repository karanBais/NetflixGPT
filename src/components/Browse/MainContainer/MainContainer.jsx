import React from 'react';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null;

  const mainMovie = movies[0];

  return (
    <div className="relative w-full h-[100vh]">
      <VideoBackground movieId={mainMovie.id} />
      <VideoTitle title={mainMovie.original_title} overview={mainMovie.overview} />
    </div>
  );
};

export default MainContainer;
