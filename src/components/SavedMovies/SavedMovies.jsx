import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader";
import mock from '../../utils/mock'
function SavedMovies(props) {
  const {onOpenBurgerPopup, 
    isLoading, 
    movies, 
    isActiveShowAllMovies, 
    allMoviesButton,
    errorMovies, 
    setCheckbox,
    setFormValue,
    handleSaveMovie,
  } = props
  return (
    <Layout className="header" title="Main" isLoggedIn card onOpenBurgerPopup={onOpenBurgerPopup} page>
      <main className="saved-movies">
        <SearchForm props={props}/>
        {isLoading ? <Preloader /> : 
          <MoviesCardList 
          pageSavedMovie={true}
          movies={mock}
          buttonClassName={"movies-card-list__button"}
          />
        }
        </main>
    </Layout>
  );
}

export default SavedMovies;