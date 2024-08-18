'use client'
import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import ListCard from "@/components/ListCard"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import Link from "next/link";





export default function SearchPage( { params } ) {
    function decodeText(encodedText) {
        return decodeURIComponent(encodedText);
    }

    const searchInput = decodeText(params.searchInput)
    const omdbApiKey = "4d08b29"
    let movieTitle = [];

    const fetchMovieDetailFromOmdb = async () => {
        const searchInput = decodeText(params.searchInput)
        const response = await axios.get(`https://www.omdbapi.com/t=${movieTitle}&apikey=${omdbApiKey}`)
        return response.data.Search;
    }

    const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";

    const [genreMap, setGenreMap] = useState({});

    // Fetch the list of genres and store the mapping
    const fetchGenres = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}&language=en-US`);
        const genres = response.data.genres;
        const genreMapping = genres.reduce((map, genre) => {
            map[genre.id] = genre.name;
            return map;
        }, {});
        setGenreMap(genreMapping);
    };

    const fetchMovieFromTmdb = async () => {
        const searchInput = decodeText(params.searchInput)
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${searchInput}&page=1`)
        return response.data.results;
    }

    const {data: genre} = useQuery({
        queryKey: ['genre'],
        queryFn: fetchGenres
    })

    const { data, error, refetch, isError, isLoading } = useQuery({
        queryKey: ['searchData'],
        queryFn: fetchMovieFromTmdb
    });

 

  

    return (
        <>
            <div className="md:px-44 px-5 text-white flex flex-wrap flex-col md:flex-row ">

            <div className=" w-full flex md:flex-row flex-col space-y-3 md:space-y-0  flex-wrap justify-between">

                

            <div  className="flex w-full backdrop-blur-lg bg-white/10 rounded-md duration-200 p-2"
                style={{
                    backgroundImage: 'linear-gradient(107.499deg, rgba(255, 255, 255, 42%) 0%, rgba(51, 51, 51, 24%) 90%)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}>
                    <p>Showing results from <span className="text-yellow-300">{searchInput}</span></p>
                </div>

            {data?.map((movie, index) => (
                <ListCard 
                    index={index}
                    posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    detailUrl={`../details/${movie.id}`} //
                    title={movie.title}
                    genre={movie.genre_ids.map(id => genreMap[id]).join(", ")}
                />
            ))}
     

                <div  className="flex w-full backdrop-blur-lg bg-white/10 rounded-md duration-200 py-2 mt-6"
                style={{
                    backgroundImage: 'linear-gradient(107.499deg, rgba(255, 255, 255, 42%) 0%, rgba(51, 51, 51, 24%) 90%)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}>
                 <div className="flex justify-between w-full items-center px-3 md:px-4">
                 <p>Page 1 of 276 <span className="text-yellow-300"></span></p>
                 <div className="flex space-x-3">
                    <FaChevronLeft className="cursor-pointer text-white/40 hover:text-white/90 duration-300"/>
                    <FaChevronRight className="cursor-pointer text-white/40 hover:text-white/90 duration-300"/>
                 </div>
                 </div>
                    
                </div>




            </div>



            </div>
        </>

    );
}
