import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import Layout from "../Layout/Layout";
import Preloader from "../Preloader/Preloader"
import { useState } from "react";

function Movies({onOpenBurgerPopup, isLoading, movies}) {
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
        <SearchForm />
        {isLoading ? <Preloader /> : 
          <MoviesCardList className={cardLikeButtonClassName} alt="кнопка: избранное" likeClick={handleLikeClick} movies={movies}/>}
        </main>
    </Layout>
  );
}

export default Movies;