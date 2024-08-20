'use client'
import React, { useState } from "react";
import axios from "axios";
import { useQueries } from "@tanstack/react-query";
import MovieCard from "@/components/MovieCard";
import {FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa'
import NewsGlass from "@/components/NewsGlass";
import MovieCardSlider from "@/components/MovieCardSlider";

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const fetchPopularFromTmdb = async () => {
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

       

        
      </div>
    </main>
  );
}
