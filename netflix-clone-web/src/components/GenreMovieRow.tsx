import { axiosInstance } from "../utils/axios";
import { Movie } from "../types/movie";
import { useQuery } from "@tanstack/react-query";

type GenreMovieRowProps = {
  title: string;
  fetchURL: string;
  isFeaturedRow?: boolean; 
}

export function GenreMovieRow({ title, fetchURL, isFeaturedRow = false}: GenreMovieRowProps) {

  const BASE_URL = 'https://image.tmdb.org/t/p/original'

  async function fetchRowMoviesData(): Promise<Movie[]> {
    const request = await axiosInstance.get(fetchURL)
    return request.data.results
  }

  const moviesQuery = useQuery({
    queryKey: [`${title}`],
    queryFn: () => fetchRowMoviesData(),
    cacheTime: 100 * (60 * 1000), // 100 min
    staleTime: 1000 // 1 second
  })

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters hide-scrollbar">
        { moviesQuery.isLoading && "Loading..."}
        { moviesQuery.isError && <pre>{JSON.stringify(moviesQuery.error)}</pre>}
        { 
          moviesQuery.data && moviesQuery.data.map(movie => (
            ((isFeaturedRow && movie.backdrop_path) ||
            (!isFeaturedRow && movie.poster_path)) &&
              <img
                className={`row__poster ${isFeaturedRow && "row__poster-large"}`}
                key={movie.id}
                src={`${BASE_URL}${isFeaturedRow ? movie.backdrop_path : movie.poster_path}`} 
                alt={movie.name || movie.original_name || movie.title}
              />
          ))
        }
      </div>
    </div>
  )
}

// 
