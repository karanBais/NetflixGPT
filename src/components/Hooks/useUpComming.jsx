import { MOVIE_API_OPTION } from "../../Constants"
import { useDispatch } from "react-redux";
import { addUpCommingMovies } from "../Redux/movieSlice";
import { useEffect } from "react";

const useUpComming = () => {
    const dispatch = useDispatch()
  
   const getUpCommingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?&page=1', MOVIE_API_OPTION)
        const json = await data.json();
        console.log(json.results);
        dispatch(addUpCommingMovies(json.results));
      }
      
      useEffect(() => {
        getUpCommingMovies();
      }, [])
}

export default useUpComming;