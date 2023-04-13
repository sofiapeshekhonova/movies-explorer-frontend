import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.scss";
import mock from "../../utils/mock";

function MoviesCardList(props) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {mock.map((film) => (
          <MoviesCard key={film.id} film={film} props={props}/>
        ))}
      </ul>
      <button
        className="movies-card-list__button"
        aria-label="Кнопка: больше фильмов"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
