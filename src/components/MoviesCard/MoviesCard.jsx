import { useEffect, useState } from "react";
import "./MoviesCard.scss";

function MoviesCard({ film, props }) {
  const { nameRU, trailerLink, duration, image, _moviId } = film;
  const {handleSaveMovie, pageSavedMovie, movies } = props;
//console.log(film)
  const hours = Math.trunc(duration / 60);
  const minutes = Math.trunc(duration - hours * 60);

  const [isLiked, setIsLiked] = useState(false)
  const [movieId, setMovieId] = useState('');

  useEffect(() => { 
      movies.map((item) => {
         //console.log(item)
          if (item.movieId === _moviId) {
            //console.log(item)
              setMovieId(item._id);
              //setButtonValue(false);
          } else if (item.movieId === _moviId) {
              setMovieId(item._id);
          }
      })
  }, [movies])

  function handleLikeClick() {
    if(pageSavedMovie) {
      console.log('удалить')
    } else {
      setIsLiked(!isLiked);
      handleSaveMovie(film, setMovieId)
    } 
  }

  const imageUrl = pageSavedMovie ? image :`https://api.nomoreparties.co${image.url}`
  const buttonClassName = pageSavedMovie ? 
   'movies-card__dislike' : `movies-card__like ${isLiked && 'movies-card__like_active'}`
  
  
  return (
    <li className="movies-card">
      <a className="movies-card__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" alt="постер фильма" src={imageUrl}/>
      </a>
        <div className="movies-card__container">
          <div>
          <div className="movies-card__info">
            <h4 className="movies-card__title">{nameRU}</h4>
            <button className={buttonClassName} alt={"кнопка добавить в избранное или удалить"} onClick={handleLikeClick}/>
          </div>
          <p className="movies-card__time">{hours}ч {minutes}м</p>
          </div>
      </div>  
    </li>
  );
}

export default MoviesCard;