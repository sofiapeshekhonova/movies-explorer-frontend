import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import like from "../../images/like.svg";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader"

function Movies({onOpenBurgerPopup, isLoading}) {

  return (
    <Layout className="header" title="Main" isLoggedIn page onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="movies">
        <SearchForm />
        {isLoading ? <Preloader /> : 
          <MoviesCardList className="movies-card__like" alt="кнопка: избранное" src={like}/>}
        </main>
    </Layout>
  );
}

export default Movies;