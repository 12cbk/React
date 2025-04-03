
const BASE_URL = "https://api.themoviedb.org/3";


const API_KEY = "3edfb7300574f006cee4ec91ebd20123"; 


const genres = {
  Action: 28,
  Comedy: 35,
  Horror: 27,
  Romance: 10749,
  Documentaries: 99,
};


const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,

  fetchMoviesByGenre: (genreId) =>
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`,

  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchnetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,


};

export { requests, genres };
