import { Link } from "react-router-dom";
import "./NavTabMain.scss"
import { AppRoute } from "../../constants";

function NavTabMain() {
  return (
    <div className="nav-tab-main">
      <ul className="nav-tab-main__list">
        <li className="nav-tab-main__item text__hover">
          <Link to={AppRoute.Register} className="nav-tab-main__link">Регистрация</Link>
        </li>
        <li className="nav-tab-main__item button__hover">
          <Link to={AppRoute.Login} className="nav-tab-main__link nav-tab-main__link_login">Войти</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavTabMain;