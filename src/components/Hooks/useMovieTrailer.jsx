import { MOVIE_API_OPTION } from "../../Constants";
import { useDispatch } from "react-redux";
import { addTrailerVideos } from "../Redux/movieSlice";
import { useEffect } from "react";


const useMovieTrailer = (movieId) => {

     const dispatch = useDispatch();

  const getBackgroundVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
      MOVIE_API_OPTION
    );
    const json = await data.json();
    

    const filterData = json.results.filter((video) => video.type == "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    
    dispatch(addTrailerVideos(trailer));
  };
  useEffect(() => {
    getBackgroundVideo();
  }, []);
}
export default useMovieTrailer;