import { MOVIE_API_OPTION } from "../../Constants"
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../Redux/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
    const dispatch = useDispatch()
  
   const getTopRatedMovies = async () => {
         try{
          const res = await fetch(`/api/tmdb?path=movie/top_rated`);
        const json = await res.json();
        console.log(json.results);
        dispatch(addTopRatedMovies(json.results));
      }
      catch{
         console.error("Error fetching top rated movies:", error);
      }
      }
      
      useEffect(() => {
        getTopRatedMovies();
      }, [])
}

export default useTopRatedMovies;