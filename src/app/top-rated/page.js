'use client'
import React from "react"
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import ListCard from "@/components/ListCard";


const fetchTopRatedFromTmdb = async () => {
    const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}`);
    return response.data.results;
  };


export default function TopRated() {

    const { data, error, refetch, isError, isLoading } = useQuery({
        queryKey: ['popularMovies'],
        queryFn: fetchTopRatedFromTmdb
    })

    return <>
        <div className="text-white px-44">
            Top Rated Movies
            <div className="movie-container w-full bg-gray-700">
                <div className="w-full  flex flex-wrap">
                {data?.map((movie, index) => (
                    <ListCard
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    title={movie.title}
                    />
              ))}
                </div>
                {/* <div className="flex flex-col flex-wrap w-full bg-black ">
                {data?.map((movie, index) => (
                    <ListCard
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    title={movie.title}
                    />
              ))}
                </div> */}
            </div>
        </div>
    </>
}