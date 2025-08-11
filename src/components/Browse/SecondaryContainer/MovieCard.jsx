import React from 'react';
import { IMG_API_URL } from '../../../Constants';

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-35 flex-shrink-0 rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-115 rounded-lg"
        src={IMG_API_URL + posterPath}
        alt="Movie Poster"
      />
    </div>
  );
};

export default MovieCard;
