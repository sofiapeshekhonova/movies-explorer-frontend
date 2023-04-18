import { NavLink } from "react-router-dom";
import profile from "../../images/profile.svg"
import { AppRoute } from "../../constants";
import "./NavTab.scss"

function NavTab({isOpen, onClose}) {
  const styleHeaderNavigation = isOpen ? 'nav-tab nav-tab_active' : 'nav-tab';

  const linkClassName = ({isActive}) => isActive ? "nav-tab__item-link nav-tab__item-link_active" : "nav-tab__item-link" ;
  const profileLink = ({isActive}) => `nav-tab__profile-link text-hover ${isActive && "nav-tab__item-link_active"}`;
  
  return (
    <div className={styleHeaderNavigation}>
      <ul className="nav-tab__list">
        <li className="nav-tab__item text-hover" onClick={onClose}>
          <NavLink className={linkClassName} to={AppRoute.Main}>Главная</NavLink>
        </li>
        <li className="nav-tab__item text-hover" onClick={onClose}>
          <NavLink className={linkClassName} to={AppRoute.Movies}>Фильмы</NavLink>
        </li>
        <li className="nav-tab__item text-hover" onClick={onClose}>
          <NavLink className={linkClassName} to={AppRoute.SavedMovies}>Сохраненные фильмы</NavLink>
        </li>
      </ul>
      <NavLink to={AppRoute.Profile} className={profileLink}>
        <p className="nav-tab__profile-name">Аккаунт</p>
        <img className="nav-tab__profile-img" src={profile} alt="аватар"/>
      </NavLink>
    </div>
  );
}

export default NavTab;