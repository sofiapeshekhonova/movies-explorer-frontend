import "./MoviesCard.scss";
import poster from "../../images/movie-poster.jpg";

function MoviesCard({ film, props }) {
  const { nameRU, trailerLink, duration } = film;
  const {className, src, alt} = props;

  return (
    <li className="movies-card">
      <a className="movies-card__trailer-link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" alt="постер фильма" src={poster}/>
      </a>
        <div className="movies-card__container">
          <div className="movies-card__info">
            <h4 className="movies-card__title">{nameRU}</h4>
            <img className={className} alt={alt} src={src}/>
          </div>
          <p className="movies-card__time">{duration}</p>
      </div>  
    </li>
  );
}

export default MoviesCard;