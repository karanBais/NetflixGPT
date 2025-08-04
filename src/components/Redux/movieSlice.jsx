import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState:{
        nowPlayingMovies: null,
        addTrailerVideos: null,
    },

    reducers:{
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
          addTopRatedMovies: (state, action) => {
            state.TopRatedMovies = action.payload
        },
        addUpCommingMovies: (state, action) =>{
            state.upCommingMovies = action.payload
        },
        addTrailerVideos: (state, action) => {
            state.addTrailerVideos = action.payload
        }
    }
})

export const {addNowPlayingMovies, addTrailerVideos, addPopularMovies, addTopRatedMovies, addUpCommingMovies} = movieSlice.actions;
export default movieSlice.reducer;