import { MOVIE_API_OPTION } from "../../Constants"
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../Redux/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
  
   const getNowPlayingMovies = async () => {
      try{
          const res = await fetch(`/api/tmdb?path=movie/now_playing`);
        const json = await res.json();
        console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
      }
      catch{
         console.error("Error fetching now playing movies:", error);
      }
      }
      
      useEffect(() => {
        getNowPlayingMovies();
      }, [])
}

export default useNowPlayingMovies;