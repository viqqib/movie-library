'use client'
import React, { useState } from "react";
import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import {FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa'



const fetchPopularFromTmdb = async () => {
  const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`);
  return response.data.results;
};

const fetchTopRatedFromTmdb = async () => {
  const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
  const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}`);
  return response.data.results;
};

export default function Home() {

  const slideLeft = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = 0
  }

  const slideRight = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 1330
  }

  // Execute the queries with useQueries
  const results = useQueries({
    queries: [
      {
        queryKey: ['popularMovies'],
        queryFn: fetchPopularFromTmdb,
      },
      {
        queryKey: ['topRatedMovies'],
        queryFn: fetchTopRatedFromTmdb,
      },
    ],
  });

  // Destructure the results
  const popularMoviesResult = results[0];
  const topRatedMoviesResult = results[1];

  // // Error handling
  // if (popularMoviesResult?.isError || topRatedMoviesResult?.isError) {
  //   return <div>Error: {popularMoviesResult?.error?.message || topRatedMoviesResult?.error?.message}</div>;
  // }

  // // Loading state
  // if (popularMoviesResult?.isLoading || topRatedMoviesResult?.isLoading) {
  //   return <div>Loading...</div>;
  // }

  // Access the data from the results
  const popularMovies = popularMoviesResult?.data || [];
  const topRatedMovies = topRatedMoviesResult?.data || [];



  return (
    <main>
      <div className="bg-teal-950 min-h-screen justify-center md:px-44 px-5 text-white pb-10">
        <div className="header w-full py-10 flex justify-between text-header font-medium">
          <p className="md:text-[2rem]">Library</p>
          <p className="md:text-[2rem]">Film</p>
        </div>

        <div className="popular-movie-container">
          <div className="flex items-center">
            <div className="text-xl border-red-500 border-l-4 h-4"></div>
            <p className="text-lg ml-2">Popular Movies</p>
          </div>
          
          <div className="relative flex items-center    mt-3">
            <FaChevronCircleLeft size={35} className="hidden md:static opacity-50 hover:opacity-80 duration-300 cursor-pointer absolute z-10 left-0 top-32" onClick={slideLeft}/>
            <div className=" space-x-2 md:space-x-5 overflow-x-scroll scroll  scrollbar-hide scroll-smooth flex" id="slider">
              {popularMovies.map((movie, index) => (
                <MovieCard
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  title={movie.title}
                />
              ))}
              <FaChevronCircleRight size={35} className="hidden md:static opacity-80 hover:opacity-90 duration-300 absolute z-10 right-6 top-32 cursor-pointer" onClick={slideRight}/>
            </div>
          </div>
        </div>

        
      </div>
    </main>
  );
}
