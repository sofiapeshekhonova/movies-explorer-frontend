import { Link } from "react-router-dom";
import profile from "../../images/profile.svg"
import { AppRoute } from "../../constants";
import "./NavTab.scss"
// import { useState } from "react";

function NavTab({isOpen}) {
  // const [activeBurger, setActiveBurger] = useState(false);
  // const handleBtnClick = () => {
  //   setActiveBurger(!activeBurger)
  // }

  // if(activeBurger) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "visible";
  // }
  
  // const styleBurgerBtn = activeBurger ? 'header__burger-line_active' : 'header__burger-line';
  const styleHeaderNavigation = isOpen ? 'nav-tab nav-tab_active' : 'nav-tab';

  return (
    <div className={styleHeaderNavigation}>
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <Link className="nav-tab__item-link" to={AppRoute.Main}>
            <p className="nav-tab__list-text">Главная</p>
          </Link>
        </li>
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