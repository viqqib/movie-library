'use client'
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieCardSlider = (props) => {
    const sliderTitle = props.movieTitle;
    const poster = props.moviePoster;

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft -= 5330; // Adjust to scroll left
    };

    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft += 647; // Adjust to scroll right
    };

    return (
        <div
            className="md:w-[716px] w-full py-3 px-4 md:px-[42px] relative backdrop-blur-sm rounded-md duration-200 p-2"
            style={{
                backgroundImage: 'linear-gradient(106deg, rgba(255, 255, 255, 42%) 0%, rgba(51, 51, 51, 24%) 100%)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <FaChevronLeft className="cursor-pointer absolute left-3 top-[45%] hidden md:block" onClick={slideLeft} />
            <FaChevronRight className="cursor-pointer absolute right-3 top-[45%] hidden md:block" onClick={slideRight} />
            <div className="">
                <h1 className="mb-2 text-lg font-medium">On Cinema Now</h1>

                <div className="flex space-x-3 md:space-x-5 overflow-x-scroll h-[180px] md:h-[270px] scrollbar-hide scroll-smooth overflow-y-hidden" id="slider">
                    {sliderTitle?.map((item, index) => (
                        <div key={index}>
                            <div
                                className="md:h-[210.18px] md:w-[141.99px] h-[148px] w-[100px] bg-white rounded-[10px]"
                                style={{
                                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster[index]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            ></div>
                            <p className="w-[100px] mt-2 md:w-[141.99px] font-medium text-[9px] md:text-[13px]">
                                {item}
                            </p>
                            <p className="text-[8px] md:text-[11.5px]">Ben Affleck</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieCardSlider;
