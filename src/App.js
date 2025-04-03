import React, { useState } from "react";
import "./App.css";
import Row from "./Components/Row";

import Banner from "./Components/Banner";
import Header from "./Components/Header";
import Cart from "./Components/Cart";
import { requests, genres } from "./Components/Api";
import { useAppContext } from "./Components/Appcontext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  const { selectedMovie, setSelectedMovie } = useAppContext();
  
  
  

  return (
    <Router>
      <Header />
      <Routes>
        
        <Route
          path="/home"
          element={
            <div>
              <Banner />
              <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
              <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
              <Row title="Action Movies" genreId={genres.Action} fetchUrl={requests.fetchMoviesByGenre} />
              <Row title="Comedy Movies" genreId={genres.Comedy} fetchUrl={requests.fetchMoviesByGenre} />
              <Row title="Horror Movies" genreId={genres.Horror} fetchUrl={requests.fetchMoviesByGenre} />
              <Row title="Romance Movies" genreId={genres.Romance} fetchUrl={requests.fetchMoviesByGenre} />
              <Row title="Documentaries" genreId={genres.Documentaries} fetchUrl={requests.fetchMoviesByGenre} />
             
              {selectedMovie && (
                <div className="movie-details">
                  <h1>{selectedMovie.title || selectedMovie.name}</h1>
                  <p>{selectedMovie.overview}</p>
                  <button onClick={() => setSelectedMovie(null)}>Close</button>
                </div>
              )}
            </div>
          }
        />
        
        <Route path="/car" element={<Cart />} />
      </Routes>
    </Router>
  );
  
}

export default App;
