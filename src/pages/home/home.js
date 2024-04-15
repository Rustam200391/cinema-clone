import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetchGenres();
    fetchMovies("popular", setPopularMovies);
    fetchMovies("upcoming", setUpcomingMovies);
    fetchMovies("top_rated", setTopRatedMovies);
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovies = async (type, setMovies) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(`Error fetching ${type} movies:`, error);
    }
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filterMoviesByGenre = (movies) => {
    return selectedGenre
      ? movies.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre))
        )
      : movies;
  };

  const filteredPopularMovies = filterMoviesByGenre(popularMovies);
  const filteredUpcomingMovies = filterMoviesByGenre(upcomingMovies);
  const filteredTopRatedMovies = filterMoviesByGenre(topRatedMovies);

  return (
    <>
      <div className="poster">
        <div className="genre-filter-container">
          <select
            className="genre-filter"
            value={selectedGenre}
            onChange={handleGenreChange}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <h2>Popular Movies</h2>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {filteredPopularMovies.map((movie) => (
            <Link
              key={movie.id}
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.original_title}</div>
                <div className="posterImage__runtime">
                  {movie.release_date}
                  <span className="posterImage__rating">
                    {movie.vote_average} <i className="fas fa-star" />
                  </span>
                </div>
                <div className="posterImage__description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>

        <h2>Upcoming Movies</h2>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {filteredUpcomingMovies.map((movie) => (
            <Link
              key={movie.id}
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.original_title}</div>
                <div className="posterImage__runtime">
                  {movie.release_date}
                  <span className="posterImage__rating">
                    {movie.vote_average} <i className="fas fa-star" />
                  </span>
                </div>
                <div className="posterImage__description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>

        <h2>Top Rated Movies</h2>
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {filteredTopRatedMovies.map((movie) => (
            <Link
              key={movie.id}
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.original_title}</div>
                <div className="posterImage__runtime">
                  {movie.release_date}
                  <span className="posterImage__rating">
                    {movie.vote_average} <i className="fas fa-star" />
                  </span>
                </div>
                <div className="posterImage__description">{movie.overview}</div>
              </div>
            </Link>
          ))}
        </Carousel>

        <MovieList />
      </div>
    </>
  );
};

export default Home;
