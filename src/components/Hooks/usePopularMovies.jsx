import { MOVIE_API_OPTION } from "../../Constants"
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../Redux/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
    const dispatch = useDispatch()
  
   const getPopulsarMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?&page=1', MOVIE_API_OPTION)
        const json = await data.json();
        console.log(json.results);
        dispatch(addPopularMovies(json.results));
      }
      
      useEffect(() => {
        getPopulsarMovies();
      }, [])
}

export default usePopularMovies;