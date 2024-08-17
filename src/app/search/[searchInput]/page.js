'use client'
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import ListCard from "@/components/ListCard"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 





export default function SearchPage( { params } ) {
    function decodeText(encodedText) {
        return decodeURIComponent(encodedText);
    }

    const searchInput = decodeText(params.searchInput)

    const fetchMovieFromTmdb = async (  ) => {
        const searchInput = decodeText(params.searchInput)
        const tmdbApiKey = "92b0f3d01f07b3710e21b8f604bf0646";
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${searchInput}&page=1`)
        return response.data.results;
    }

    const { data, error, refetch, isError, isLoading } = useQuery({
        queryKey: ['searchData'],
        queryFn: fetchMovieFromTmdb
    });

 

  

    return (
        <>
            <div className="md:px-44 px-5 text-white flex flex-wrap flex-col md:flex-row ">

            <div className=" w-full flex md:flex-row flex-col space-y-3 md:space-y-0  flex-wrap justify-between">
            
            {data?.map((movie, index) => (
            <div
                className={`w-full md:w-[50%] flex flex-row md:py-2 ${index % 2 === 0 ? 'md:r-5' : 'md:pl-5'}`}
                key={index}
            >
                <div className="flex w-full bg-gray-500 rounded-md">
                    <div
                        className="w-[113.48px] h-[170px] md:w-[166.89px] md:h-[260px] bg-blue-400 flex-shrink-0 rounded-md"
                        style={{
                            backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            objectFit: 'fill'
                        }}
                    ></div>
                    <div className="md:pl-3 pl-1">
                        <h1>{movie.title}</h1>
                    </div>
                </div>
            </div>
        ))}




            </div>

            {/* {data?.map((movie, index) => (
                // <div className="w-full md:w-1/2 border-2 border-black pb-4 md:py-5  justify-around flex" key={index}>
                    
                //     <div className="flex bg-gray-600 rounded-md w-full md:w-[100%] ">
                //         <div className="md:w-[26%] w-[33%]  mr-3">
                //         <div className="w-[100px] h-[150px] md:h-[260px] md:w-[166.89px] rounded-md" 
                //         style={{ 
                //             backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.poster_path}')`,
                //             backgroundSize: 'cover',
                //             backgroundPosition: 'center',
                //             backgroundRepeat: 'no-repeat',
                //             objectFit: 'fill'
                //         }}></div>
                //         </div>
                        
                //         <div className="w-[70%] p-0 text-desc">
                //             <h1 className="md:text-xl text-sm font-medium p-0 leading-4">{movie.title}</h1>
                        
                //         </div>
                //         </div>
                // </div>
            ))}  */}
          
            

            </div>
        </>
        // <div className="text-white px-5 md:px-44">
           
        //     <div  className="bg-black">
        //         <div className="w-1/3 bg-blue-500">
        //             <div className="h-[250px] w-[166.89px] bg-red-400"></div>
        //             <div className="h-[250px] w-[166.89px] bg-red-400"></div>
        //             <div className="h-[250px] w-[166.89px] bg-red-400"></div>
        //         </div>
        //     </div>
        //     
        //        <div key={index} className="w-full bg-black flex flex-row">
        //             <div className="flex bg-red-300 w-1/3">
        //             <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="w-[166.89px] h-[250px]" alt="" />
        //             <a href={`../details/${movie.title}`}>{movie.title}</a>
        //             </div>
        //        </div>
        //   
            
        // </div>
    );
}
