'use client'
import React, { useState } from "react"
import { useQuery } from '@tanstack/react-query';
import axios from "axios"
import ListCard from "@/components/ListCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 


const fetchTopRatedFromTmdb = async (page = 1) => {
    const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&page=${page}`);
    return response.data.results;
  };


export default function TopRated() {

    const [activePage, setActivePage] = useState(1);
    
    const { data, error, refetch, isError, isLoading } = useQuery({
        queryKey: ['popularMovies', activePage],
        queryFn: () => fetchTopRatedFromTmdb(activePage),
    })

    const handleNextPage = () => {
        setActivePage((prevPage) => prevPage + 1); // Increment the page number
    };

    const handlePreviousPage = () => {
        setActivePage((prevPage) => prevPage - 1); // Increment the page number
    };

    return <>
        <div className="text-white px-44">
            Top Rated Movies
            <div className="movie-container w-full bg-gray-700">
                <div className="w-full  flex flex-wrap">
                {data?.map((movie, index) => (
                   <div key={index}>
                     <ListCard
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    title={movie.title}
                    />
                   </div>
              ))}
              
                </div>
                <div className="flex space-x-3 p-5">
                    <FaChevronLeft className="cursor-pointer hover:text-gray-200 duration-200 text-gray-400" onClick={handlePreviousPage}/>
                    <FaChevronRight className="cursor-pointer hover:text-gray-200 duration-200 text-gray-400" onClick={handleNextPage}/>
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