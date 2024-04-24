import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FavoriteMovies.css";

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  const handleRemoveFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie.id !== movieId
    );
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favoriteMovies">
      <h2>Your Favorite Movies</h2>
      <div className="favoriteMovies__list">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <div key={movie.id} className="favoriteMovies__item">
              <Link to={`/movie/${movie.id}`} className="favoriteMovies__link">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.original_title}
                  className="favoriteMovies__poster"
                />
                <span className="favoriteMovies__title">
                  {movie.original_title}
                </span>
              </Link>
              <button onClick={() => handleRemoveFavorite(movie.id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No favorite movies added yet</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
