import React from "react";
import Header from "../Header/Header";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer/MainContainer";
import SecondaryContainer from "./SecondaryContainer/SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpComming from "../Hooks/useUpComming";
import GptSearchPage from "../GptSearch/GptSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComming();

  return (
    <div className="relative">
      <Header />
      {showGptSearch ? (
        <GptSearchPage />
      ) : (
        <>
          <MainContainer />
          <div className="relative z-10 pt-8 md:pt-12 px-4 md:px-8 bg-black">  {/* Fix: Ensure this section shows up after main video */}
            <SecondaryContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default Browse;
