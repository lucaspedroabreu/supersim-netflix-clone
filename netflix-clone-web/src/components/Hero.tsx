import { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios'
import '../utils/string.extentions'
import { axiosRequestList } from '../utils/Requests'
import { Movie } from '../types/movie'

export function Hero() {
  const [bannerMovie, setBannerMovie] = useState({} as Movie)

  useEffect(() => {
    async function fetchMovieData() {
      const request = await axiosInstance.get(axiosRequestList.fetchNetflixOriginals)
      const movieArray = request.data.results
      const randomIndex = Math.floor(Math.random() * movieArray.length - 1)
      const randomMovie = movieArray[randomIndex]

      setBannerMovie(randomMovie)
    }

    fetchMovieData()
  }, [])
  
  // function truncateToLength(n = 150, text: string) {
  //   return text?.length > n ? text.substring(0, n) : text 
  // }

  return (
    <section className={`hero bg-cover relative`} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path})`}}>
      <div className='hero__contents z-50'>
        <h1 className="hero__title">{bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}</h1>
        <div className="hero__buttons">
          <button className='hero__button'>Play</button>
          <button className='hero__button'>My List</button>
        </div>
        <h2 className='hero__description'>
          <div className='w-[50ch]'>
            {bannerMovie && bannerMovie.overview?.truncateToLength(200)}
          </div>
        </h2>
      </div>
      <div className="hero--fadeBottom w-screen absolute bottom-0" />
    </section>
  )
}