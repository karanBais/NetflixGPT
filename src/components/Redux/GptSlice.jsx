import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: [], // store GPT movie results
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptMovies: (state, action) => {
      state.gptMovies = action.payload;
    },
  },
});

export const { toggleGptSearch, setGptMovies } = GptSlice.actions;
export default GptSlice.reducer;
