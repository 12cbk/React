import React, { useEffect, useState } from "react";
import "./Banner.css";
import { requests } from "./Api";
import { useAppContext } from "./Appcontext" // Import the requests to access API endpoints

function Banner() {
  const [movie, setMovie] = useState(); // State to store the featured movie

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(requests.fetchnetflixOriginals); // Fetch Netflix Originals
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length); // Pick a random movie
        setMovie(data.results[randomIndex]); // Set the selected movie in state
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }

    fetchData();
  }, []); // Run only once when the component mounts

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

// Helper function to truncate long descriptions
function truncate(string, n) {
  return string?.length > n ? string.substr(0, n - 1) + "…" : string;
}

export default Banner;
