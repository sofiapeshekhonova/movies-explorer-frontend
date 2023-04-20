import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.scss";
import {useEffect, useState} from "react";
import MoviesEmpty from "../MoviesEmpty/MoviesEmpty";

function MoviesCardList(props) {
  const {
    movies,
    buttonClassName,
    isActiveShowAllMovies,
    allMoviesButton,
    errorMovies,
  } = props;
  const [countCard, setCountCard] = useState(12);
  const buttonAllMoviesClassName = `movies-card-list__button movies-card-list__button-all ${
    !allMoviesButton && "movies-card-list__button-all_disabled"
  }`;

  const buttonAllMovies = `movies-card-list__button movies-card-list__button-all`;

  useEffect(() => {
    let timer;
    const handleChangeWidthScreenTimer = () => {
      timer = setTimeout(handleChangeWidthScreen, 300);
    };
    window.addEventListener("resize", handleChangeWidthScreenTimer);
    return () => {
      window.removeEventListener("resize", handleChangeWidthScreenTimer);
      clearTimeout(timer);
    };
  });

  const handleChangeWidthScreen = () => {
    if (window.innerWidth < 377) {
      setCountCard(5);
    } else if (window.innerWidth < 898) {
      setCountCard(8);
    } else {
      setCountCard(12);
    }
  };

  const handleMoreFilmsShow = () => {
    if (movies.length !== 0) {
      if (window.innerWidth > 897) setCountCard(countCard + 3);
      else {
        setCountCard(countCard + 2);
      }
    }
  };

  function handleShowAllMovies() {
    isActiveShowAllMovies(true);
  }
  //   const handleChangeWidthScreen = () => {
  //     if (window.innerWidth < 377) {
  //       visibleMovies(5)
  //     } else if (window.innerWidth < 898) {
  //       visibleMovies(8)
  //     } else {
  //       visibleMovies(12)
  //     }
  //   }

  //   const handleMoreFilmsShow = () => {
  //     if (movies.length !== 0) {
  //       if (window.innerWidth > 897)
  //       setCountCard(countCard + 100)
  //       // else if (window.innerWidth > 494) {
  //       //   setCountCard(countCard + 2)
  //       // }
  //       else {
  //         setCountCard(countCard + 2)
  //       }
  //     }
  //   }

  //   function visibleMovies(moviesCount) {
  //     setCountCard(moviesCount)
  //     let cards = [];
  //     movies.forEach((movie, index) => {
  //       console.log(movie)
  //       if(moviesCount > index) {
  //         cards.push(movie);
  //       }
  //     });
  //     setVisibleCards(cards);
  //   }

  return (
    <section className="movies-card-list">
      {!errorMovies ? <>
        {movies.length !== 0 ? 
          <><ul className="movies-card-list__list">
              {movies.slice(0, countCard).map((film, index) => {
                return ((index < countCard) ? <MoviesCard key={film.id} film={film} props={props} /> : "Фильмы не найдены")
              })}
            </ul>
            {movies.length > countCard && (
              <button
                className={buttonClassName}
                aria-label="Кнопка: больше фильмов"
                type="button"
                onClick={handleMoreFilmsShow}>Ещё</button>
            )}
            <button
              className={buttonAllMoviesClassName}
              aria-label="Кнопка: все фильмы"
              type="button"
              onClick={handleShowAllMovies}>Все фильмы</button>
          </> : <MoviesEmpty text={"Начните поиск"} className={buttonAllMovies} onClick={handleShowAllMovies}/>
        }
      </> : <MoviesEmpty text={"Фильмы не найдены"} className={buttonAllMoviesClassName} onClick={handleShowAllMovies}/>

      }
    </section>
  );
}

export default MoviesCardList;
