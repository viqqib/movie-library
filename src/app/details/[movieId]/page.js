'use client'
import axios from "axios";
import { useQuery, useQueries } from "@tanstack/react-query";


export default function Details( { params } ) {
    const apiKey = "92b0f3d01f07b3710e21b8f604bf0646"
    const movieId = params.movieId;


      
    const fetchDetailsMovieFromTmdb = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        return response.data;
    }

    const fetchMovieCreditsFromTmdb = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`)
        return response.data;
        
    }


    const results = useQueries({
        queries: [
          {
            queryKey: ['tmdbMovieDetails', movieId],
            queryFn:  () => fetchDetailsMovieFromTmdb(),
          },
          {
            queryKey: ['tmdbMovieCredits', movieId],
            queryFn:  () => fetchMovieCreditsFromTmdb(),
          },
        ],
    });

    

      const movieDetails = results[0].data;
      const movieCredits = results[1].data;

      const movieCasts = movieCredits?.cast?.filter((person) => person.known_for_department === "Acting");

      const mainMovieCasts = movieCasts?.slice(0,9)

      const movieDirector = movieCredits?.crew?.find(person => person.job === "Director");




    return  <>
       <div className="text-white mt-52">
       <h1>{movieDetails?.title}</h1>
       <p>{movieDetails?.overview}</p>

       <p className="text-5xl">{movieDirector?.name}</p>

       {mainMovieCasts?.map((cast, index) => (
            <p key={index}>
                {index}: {cast.name}
            </p>
        ))}

       <p></p>
       </div>
    </>
}