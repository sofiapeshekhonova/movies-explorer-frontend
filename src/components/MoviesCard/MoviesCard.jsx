import "./MoviesCard.scss";

function MoviesCard({ film, props }) {
  const { nameRU, trailerLink, duration, image } = film;
  const {className, alt, likeClick } = props;

  const hours = Math.trunc(duration / 60);
  const minutes = Math.trunc(duration - hours * 60);

  return (
    <li className="movies-card">
      <a className="movies-card__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" alt="постер фильма" src={` https://api.nomoreparties.co${image.url}`}/>
      </a>
        <div className="movies-card__container">
          <div>
          <div className="movies-card__info">
            <h4 className="movies-card__title">{nameRU}</h4>
            <button className={className} alt={alt} onClick={likeClick}/>
          </div>
          <p className="movies-card__time">{hours}ч {minutes}м</p>
          </div>
      </div>  
    </li>
  );
}

export default MoviesCard;