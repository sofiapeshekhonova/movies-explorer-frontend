import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader"

function Movies(props) {
  const {onOpenBurgerPopup, 
    isLoading, 
    movies, 
    isActiveShowAllMovies, 
    allMoviesButton,
    errorMovies, 
    setCheckbox,
    setFormValue,
    handleSaveMovie,
    savedMovies,
    handleDeleteMovies,
  } = props

  return (
    <Layout className="header" title="Main" isLoggedIn page onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="movies">
        <SearchForm props={props}/>
        {isLoading ? <Preloader /> : 
          <MoviesCardList
            pageSavedMovie={false}
            setCheckbox={setCheckbox}
            handleSaveMovie={handleSaveMovie}
            errorMovies={errorMovies}
            isActiveShowAllMovies={isActiveShowAllMovies}
            allMoviesButton={allMoviesButton}
            movies={movies}
            buttonClassName={"movies-card-list__button movies-card-list__button_active button-hover"}
            setFormValue={setFormValue}
            savedMovies={savedMovies}
            handleDeleteMovies={handleDeleteMovies}
          /> 
        }
        </main>
    </Layout>
  );
}

export default Movies;