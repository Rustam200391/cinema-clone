import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

// Определяем функциональный компонент Movie
const Movie = () => {
  // Определяем состояние currentMovieDetail для хранения информации о текущем фильме
  const [currentMovieDetail, setMovie] = useState();
  // Используем хук useParams для извлечения параметра id из URL
  const { id } = useParams();

  // Эффект useEffect вызывается при загрузке компонента
  useEffect(() => {
    // Функция getData отправляет запрос к API для получения информации о фильме с определенным id
    getData();
    // Прокручиваем окно браузера вверх
    window.scrollTo(0, 0);
  }, []);
  // если функция  getData() будет изменяться между вызовами и не зависит от изменений состояния или пропсов то ее нужно включить в массив,который передается вторым параметром useEffect,не изменяется

  // Функция getData отправляет запрос к API для получения информации о фильме
  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json()) // Преобразуем ответ в формат JSON
      .then((data) => setMovie(data)); // Устанавливаем полученные данные в состояние currentMovieDetail
  };

  // Возвращаем JSX разметку
  return (
    <div className="movie">
      {/* Разметка деталей фильма */}
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
        {/* Левая часть деталей фильма */}
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt=""
            />
          </div>
        </div>
        {/* Правая часть деталей фильма */}
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            {/* Заголовок фильма */}
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            {/* Слоган фильма */}
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            {/* Рейтинг фильма */}
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
              {/* Количество голосов */}
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            {/* Продолжительность фильма */}
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            {/* Дата выхода фильма */}
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            {/* Жанры фильма */}
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          {/* Описание фильма */}
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      {/* Ссылки на полезные ресурсы */}
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {/* Ссылка на домашнюю страницу фильма */}
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a
            href={currentMovieDetail.homepage}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
                {/* библиотеки Font Awesome Solid */}
              </span>
            </p>
          </a>
        )}
        {/* Ссылка на страницу фильма в IMDb */}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      {/* Производственные компании, участвовавшие в создании фильма */}
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  {/* Логотип компании */}
                  <img
                    className="movie__productionComapany" // Применяемый класс для управления стилями элемента
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    } // Путь к изображению логотипа компании
                    alt="" // Альтернативный текст для изображения (пустая строка в данном случае)
                  />
                  {/* Название компании */}
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

// Экспортируем компонент Movie для использования в других частях приложения
export default Movie;
