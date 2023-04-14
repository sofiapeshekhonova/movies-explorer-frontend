import { Link } from "react-router-dom";
import profile from "../../images/profile.svg"
import { AppRoute } from "../../constants";
import "./NavTab.scss"

function NavTab() {
  return (
    <div className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <Link className="nav-tab__item-link" to={AppRoute.Movies}>
            <p className="nav-tab__list-text">Фильмы</p>
          </Link>
        </li>
        <li className="nav-tab__item">
          <Link className="nav-tab__item-link" to={AppRoute.SavedMovies}>
            <p className="nav-tab__list-text">Сохраненные фильмы</p>
          </Link>
        </li>
      </ul>
      <Link to={AppRoute.Profile} className="nav-tav__profile-link">
        <p className="nav-tav__profile-name">Аккаунт</p>
        <img className="nav-tav__profile-img" src={profile} alt="аватар"/>
      </Link>
    </div>
  );
}

export default NavTab;