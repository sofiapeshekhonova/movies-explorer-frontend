import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const {onOpenBurgerPopup, isLoading} = props;

  return (
    <Layout className="header" isLoggedIn card onOpenBurgerPopup={onOpenBurgerPopup} page>
      <main className="saved-movies">
        <SearchForm props={props} pageSavedMovie={true} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList props={props} pageSavedMovie={true} />
        )}
      </main>
    </Layout>
  );
}

export default SavedMovies;
