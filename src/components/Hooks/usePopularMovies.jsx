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
        dispatch(addPopularMovies(json.results));
     }
     catch{
       console.error("Error fetching now playing movies:", error);
     }
      }
      
      useEffect(() => {
        getPopulsarMovies();
      }, [])
}

export default usePopularMovies;