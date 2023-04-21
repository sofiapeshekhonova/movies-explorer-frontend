import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader"
import { useState } from "react";

function Movies(props) {
  const {onOpenBurgerPopup, 
    isLoading, 
    movies, 
    isActiveShowAllMovies, 
    allMoviesButton,
    errorMovies, 
    setCheckbox,
    setFormValue,
  } = props

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
          props={props}/>
        {isLoading ? <Preloader /> : 
          <MoviesCardList
            setCheckbox={setCheckbox}
            errorMovies={errorMovies}
            isActiveShowAllMovies={isActiveShowAllMovies}
            allMoviesButton={allMoviesButton}
            className={cardLikeButtonClassName} 
            alt="кнопка: избранное" 
            likeClick={handleLikeClick} 
            movies={movies}
            buttonClassName={"movies-card-list__button movies-card-list__button_active button-hover"}
            setFormValue={setFormValue}
          /> 
        }
        </main>
    </Layout>
  );
}

export default Movies;