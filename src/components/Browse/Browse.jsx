import React from 'react';
import Header from '../Header/Header';
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer/MainContainer';
import SecondaryContainer from './SecondaryContainer/SecondaryContainer';
import usePopularMovies from '../Hooks/usePopularMovies';
import useTopRatedMovies from '../Hooks/useTopRatedMovies';
import useUpComming from '../Hooks/useUpComming';

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies()
  useUpComming();

  return (
    <div className="relative">
      <Header />
      <MainContainer />
      
      {/* Fix: Ensure this section shows up after main video */}
      <div className="relative z-10 pt-8 md:pt-12 px-4 md:px-8 bg-black">
  <SecondaryContainer />
</div>

    </div>
  );
};

export default Browse;
