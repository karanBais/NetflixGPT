const GptSearchPage = () => {
  const isLoading = useSelector((state) => state.gpt.isLoading);
  const gptMovies = useSelector((state) => state.gpt.gptMovies);

  return (
    <div className="relative min-h-screen bg-black text-white pb-24">
      <GptSearchBar />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-solid border-opacity-75"></div>
        </div>
      ) : gptMovies.length === 0 ? (
        <div className="text-center text-red-500 mt-10">
          No results found or quota exceeded. Check your plan at https://ai.google.dev/gemini-api/docs/rate-limits.
        </div>
      ) : (
        <GptMovieSuggestion />
      )}
    </div>
  );
};

export default GptSearchPage;