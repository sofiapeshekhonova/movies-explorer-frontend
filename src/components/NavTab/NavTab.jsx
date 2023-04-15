import { Link } from "react-router-dom";
import profile from "../../images/profile.svg"
import { AppRoute } from "../../constants";
import "./NavTab.scss"

function NavTab({isOpen, onClose}) {
  const styleHeaderNavigation = isOpen ? 'nav-tab nav-tab_active' : 'nav-tab';
  
  return (
    <div className={styleHeaderNavigation}>
      <ul className="nav-tab__list">
        <li className="nav-tab__item nav-tab__item_active text__hover" onClick={onClose}>
          <Link className="nav-tab__item-link" to={AppRoute.Main}>
            <p className="nav-tab__list-text">Главная</p>
          </Link>
        </li>
        <li className="nav-tab__item text__hover" onClick={onClose}>
          <Link className="nav-tab__item-link" to={AppRoute.Movies}>
            <p className="nav-tab__list-text">Фильмы</p>
          </Link>
        </li>
        <li className="nav-tab__item text__hover" onClick={onClose}>
          <Link className="nav-tab__item-link" to={AppRoute.SavedMovies}>
            <p className="nav-tab__list-text">Сохраненные фильмы</p>
          </Link>
        </li>
      </ul>
      <Link to={AppRoute.Profile} className="nav-tav__profile-link text__hover">
        <p className="nav-tav__profile-name">Аккаунт</p>
        <img className="nav-tav__profile-img" src={profile} alt="аватар"/>
      </Link>
    </div>
  );
}

export default NavTab;