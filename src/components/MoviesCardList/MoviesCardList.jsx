import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.scss";
import mock from "../../utils/mock";
import { useEffect, useState } from "react";

function MoviesCardList(props) {

  const [countCard, setCountCard] = useState(12)

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
    if (window.innerWidth < 376) {
      setCountCard(5)
    } else if (window.innerWidth < 898) {
      setCountCard(8)
    } else {
      setCountCard(12)
    }
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__list">
        {mock.map((film, index) => {
          if (index < countCard) {
            return (
              <MoviesCard key={film.id} film={film} props={props}/>
            )
          } else {
            return ('');
          }        
        })}
      </ul>
      <button
        className="movies-card-list__button"
        aria-label="Кнопка: больше фильмов"
        type="button"
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
