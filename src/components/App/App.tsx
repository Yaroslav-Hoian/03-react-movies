import css from "./App.module.css";
import { useEffect, useState } from "react";
import fetchMovies from "../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function App() {
  const [movieWordSearch, setMovieWordSearch] = useState<string>("");
  const [isSuccessSearch, setIsSuccessSearch] = useState<boolean>(true);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moviesSearch, setMoviesSearch] = useState<Movie[]>([]);
  const [movieSelected, setMovieSelected] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData(query: string) {
      try {
        setMoviesSearch([]);
        setLoader(true);

        const results = await fetchMovies(query);
        if (results.length === 0) {
          return toast.error("No movies found for your request.");
        }
        setMoviesSearch(results);
        setIsSuccessSearch(true);
      } catch {
        setIsSuccessSearch(false);
      } finally {
        setLoader(false);
      }
    }
    if (movieWordSearch.trim() !== "") {
      fetchData(movieWordSearch);
    }
  }, [movieWordSearch]);

  const openModal = (movie: Movie) => {
    setMovieSelected(movie);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setMovieSelected(null);
  };

  const handleSearch = (query: string) => {
    setMovieWordSearch(query);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {isLoader && <Loader />}
      {isSuccessSearch ? (
        <MovieGrid onSelect={openModal} movies={moviesSearch} />
      ) : (
        <ErrorMessage />
      )}
      {isModalOpen && movieSelected && (
        <MovieModal onClose={closeModal} movie={movieSelected} />
      )}
    </div>
  );
}

export default App;
