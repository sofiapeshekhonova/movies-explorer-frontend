import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import like from "../../images/like.svg";
import Layout from "../Layout/Layout";

function Movies({onOpenBurgerPopup}) {

  return (
    <Layout className="header" title="Main" isLoggedIn page onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="movies">
        <SearchForm />
        <MoviesCardList className="movies-card__like" alt="кнопка: избранное" src={like}/>
        </main>
    </Layout>
  );
}

export default Movies;