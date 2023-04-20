import "./MoviesEmpty.css"

function MoviesEmpty({text, className, onClick}) {
  return (
    <>
      <h3 className="movies-empty">{text}</h3>
      <button
      className={className}
      aria-label="Кнопка: все фильмы"
      type="button"
      onClick={onClick}
    >Все фильмы </button>
  </>
  )
}

export default MoviesEmpty
