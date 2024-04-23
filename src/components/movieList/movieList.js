import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");

  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type, yearFilter, ratingFilter]);

  const getData = () => {
    let url;

    switch (type) {
      case "top_rated":
        url = `https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
        break;
      case "upcoming":
        url = `https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
        break;
      default:
        url = `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let filteredMovies = data.results;

        if (yearFilter) {
          filteredMovies = filteredMovies.filter(
            (movie) =>
              new Date(movie.release_date).getFullYear() ===
              parseInt(yearFilter)
          );
        }

        if (ratingFilter) {
          filteredMovies = filteredMovies.filter(
            (movie) => movie.vote_average >= parseFloat(ratingFilter)
          );
        }

        setMovieList(filteredMovies);
      });
  };

  const handleYearChange = (event) => {
    setYearFilter(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingFilter(event.target.value);
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">
        {(type ? type.toUpperCase() : "POPULAR").toUpperCase()}
      </h2>

      <div className="filters">
        <label>
          Year:
          <input type="text" value={yearFilter} onChange={handleYearChange} />
        </label>

        <label>
          Rating:
          <input
            type="text"
            value={ratingFilter}
            onChange={handleRatingChange}
          />
        </label>
      </div>

      <div className="list__cards">
        {movieList && movieList.length > 0 ? (
          movieList.map((movie) => <Cards key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
