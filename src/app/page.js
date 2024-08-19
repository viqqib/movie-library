'use client'
import React, { useState } from "react";
import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import {FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa'
import NewsGlass from "@/components/NewsGlass";
import MovieCardSlider from "@/components/MovieCardSlider";


const fetchPopularFromTmdb = async () => {
  const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
  const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`);
  return response.data.results;
};

const fetchMovieNews = async () => {
  const newsApiKey = "b1a494feef7d45d0b3cc6f2219a9f17"
  const response = await axios.get(`https://newsapi.org/v2/everything?q=movies&apiKey=${newsApiKey}e&sortBy=publishedAt`)
  const articles = response.data.articles.slice(0, 5);
  return articles;
}





export default function Home() {

  
  // Execute the queries with useQueries
  const results = useQueries({
    queries: [
      {
        queryKey: ['popularMovies'],
        queryFn: fetchPopularFromTmdb,
      },
      {
        queryKey: ['movieNews'],
        queryFn: fetchMovieNews,
      }
    ],
  });

  // Destructure the results
  const popularMoviesResult = results[0];
  const movieNewsResult = results[1];




  // Access the data from the results
  const popularMovies = popularMoviesResult?.data || [];
  const movieNews = movieNewsResult?.data || [];



  return (
    <main>
      <div className="min-h-screen justify-center md:px-44 px-5 text-white pb-10">

        <div className="container flex md:flex-row flex-col items-start w-full justify-between md:space-x-5">

          
         <div className="w-full">
         <MovieCardSlider 
            movieTitle={popularMovies.map(movie => movie.title)}
            movieId={popularMovies.map(movie => movie.id)}
            moviePoster={popularMovies.map(movie => movie.poster_path)}
            />

          
         </div>

          <div className="w-full h-full rounded-md mt-3 md:mt-0">
            <NewsGlass
              newsTitle={movieNews.map(news => news.title )}
              newsSource={movieNews.map(news => news.source.name )}
              newsThumbnail={movieNews.map(news => news.urlToImage)}
              newsAuthor={movieNews.map(news => news.author )}
              newsDate={movieNews.map(news => news.publishedAt )}
            />
            {/* { movieNews.map((news, index) => (
              <p>{news.title}</p>
            ))} */}
          </div>
        </div>

        {/* <div className="popular-movie-container">
          <div className="flex items-center">
            <div className="text-xl border-red-500 border-l-4 h-4"></div>
            <p className="md:text-lg ml-2">Popular Movies</p>
          </div>
           
          <div className="relative flex items-center    mt-3">
            <FaChevronCircleLeft size={35} className="hidden md:block opacity-30 hover:opacity-80 duration-300 cursor-pointer absolute z-10 left-1 top-32" onClick={slideLeft}/>
            <div className=" space-x-3 md:space-x-5 overflow-y-hidden overflow-x-scroll scroll  scrollbar-hide scroll-smooth flex" id="slider">
              {popularMovies.map((movie, index) => (
                <MovieCard
                  alt={movie.title}
                  key={index}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  title={movie.title}
                  link={`details/${movie.id}`}

                />
              ))}
              <FaChevronCircleRight size={35} className="hidden md:block opacity-30 hover:opacity-90 duration-300 absolute z-10 right-2 top-32 cursor-pointer" onClick={slideRight}/>
            </div>
          </div>
        </div> */}

        
      </div>
    </main>
  );
}
