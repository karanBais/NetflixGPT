import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector( (store) => store?.movies );
  if (!movies) return null;

 
  return (
    movies && (
      <div className='-mt-45 relative z-20'>
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
      <MovieList title="Top Rated" movies={movies?.TopRatedMovies} />
      <MovieList title={"Popular movies"} movies={movies?.popularMovies} />
      <MovieList title={"Up Comming "} movies={movies?.upCommingMovies} />
    </div>
    )
  )
}

export default SecondaryContainer;