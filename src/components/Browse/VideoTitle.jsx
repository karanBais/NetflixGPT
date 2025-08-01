import React from 'react';
// import { FaPlay } from 'react-icons/fa';
// import { AiOutlineInfoCircle } from 'react-icons/ai';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute  top-[30%] md:top-[40%] px-6 md:px-16 text-white w-screen aspect-video max-w-[50%] z-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>

      <p className="text-sm md:text-lg font-medium text-gray-200 mb-6 drop-shadow-md line-clamp-3">
        {overview}
      </p>

      <div className="flex gap-3">
        <button className="bg-white text-black px-6 py-2 rounded hover:bg-gray-300 transition flex items-center font-semibold text-sm md:text-base">
          {/* <FaPlay className="mr-2" /> Play */} ▶ Play
        </button>
        <button className="bg-gray-500 bg-opacity-50 text-white px-6 py-2 rounded hover:bg-opacity-20 transition flex items-center font-semibold text-sm md:text-base">
          {/* <AiOutlineInfoCircle className="mr-2" /> More Info */} More Info
        </button> 
      </div>
    </div>
  );
};

export default VideoTitle;
