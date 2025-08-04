import { MOVIE_API_OPTION } from "../../Constants"
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../Redux/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
    const dispatch = useDispatch()
  
   const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?&page=1', MOVIE_API_OPTION)
        const json = await data.json();
        console.log(json.results);
        dispatch(addTopRatedMovies(json.results));
      }
      
      useEffect(() => {
        getTopRatedMovies();
      }, [])
}

export default useTopRatedMovies;