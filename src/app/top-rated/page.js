'use client'
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 

const fetchTopRatedFromTmdb = async (page = 1) => {
    const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&page=${page}`);
    return response.data; // Return the entire data object
};

export default function TopRated() {
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;
    
    const { data, error, refetch, isError, isLoading } = useQuery({
        queryKey: ['popularMovies', activePage],
        queryFn: () => fetchTopRatedFromTmdb(activePage),
    });

    // Calculate startIndex and endIndex based on the active page
    const startIndex = 0;
    const endIndex = itemsPerPage;

    // Slice the data to show only 10 items per page
    const displayedData = data?.results.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (activePage < data.total_pages) {
            setActivePage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (activePage > 1) {
            setActivePage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="text-white px-44">
            <h1>Top Rated Movies</h1>
            <div className="movie-container w-full bg-gray-700">
                <div className="w-full flex flex-wrap">
                    {displayedData?.map((movie, index) => (
                        <div key={index}>
                            {/* <ListCard
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                title={movie.title}
                            /> */}
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center p-5">
                    <div className="flex">
                    <FaChevronLeft 
                        className={`${activePage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-gray-200 duration-200 text-gray-400`} 
                        onClick={handlePreviousPage} 
                    />
                    <FaChevronRight 
                        className={`${activePage === data?.total_pages ? 'cursor-not-allowed' : 'cursor-pointer'} hover:text-gray-200 duration-200 text-gray-400`} 
                        onClick={handleNextPage} 
                    />
                    </div>
                    <span>Page {activePage} of {data?.total_pages}</span>
                    
                </div>
            </div>
        </div>
    );
}
