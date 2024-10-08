'use client'
import React, { useState } from "react"
import {FaSearch} from 'react-icons/fa'
import { useRouter } from "next/navigation"

const Header = () => {

    const headerLinks = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Tv Show',
            link: '/home'
        },
        {
            name: 'Top Rated',
            link: '/top-rated'
        },
        {
            name: 'About',
            link: '/home'
        },

    ]

    const router = useRouter();
    const handleSearchClick = () => {
        router.push('top-rated'); // Replace with your target page
      }

      const [getValue, setGetValue] = useState("");
      const [inputValue, setInputValue] = useState("");

      const handleSearchChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
      }

      const handleSearchOnClick = () => {
        router.push(`/search/${inputValue}`); // Navigate to the search page with the encoded input value
        };

    return(
        <>
        <div className="header px-5 md:px-44 w-full items-center py-5 md:py-10 flex justify-between flex-col text-header font-medium">
            <div className="w-full items-center flex justify-between text-header font-medium">
                <p className="md:text-[2rem] text-xl">Movieqqi</p>

                <div className="w-[500px] hidden md:block bg-gray-900 px-3 py-2 mt-3 rounded-">
                    <ul className="flex justify-between text-xs">
                        { headerLinks.map(({name, link, index}) => (
                            <li key={index}><a href={link}>{name}</a></li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center">
                <div className="relative bg-transparent border-2 rounded-lg border-gray-50 opacity-70 flex">
                    <input type="text" className="bg-transparent w-[160px] md:w-[300px] md:py-2  md:px-3 py-1 px-2 focus:outline-none" name="" id="" 
                    onChange={handleSearchChange}
                    value={inputValue}
                    />
                    <div className="w-[30px]"></div>
                    <FaSearch  className="absolute text-gray-50 opacity-70 right-3 top-2 cursor-pointer md:text-xl" 
                    onClick={handleSearchOnClick}
                    />
                </div>
                </div>
            </div>

            <div className="w-full bg-gray-900 px-3 py-2 mt-3 md:hidden rounded-">
                <ul className="flex justify-between text-xs">
                    { headerLinks.map(({name, link, index}) => (
                         <li key={index}><a href={link}>{name}</a></li>
                    ))}
                </ul>
            </div>
        </div>
      
        </>
    )
}

export default Header;