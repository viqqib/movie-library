'use client'

import React from "react"
import thumb from '@/../../public/spiderman2.png'
import Image from "next/image"
import Link from "next/link"


const ListCard = (props) => {
    const index = props.index;
    return <>
        <div
                className={`w-full md:w-[50%] flex flex-row md:py-2 ${index % 2 === 0 ? 'md:r-5' : 'md:pl-5'} duration-200`}
                key={index}
            >
                <div
                className="flex w-full backdrop-blur-lg bg-white/10 rounded-md duration-200 p-2"
                style={{
                    backgroundImage: 'linear-gradient(107.499deg, rgba(255, 255, 255, 42%) 0%, rgba(51, 51, 51, 24%) 100%)',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                >
                    <div
                        className="w-[113.48px] h-[170px] md:w-[166.89px] md:h-[260px] bg-blue-400 flex-shrink-0 rounded-md"
                        style={{
                            backgroundImage: `url('${props.posterUrl}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            objectFit: 'fill'
                        }}
                    ></div>
                    <div className="md:pl-3 pl-2">
                    <Link href={`${props.detailUrl}`}>
                        <p className="leading-6 font-medium text-[1.3rem]">

                            {props.title}
                     
                        </p>
                        <p className="text-sm mt-1 text-gray-300">
                                            {/* Map genre_ids to genre names */}
                                            {props.genre}
                                        </p>
                        <p>
                            {/* {movie.overview} */}
                        </p>
                    </Link>
                       
                    </div>
                </div>
            </div>
    </>
}

export default ListCard;