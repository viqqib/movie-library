'use client'

import React from "react"
import thumb from '@/../../public/spiderman2.png'
import Image from "next/image"


const ListCard = (props) => {
    return <>
        <div className="flex w-1/2 p-2">

            <div className="w-[165px] h-[250px]">
                <Image
                    src={props.src}
                    width={100}
                    height={100}
                    className="w-[165px] h-[250px] rounded-md"
                />

            </div>

            <p className="text-xl">{props.title}</p>
            
        </div>
    </>
}

export default ListCard;