import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      const movieResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const movieData = await movieResponse.json();
      setMovie(movieData);

      const creditsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const creditsData = await creditsResponse.json();

      const castData = creditsData.cast.slice(0, 5);
      setCast(castData);

      const directorData = creditsData.crew.find(
        (person) => person.job === "Director"
      );
      setDirector(directorData);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const handleAddToFavorites = () => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    if (!storedFavorites.some((fav) => fav.id === currentMovieDetail.id)) {
      const updatedFavorites = [...storedFavorites, currentMovieDetail];
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt=""
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt=""
            />
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__name">
            {currentMovieDetail ? currentMovieDetail.original_title : ""}
          </div>
          <div className="movie__tagline">
            {currentMovieDetail ? currentMovieDetail.tagline : ""}
          </div>
          <div className="movie__rating">
            {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
            <i className="fas fa-star" />
            <span className="movie__voteCount">
              {currentMovieDetail
                ? "(" + currentMovieDetail.vote_count + ") votes"
                : ""}
            </span>
          </div>
          <div className="movie__runtime">
            {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
          </div>
          <div className="movie__releaseDate">
            {currentMovieDetail
              ? "Release date: " + currentMovieDetail.release_date
              : ""}
          </div>
          <div className="movie__genres">
            {currentMovieDetail && currentMovieDetail.genres
              ? currentMovieDetail.genres.map((genre) => (
                  <span key={genre.id} className="movie__genre">
                    {genre.name}
                  </span>
                ))
              : ""}
          </div>
          <div className="movie__overview">
            {currentMovieDetail ? currentMovieDetail.overview : ""}
          </div>
          <div className="movie__links">
            <div className="movie__heading">Useful Links</div>
            {currentMovieDetail && currentMovieDetail.homepage && (
              <a
                href={currentMovieDetail.homepage}
                target="_blank"
                rel="noreferrer"
              >
                <span className="movie__homeButton movie__Button">
                  Homepage <i className="newTab fas fa-external-link-alt"></i>
                </span>
              </a>
            )}
            {currentMovieDetail && currentMovieDetail.imdb_id && (
              <a
                href={
                  "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                }
                target="_blank"
                rel="noreferrer"
              >
                <span className="movie__imdbButton movie__Button">
                  IMDb<i className="newTab fas fa-external-link-alt"></i>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="movie__credits">
        <div className="movie__heading">Cast</div>
        <div className="movie__cast">
          {cast.map((actor) => (
            <div key={actor.id} className="movie__actor">
              <img
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt={actor.name}
                className="movie__actorImage"
              />
              <p className="movie__actorName">{actor.name}</p>
            </div>
          ))}
        </div>
        <div className="movie__heading">Director</div>
        <div className="movie__director">
          <img
            src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
            alt={director.name}
            className="movie__directorImage"
          />
          <p className="movie__directorName">{director.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
