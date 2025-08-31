import { useState } from "react";
import searhcMovie from "../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [moviesSearch, setMoviesSearch] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hendleSearch = async (query: string) => {
    const results = await searhcMovie(query);
    setMoviesSearch(results);
  };

  const hendleSelect = (movie: Movie) => {
    openModal();
    setMovie(movie);
    console.log("movie", movie);
  };

  return (
    <div>
      <SearchBar onSubmit={hendleSearch} />
      <Toaster />
      <MovieGrid onSelect={hendleSelect} movies={moviesSearch} />
      {isModalOpen && <MovieModal onClose={closeModal} movie={movie} />}
    </div>
  );
}

export default App;
