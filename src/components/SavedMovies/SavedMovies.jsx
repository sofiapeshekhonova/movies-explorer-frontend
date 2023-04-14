import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.scss";
import deleteButton from "../../images/delete.svg";
import Layout from "../Layout/Layout";

function SavedMovies({onOpenBurgerPopup}) {

  return (
    <Layout className="header" title="Main" isLoggedIn card onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList className="movies-card__dislike" alt="кнопка: избранное" src={deleteButton}/>
        </main>
    </Layout>
  );
}

export default SavedMovies;