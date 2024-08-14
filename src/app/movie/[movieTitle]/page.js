'use client'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function MovieDetails( { params } ) {

    function decodeText(encodedText) {
        return decodeURIComponent(encodedText);
    }
      
    const fetchDetailsMovieFromOmdb = async () => {
        const apiKey = '4d08b29'
        const title = decodeText(params.movieTitle)
        const response = await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`)
        return response.data;
    }

    const { data, error, refetch, isError, isLoading } = useQuery({
        queryKey: ['omdbData'],
        queryFn: fetchDetailsMovieFromOmdb
    });



    return  <h1>{data?.Title}</h1>
}