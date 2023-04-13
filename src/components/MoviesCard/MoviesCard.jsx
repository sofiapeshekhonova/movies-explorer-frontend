import "./MoviesCard.scss";
import like from "../../images/like.svg";
import poster from "../../images/movie-poster.jpg";

function MoviesCard({ film }) {
  const { nameRU, trailerLink, duration } = film;
  //image.url image.name image.previewUrl?

  return (
    <li className="movies-card">
      <a className="movies-card__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" alt="постер фильма" src={poster}/>
      </a>
        <div className="movies-card__container">
          <div className="movies-card__info">
            <h4 className="movies-card__title">{nameRU}</h4>
            <img className="movies-card__like" alt="знак- избранное" src={like}/>
          </div>
          <p className="movies-card__time">{duration}</p>
      </div>  
    </li>
  );
}

export default MoviesCard;