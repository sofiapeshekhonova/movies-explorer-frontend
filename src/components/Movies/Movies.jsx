import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader"
import { useState } from "react";

function Movies(
  {onOpenBurgerPopup, 
    isLoading, 
    movies, 
    handleSortClick, 
    activeCheckbox, 
    handleSearchMovies, 
    isActiveShowAllMovies, 
    allMoviesButton,
    setAllMoviesButton,
    errorMovies, 
    setSearchInputText,
    handleShowAllMovies}) {
  const [isLiked, setIsLiked] = useState(false)

  function handleLikeClick() {
    setIsLiked(!isLiked);
    console.log('click')
  }

  const cardLikeButtonClassName = `movies-card__like ${
    isLiked ? 'movies-card__like_active' : ''
  }`;
  
  return (
    <Layout className="header" title="Main" isLoggedIn page onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="movies">
        <SearchForm 
        setAllMoviesButton={setAllMoviesButton}
        handleSortClick={handleSortClick} 
        activeCheckbox={activeCheckbox} 
        setSearchInputText={setSearchInputText}
        handleSearchMovies={handleSearchMovies}/>
        {isLoading ? <Preloader /> : 
          <MoviesCardList
          errorMovies={errorMovies}
          isActiveShowAllMovies={isActiveShowAllMovies}
            className={cardLikeButtonClassName} 
            alt="кнопка: избранное" 
            likeClick={handleLikeClick} 
            movies={movies}
            buttonClassName={"movies-card-list__button movies-card-list__button_active button-hover"}
            allMoviesButton={allMoviesButton}
          /> 
        }
        </main>
    </Layout>
  );
}

export default Movies;