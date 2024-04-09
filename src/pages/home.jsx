import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
//  стили, связанные
//  с компонентом Carousel из библиотеки react - responsive - carousel.
//  Эти стили определяют внешний вид и поведение карусели.
import { Carousel } from "react-responsive-carousel";
// Carousel - это компонент, который позволяет создавать адаптивные и красивые карусели изображений или контента.
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

// Определяем функциональный компонент Home
const Home = () => {
  // Определяем состояние popularMovies для хранения популярных фильмов
  const [popularMovies, setPopularMovies] = useState([]);

  // Эффект useEffect вызывается при загрузке компонента
  useEffect(() => {
    // Запрос к API для получения списка популярных фильмов
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json()) // Преобразование ответа в формат JSON
      .then((data) => setPopularMovies(data.results)); // Установка данных в состояние popularMovies
  }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только один раз при загрузке компонента

  // Возвращаем JSX разметку
  return (
    <>
      <div className="poster">
        {/* Компонент Carousel для отображения баннеров с популярными фильмами */}
        <Carousel
          showThumbs={false} // Отключаем отображение миниатюр под баннерами
          autoPlay={true} // Включаем автоматическое проигрывание баннеров
          transitionTime={3} // Устанавливаем время перехода между баннерами
          infiniteLoop={true} // Включаем бесконечную прокрутку баннеров
          showStatus={false} // Отключаем отображение статуса прокрутки баннеров
        >
          {/* Отображаем каждый популярный фильм в виде баннера */}
          {popularMovies.map((movie) => (
            /* создаем переменную movie и передаем ее в map,
            которая используется для отображения
             каждого элемента массива popularMovies в виде баннера */
            /* Здесь map перебирает каждый элемент массива popularMovies, 
            который содержит информацию о популярных фильмах.
             Внутри функции map, каждый элемент массива обозначается как movie,
              и используется для доступа к свойствам каждого отдельного фильма,
               таким как original_title, release_date, vote_average, overview и другие. */

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                {/* Выводим изображение баннера */}
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                  alt={movie ? movie.original_title : "Movie backdrop"}
                />
                {/* backdrop_path является частью объекта, представляющего
                информацию о фильме. В контексте использования, скорее всего,
                это поле содержит путь к изображению, которое используется как
                фоновый рисунок (backdrop) для фильма */}
              </div>
              <div className="posterImage__overlay">
                {/* Отображаем заголовок фильма */}
                <div className="posterImage__title">
                  {movie ? movie.original_title : ""}
                </div>
                {/* Отображаем дату выхода и рейтинг фильма */}
                <div className="posterImage__runtime">
                  {movie ? movie.release_date : ""}
                  {/* Отображаем рейтинг фильма с иконкой звезды */}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                {/* Отображаем описание фильма */}
                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        {/* Компонент MovieList для отображения списка фильмов */}
        <MovieList />
      </div>
    </>
  );
};

// Экспортируем компонент Home для использования в других частях приложения
export default Home;
