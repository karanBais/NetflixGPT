import React, { useRef } from "react";
import openai from "./openAi";

const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearch = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the quary" +
      searchText.current.value +
      " only give me 10 movies. comma seperated. ";

    const gptResult = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "developer", content: gptQuery }],
    });
    console.log(gptResult.choices);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black py-4 px-4 z-50">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-3xl mx-auto bg-[#141414] rounded-full overflow-hidden shadow-lg"
      >
        <input
          type="text"
          ref={searchText}
          // onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search movies with GPT..."
          className="flex-grow px-6 py-3 bg-[#141414] text-white placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          onClick={() => handleGptSearch()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
