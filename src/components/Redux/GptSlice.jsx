import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
    name: "gpt",
    initialState:{
        showGptSearch: false,
    },
    reducers: {
        toggleGptSearch: (state, action) =>{
            state.showGptSearch = !state.showGptSearch
        }
    }
})

export const {toggleGptSearch} = GptSlice.actions;

export default GptSlice.reducer;