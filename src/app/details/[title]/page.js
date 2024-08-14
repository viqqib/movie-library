'use client'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function Details( { params } ) {

    function decodeText(encodedText) {
        return decodeURIComponent(encodedText);
    }
      
    const fetchDetailsMovieFromOmdb = async () => {
        const apiKey = '4d08b29'
        const title = decodeText(params.title)
        const response = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
        return response.data;
    }

    const { data, error, refetch, isError, isLoading } = useQuery({
        queryKey: ['omdbData'],
        queryFn: fetchDetailsMovieFromOmdb
    });



    return  <>
       <div className="text-white mt-52">
       <h1>{data?.Title}</h1>
       <p>{data?.Plot}</p>
       </div>
    </>
}