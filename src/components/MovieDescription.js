'use client'
import imdbLogo from '../../public/imdb.svg'
import rtFreshLogo from '../../public/rt.svg'
import Image from 'next/image'
import rtRottenLogo from '../../public/rotten.svg'

import React from "react"

const MovieDescription = (props) => {
    // function truncateText (text, long) {
    //     let truncatedStr = text.substring(0, long);
    //     return truncatedStr;
    //   }

    // const genres = props.genre.split(", ");
    const genres = props.genre;

    const convertTomatometerToInteger = (value) => {
      if (typeof value === 'string' && value.endsWith('%')) {
        return parseInt(value.slice(0, -1), 10);
      }
      return null;
    };

    const tomatometer = convertTomatometerToInteger(props.rtRating)
    

    const rtLogoChoser = (value) => {
      if(value >= 60 ) {
        return rtFreshLogo
      } else if(value <= 59) {
        return rtRottenLogo
      }
    }

    return(

        <div className="w-[500px] ">
        <p className="title text-white font-semibold text-4xl">{props.title}</p>

        <div className="flex space-x-5 mt-3">
          <div className="flex space-x-2">
            <Image src={imdbLogo} width={100} height={100} className="w-6 h-6">

            </Image>
            <p className="font-semibold text-[18px]">
              {props.imdbRating}
              </p>
          </div>
             
          <div className="flex space-x-2">
            <Image src={tomatometer >= 60 ? rtFreshLogo : rtRottenLogo } width={200} height={100} className="w-6 h-6">

            </Image>
            <p className="font-bold text-[18px]">{tomatometer}%</p>
          </div>
        </div>

        <div className="genre flex mt-3 space-x-5">
  
            <div className="border-r-2 flex h-4 items-center pr-5 border-white ">{genres}</div>
        
            
               
        </div>

        <div className="mt-2">
          <div className="flex">
            <p className="font-bold">Director  : </p>
            <a href="" className="text-header ml-1">{props.director}</a>
          </div>

          <div className="flex">
            <p className="font-bold">Stars  : </p>
            <a href="" className="text-header ml-1">{props.actors}</a>
          </div>

          <div className="flex">
            <p className="font-bold">Country  : </p>
            <a href="" className="text-header ml-1">{props.country}</a>
          </div>            
        </div>

        <div className="mt-2">
          <p className="leading-5">{props.plot}</p>
        </div>
      </div>
    )

}

export default MovieDescription;