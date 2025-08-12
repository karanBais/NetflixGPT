import { MOVIE_API_OPTION } from "../../Constants"
import { useDispatch } from "react-redux";
import { addUpCommingMovies } from "../Redux/movieSlice";
import { useEffect } from "react";

const useUpComming = () => {
    const dispatch = useDispatch()
  
   const getUpCommingMovies = async () => {
       try{
         const res = await fetch(`/api/tmdb?path=movie/upcomming`);
        const json = await res.json();
        console.log(json.results);
        dispatch(addUpCommingMovies(json.results));
       }
       catch{
         console.error("Error fetching now playing movies:", error);
       }
      }
      
      useEffect(() => {
        getUpCommingMovies();
      }, [])
}

export default useUpComming;