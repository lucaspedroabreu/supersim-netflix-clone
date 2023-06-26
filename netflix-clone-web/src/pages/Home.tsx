import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { axiosRequestList } from '../utils/Requests'
import { GenreMovieRow } from '../components/GenreMovieRow'

function Home() {
  const personalMovies = false

  return (
    <>
      <Navbar />
      
      <Hero />

      {/* TODO link springboot api to fetch personal movies */}
      {personalMovies && <GenreMovieRow title="My personal movies" fetchURL={"https://ADD"} isFeaturedRow />}

      <GenreMovieRow title="NETFLIX ORIGINALS" fetchURL={axiosRequestList.fetchNetflixOriginals} isFeaturedRow />
      <GenreMovieRow title="Trending now" fetchURL={axiosRequestList.fetchTranding} />
      <GenreMovieRow title="Top Rated" fetchURL={axiosRequestList.fetchTopRated} />
      <GenreMovieRow title="Action Movies" fetchURL={axiosRequestList.fetchActionMovies} />
      <GenreMovieRow title="Comedy Movies" fetchURL={axiosRequestList.fetchComedyMovies} />
      <GenreMovieRow title="Horror Movies" fetchURL={axiosRequestList.fetchHorrorMovies} />
      <GenreMovieRow title="Romance Movies" fetchURL={axiosRequestList.fetchRomanceMovies} />
      <GenreMovieRow title="Documentaries" fetchURL={axiosRequestList.fetchDocumentaries} />
      <div className="screen--fadeBottom w-screen fixed bottom-0" />
    </>
  )
}

export default Home