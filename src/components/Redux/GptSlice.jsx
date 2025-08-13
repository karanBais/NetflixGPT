import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: [], // store GPT movie results
    isLoading: false, // Added for loading state
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptMovies: (state, action) => {
      state.gptMovies = action.payload;
      state.isLoading = false; // Stop loading when movies are set
    },
    startGptSearch: (state) => {
      state.isLoading = true; // Start loading
      state.gptMovies = []; // Clear previous results
    },
  },
});

export const { toggleGptSearch, setGptMovies, startGptSearch } = GptSlice.actions;
export default GptSlice.reducer;