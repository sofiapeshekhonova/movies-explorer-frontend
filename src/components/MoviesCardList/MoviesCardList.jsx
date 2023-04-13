import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.scss";
import mock from "../../utils/mock";

function MoviesCardList() {

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__container">
          <ul className="movies-card-list__list">
            {mock.map((film) => (
              <MoviesCard key={film.id} film={film} />
            ))}
          </ul>
      </div>
    </section>
  );
}

export default MoviesCardList;