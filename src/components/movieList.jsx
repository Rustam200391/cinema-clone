import React, { useEffect, useState } from "react"; // Импортируем библиотеку React и хуки useEffect, useState для работы с состоянием компонента
import "./movieList.css"; // Импортируем файл стилей для компонента MovieList
import { useParams } from "react-router-dom"; // Импортируем хук useParams из библиотеки react-router-dom для получения параметров маршрута
import Cards from "../card/card"; // Импортируем компонент Cards для отображения карточек фильмов

const MovieList = () => {
  const [movieList, setMovieList] = useState([]); // Определяем состояние movieList для хранения списка фильмов
  const { type } = useParams(); // Получаем значение параметра маршрута с именем 'type' с помощью хука useParams и сохраняем его в переменной 'type'

  useEffect(() => {
    getData(); // Вызываем функцию getData при загрузке компонента, чтобы загрузить список фильмов
  }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только один раз при загрузке компонента

  useEffect(() => {
    getData(); // Вызываем функцию getData при изменении параметра маршрута 'type', чтобы загрузить соответствующий список фильмов
  }, [type]); // Массив зависимостей содержит переменную 'type', поэтому эффект будет выполнен при каждом изменении 'type'

  const getData = () => {
    // Функция getData отправляет запрос к API для получения списка фильмов
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key= d1152af9757a55d135e39e8e140015f6&language=en-US`
    )
      .then((res) => res.json()) // Преобразуем ответ в формат JSON
      .then((data) => setMovieList(data.results)); // Обновляем состояние movieList данными о фильмах из ответа
  };

  return (
    <div className="movie__list">
      {" "}
      {/* Обертка для компонента MovieList */}
      <h2 className="list__title">
        {(type ? type : "POPULAR").toUpperCase()}
      </h2>{" "}
      {/* Выводим заголовок списка фильмов, преобразовывая значение параметра 'type' к верхнему регистру */}
      <div className="list__cards">
        {" "}
        {/* Обертка для карточек фильмов */}
        {movieList.map((movie) => (
          <Cards movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList; // Экспортируем компонент MovieList для использования в других частях приложения

// 4e44d9029b1270a757cddc766a1bcb63
