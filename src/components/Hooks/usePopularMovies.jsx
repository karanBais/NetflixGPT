import { MOVIE_API_OPTION } from "../../Constants"
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../Redux/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
    const dispatch = useDispatch()
  
   const getPopulsarMovies = async () => {
         try{
          const res = await fetch(`/api/tmdb?path=movie/popular`);
        const json = await res.json();
        console.log(json.results);
        dispatch(addNowPlayingMovies(json.results));
      }
      catch{
         console.log("Error fetching now playing movies:");
      }
      }
      
      useEffect(() => {
        getPopulsarMovies();
      }, [])
}

export default usePopularMovies;