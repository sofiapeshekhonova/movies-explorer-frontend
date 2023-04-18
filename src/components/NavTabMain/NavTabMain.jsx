import { Link } from "react-router-dom";
import "./NavTabMain.scss"
import { AppRoute } from "../../constants";

function NavTabMain() {
  return (
    <section className="nav-tab-main">
      <ul className="nav-tab-main__list">
        <li className="nav-tab-main__item text-hover">
          <Link to={AppRoute.Register} className="nav-tab-main__link">Регистрация</Link>
        </li>
        <li className="nav-tab-main__item button-hover">
          <Link to={AppRoute.Login} className="nav-tab-main__link nav-tab-main__link_login">Войти</Link>
        </li>
      </ul>
    </section>
  );
}

export default NavTabMain;