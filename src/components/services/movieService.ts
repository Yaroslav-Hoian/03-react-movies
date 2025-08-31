import axios from "axios";

const myKey = import.meta.env.VITE_TMDB_TOKEN;
const baseUrl = "https://api.themoviedb.org/3/search/movie";

async function searhcMovie(query: string) {
  const request = await axios.get(baseUrl, {
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

export default searhcMovie;
