import React from "react"; // Импорт библиотеки React для создания компонентов
import "./Header.css"; // Импорт файла стилей для компонента Header
import { Link } from "react-router-dom"; // Импорт компонента Link из react-router-dom для создания ссылок

const Header = () => {
  // Определение функционального компонента Header
  return (
    // Возвращаем JSX разметку компонента
    <div className="header">
      {" "}
      {/* Обертка для верхней части страницы - заголовка */}
      <div className="headerLeft">
        {" "}
        {/* Контейнер для элементов слева в заголовке */}
        <Link to="/">
          {" "}
          {/* Ссылка на главную страницу */}
          <img
            className="header__icon" // Класс для иконки в заголовке
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" // Ссылка на изображение логотипа IMDb
            alt="" // Альтернативный текст для изображения, в данном случае пустая строка, так как изображение представляет собой логотип и не требует описания
          />
        </Link>
        {/* Ссылки на разделы фильмов с указанием соответствующего маршрута */}
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span> {/* Текст ссылки на популярные фильмы */}
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>{" "}
          {/* Текст ссылки на фильмы с высоким рейтингом */}
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span> {/* Текст ссылки на предстоящие фильмы */}
        </Link>
      </div>
    </div>
  );
};

export default Header; // Экспорт компонента Header для использования в других частях приложения
