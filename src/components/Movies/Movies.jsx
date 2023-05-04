import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  const {onOpenBurgerPopup, isLoading} = props;

  return (
    <Layout className="header" isLoggedIn page onOpenBurgerPopup={onOpenBurgerPopup} >
      <main className="movies">
        <SearchForm props={props} pageSavedMovie={false}/>
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList pageSavedMovie={false} props={props} />
        )}
      </main>
    </Layout>
  );
}

export default Movies;
