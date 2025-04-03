import React, { useEffect, useState } from "react";
import { useAppContext } from "./Appcontext";
import "./Row.css";

function Row({ title,genreId, fetchUrl }) {
  const {  setSelectedMovie, searchTerm, addToCart } = useAppContext();
  const { dispatch } = useAppContext();
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    // If a genreId is passed, construct the dynamic URL
    const url = genreId
      ? fetchUrl(genreId) // If genreId exists, use fetchMoviesByGenre
      : fetchUrl;

  // Fetch movies when the component loads
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results); 
        setFilteredMovies(data.results);// Update state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [fetchUrl]); // Dependency array ensures fetchData runs when fetchUrl changes

  useEffect(() => {
    if (!searchTerm) {
      setFilteredMovies(movies); // Reset to all movies if searchTerm is empty
    } else {
      const filtered = movies.filter((movie) =>
        (movie.title || movie.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered); // Update filteredMovies based on search
    }
  }, [searchTerm, movies]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="row__posterContainer">
          <img
            className="row__poster"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title || movie.name}
            onClick={() => setSelectedMovie(movie)}
          />
          <button
            className="row__addButton"
            onClick={() =>
              dispatch({ type: "ADD_MOVIE", payload: movie }) 
            }
          >
            Add to Cart
          </button>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
