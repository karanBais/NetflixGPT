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
        dispatch(addNowPlayingMovies(json.results));
      }
      catch{
         console.log("Error fetching now playing movies:");
      }
      }
      
      useEffect(() => {
        getUpCommingMovies();
      }, [])
}

export default useUpComming;