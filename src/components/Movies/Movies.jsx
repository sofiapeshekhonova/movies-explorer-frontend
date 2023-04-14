// компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
// SearchForm — форма поиска, куда пользователь будет вводить запрос. 
// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import like from "../../images/like.svg";
import Layout from "../Layout/Layout";

function Movies() {

  return (
    <Layout className="header" title="Main" isLoggedIn>
      <main className="movies">
        <SearchForm />
        <MoviesCardList className="movies-card__like" alt="кнопка: избранное" src={like}/>
        </main>
    </Layout>
  );
}

export default Movies;