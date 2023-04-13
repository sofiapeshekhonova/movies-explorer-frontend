import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.scss";
import deleteButton from "../../images/delete.svg";

function SavedMovies() {

  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList className="movies-card__dislike" alt="кнопка: избранное" src={deleteButton}/>
    </section>
  );
}

export default SavedMovies;