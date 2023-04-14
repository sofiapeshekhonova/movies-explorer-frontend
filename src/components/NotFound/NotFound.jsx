import { Link } from "react-router-dom";
import "./NotFound.scss";
import { AppRoute } from "../../constants";

function NotFound() {

  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__decription">Страница не найдена</p>
      <Link to={AppRoute.Main}>
        <button className="not-found__button" type="button" aria-label="вернуться назад">Назад</button>
      </Link>
    </section>
  );
}

export default NotFound;