'use client';
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchPopularMoviesFromTmdb = async () => {
    const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`);
    return response.data.results; 
};

const fetchMovieDetailsFromOmdb = async (movieTitle) => {
    const omdbApiKey = "4d08b29";
    const response = await axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbApiKey}`);
    return response.data;
};

export default function Tmdb() {
    const { data: popularMovies, isLoading: isLoadingPopular, isError: isErrorPopular, error: errorPopular } = useQuery({
        queryKey: ['popularMovies'],
        queryFn: fetchPopularMoviesFromTmdb,
    });

    const { data: movieDetailsList, isLoading: isLoadingDetails, isError: isErrorDetails, error: errorDetails } = useQuery({
        queryKey: ['movieDetails', popularMovies],
        queryFn: async () => {
            if (!popularMovies) return [];
            const detailsPromises = popularMovies.map(movie => fetchMovieDetailsFromOmdb(movie.title));
            return Promise.all(detailsPromises);
        },
        enabled: !!popularMovies, // Only run this query when popularMovies is available
    });

    if (isLoadingPopular || isLoadingDetails) {
        return <div>Loading...</div>;
    }

    if (isErrorPopular) {
        return <div>Error loading popular movies: {errorPopular.message}</div>;
    }

    if (isErrorDetails) {
        return <div>Error loading movie details: {errorDetails.message}</div>;
    }

    return (
        <div className="bg-teal-900 text-white">
            <h1>Popular Movies</h1>
            

            {movieDetailsList && movieDetailsList.map((movieDetails, index) => (
                <div key={index}>
                    <p>Title: {movieDetails.Title}</p>
                    <p>Director: {movieDetails.Director}</p>
                </div>
            ))}
        </div>
    );
}
