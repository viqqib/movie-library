import React, { useState } from "react";
import Image from "next/image";

const MovieCard = (props) => {
    function truncateString(text, maxLength) {
        if (text.length > maxLength) {
            const truncatedText = text.substring(0, maxLength).trim();
            return truncatedText + "...";
        } else {
            return text.trim();
        }
    }

    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMouseOver = () => {
        setIsMouseOver(true)
    }
    const handleMouseLeave = () => {
        setIsMouseOver(false)
    }
    
    return (
        <div className="h-[220px] md:h-[305px] relative">
            <div className={`h-[180px] w-[120px] md:w-[170px]  md:h-[255px] ${isMouseOver ? "brightness-50" : "brightness-100"} duration-300`}
               onMouseOver={handleMouseOver}
               onMouseLeave={handleMouseLeave}
            >
                <Image
                    src={props.src}
                    width={90}
                    height={90}
                    className="rounded-md w-full inline-block"
                    alt={props.alt}
                    onClick={props.onClick}
                />
            </div>

           <div className="w-full bg-transparent border-red-500 border-sol flex absolute md:top-28 top-20 justify-center"
           onMouseOver={handleMouseOver}
           onMouseLeave={handleMouseLeave}
           >
                <button className={`${isMouseOver ? "static" : "hidden"} hover:bg-white hover:text-black md:text-base text-xs  duration-500 font-bold border-solid border-2 rounded-full border-white px-5 py-1`}>View</button>
           </div>

            <p className="md:text-sm text-[11px]  mt-2 md:mt-2 font-light ">
                {truncateString(props.title,50)}
            </p>

         
          
        </div>
    )
}

export default MovieCard;
