import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader";
function SavedMovies(props) {
  const {onOpenBurgerPopup, 
    isLoading, 
    movies, 
    handleDeleteMovies,
    errorSaveMovies, 
    setCheckbox,
    setFormValue,
    savedMovies
  } = props

  return (
    <Layout className="header" title="Main" isLoggedIn card onOpenBurgerPopup={onOpenBurgerPopup} page>
      <main className="saved-movies">
        <SearchForm props={props} pageSavedMovie={true}  />
        {isLoading ? <Preloader /> : 
          <MoviesCardList 
          errorSaveMovies={errorSaveMovies}
          setCheckbox={setCheckbox}
          setFormValue={setFormValue}
          pageSavedMovie={true}
          savedMovies={savedMovies}
          handleDeleteMovies={handleDeleteMovies}
          movies={movies}
          buttonClassName={"movies-card-list__button"}
          />
        }
        </main>
    </Layout>
  );
}

export default SavedMovies;