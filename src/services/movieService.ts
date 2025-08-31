import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const baseUrl = "https://api.themoviedb.org/3/search/movie";

interface MovieHTTPResponce {
  results: Movie[];
}

async function fetchMovies(query: string): Promise<Movie[]> {
  const request = await axios.get<MovieHTTPResponce>(baseUrl, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  });

  return request.data.results;
}

export default fetchMovies;
