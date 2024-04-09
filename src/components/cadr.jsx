import React, { useEffect, useState } from "react"; // Импорт библиотеки React и хуков useEffect, useState для создания компонентов и работы с состоянием
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // Импорт компонентов Skeleton и SkeletonTheme из библиотеки react-loading-skeleton для создания заглушек контента
import "./card.css"; // Импорт файла стилей для компонента Cards
import { Link } from "react-router-dom"; // Импорт компонента Link из react-router-dom для создания ссылок

const Cards = ({ movie }) => {
  // Определение функционального компонента Cards, принимающего объект movie в качестве аргумента
  const [isLoading, setIsLoading] = useState(true); // Определение состояния isLoading с помощью хука useState для отслеживания состояния загрузки

  useEffect(() => {
    // Эффект useEffect вызывается при загрузке компонента
    setTimeout(() => {
      // Задержка перед сменой состояния isLoading на false для имитации загрузки
      setIsLoading(false); // Установка состояния isLoading в значение false
    }, 1500); // Задержка в 1.5 секунды
  }, []); // Пустой массив зависимостей гарантирует выполнение эффекта только один раз при загрузке компонента

  return (
    <>
      {" "}
      {/* Фрагмент для возврата нескольких элементов JSX без оборачивания в дополнительный элемент */}
      {isLoading ? ( // Условное отображение содержимого в зависимости от состояния isLoading
        <div className="cards">
          {" "}
          {/* Элемент-контейнер для карточки с заглушкой */}
          <SkeletonTheme color="#202020" highlightColor="#444">
            {" "}
            {/* Установка цвета для заглушки */}
            <Skeleton height={300} duration={2} />{" "}
            {/* Заглушка в виде скелета с высотой 300 пикселей */}
          </SkeletonTheme>
        </div>
      ) : (
        <Link // Ссылка для перехода к подробной информации о фильме
          to={`/movie/${movie.id}`} // Маршрут к странице с информацией о фильме с использованием идентификатора фильма
          style={{ textDecoration: "none", color: "white" }} // Инлайн-стили для удаления подчеркивания ссылки и установки цвета текста
        >
          <div className="cards">
            {" "}
            {/* Элемент-контейнер для карточки с информацией о фильме */}
            <img // Изображение постера фильма
              className="cards__img" // Класс для изображения
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`} // URL изображения, составленный на основе пути до постера фильма
              alt=""
            />
            <div className="cards__overlay">
              {" "}
              {/* Подложка с дополнительной информацией о фильме */}
              <div className="card__title">
                {" "}
                {/* Название фильма */}
                {movie ? movie.original_title : ""}{" "}
                {/* Оригинальное название фильма */}
              </div>
              <div className="card__runtime">
                {" "}
                {/* Длительность и рейтинг фильма */}
                {movie ? movie.release_date : ""} {/* Дата релиза фильма */}
                <span className="card__rating">
                  {" "}
                  {/* Рейтинг фильма */}
                  {movie ? movie.vote_average : ""}{" "}
                  {/* Средний рейтинг фильма */}
                  <i className="fas fa-star" />{" "}
                  {/* Иконка звезды для обозначения рейтинга */}
                </span>
              </div>
              <div className="card__description">
                {" "}
                {/* Описание фильма */}
                {movie ? movie.overview.slice(0, 118) + "..." : ""}{" "}
                {/* Сокращенное описание фильма (первые 118 символов) с многоточием в конце */}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards; // Экспорт компонента Cards для использования в других частях приложения
