'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import bg from '../../public/bg.jpg'
import imdbLogo from '../../public/imdb.svg'
import rtLogo from '../../public/rt.svg'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const apiKey = "4d08b29";


export default function Home() {

  const [input, setInput] = useState("");
  const [getInput, setGetInput] = useState("Deadpool")

  const movieTitle = getInput;

  const{ data, error, refetch, isError, isLoading } = useQuery({
    queryKey: ['omdbData', movieTitle],
    queryFn: async() => {
      const response = await axios.get(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`);
      return response.data;
    }
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
      return <div>Error: {error.message}</div>;
  }

  function truncateText (text, long) {
    let truncatedStr = text.substring(0, long);
    return truncatedStr;
  }

  function handleSearchOnClick () {
    setGetInput(input);
  }



  const genrh = ["Adventure", "Drama", "Family"];
  const genres = data.Genre.split(", ");


  return(
    <main className="flex flex-col items-center justify-between text-white">
      <div className="relative w-full">
        <div className="absolute w-full -z-10">
          <Image
            src={bg}
            className="w-full brightness-50"
            width={1000}
            height={1000}
          ></Image>
        </div>

        <div className="header py-12 text-[2rem] top-0 right-0 px-32 flex justify-between text-header">
          <p className="">Library</p>
          <p>IMDb</p>
        </div>
          
          <div className="movie-description px-32">

          <div className="border-white opacity-75 mb-2 rounded-md flex bg-transparent border-solid border-2 w-72 py-2 px-2 justify-between">
            <input type="text"  className="bg-transparent active:bg-transparent focus:outline-none w-5/6" placeholder="Search Movie" name="" id="" value={input} onInput={e => setInput(e.target.value)}
            onKeyDown={(e) => { 
              if (e.key === "Enter") 
                  handleSearchOnClick(); 
              }} 
            />
            <div className="opacity-75 px-3 cursor-pointer"><FontAwesomeIcon icon={faSearch}
            onClick={handleSearchOnClick}
            ></FontAwesomeIcon></div>
          </div>
         
          <div className="w-[500px] ">
            <p className="title text-white font-semibold text-3xl">{data.Title}</p>

            <div className="flex space-x-5 mt-3">
              <div className="flex space-x-2">
                <Image src={imdbLogo} width={100} height={100} className="w-[20px]">

                </Image>
                <p className="font-semibold text-[18px]">
                  {truncateText(data.Ratings.find(( rate ) => rate.Source === "Internet Movie Database")?.Value || "N/A", 3)}
                  </p>
              </div>

              <div className="flex space-x-2">
                <Image src={rtLogo} width={100} height={100} className="w-[20px]">

                </Image>
                <p className="font-bold text-[18px]">90%</p>
              </div>
            </div>

            <div className="genre flex mt-3 space-x-5">
              {genres.map((genre, index) => (
                <div className="border-r-2 flex h-4 items-center pr-5 border-white " key={index}>{genre}</div>
              ))}
                
                   
            </div>

            <div className="mt-2">
              <div className="flex">
                <p className="font-bold">Director  : </p>
                <a href="" className="text-header ml-1">{data.Director}</a>
              </div>

              <div className="flex">
                <p className="font-bold">Stars  : </p>
                <a href="" className="text-header ml-1">{data.Actors}</a>
              </div>

              <div className="flex">
                <p className="font-bold">Country  : </p>
                <a href="" className="text-header ml-1">{data.Country}</a>
              </div>            
            </div>

            <div className="mt-2">
              <p className="leading-5">{data.Plot}</p>
            </div>
          </div>

        </div>

      </div>
    </main>
  )

}
