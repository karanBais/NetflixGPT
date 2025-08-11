import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggetion from './GptMovieSuggetion'

const GptSearchPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white pb-24">
      <GptSearchBar />
      <GptMovieSuggetion />
    </div>
  )
}

export default GptSearchPage
