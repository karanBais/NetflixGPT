import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestion from './GptMovieSuggetion';
import { useSelector } from "react-redux";

const GptSearchPage = () => {
  const isLoading = useSelector((state) => state.gpt.isLoading);

  return (
    <div className="relative min-h-screen bg-black text-white pb-24">
      <GptSearchBar />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-solid border-opacity-75"></div>
        </div>
      ) : (
        <GptMovieSuggestion />
      )}
    </div>
  );
};

export default GptSearchPage;