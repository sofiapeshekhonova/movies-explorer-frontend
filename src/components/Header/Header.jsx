import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants";
import "./Header.scss";
import NavTabMain from "../NavTabMain/NavTabMain";
import Navigation from "../Navigation/Navigation";

function Header({isLoggedIn, className, onOpenBurgerPopup}) {
  return (
    <header className={className}>
      <Link to={AppRoute.Main} className="header__link">
        <img className="header__image" src={logo} alt="логотип проекта" />
      </Link>
      {isLoggedIn ? (
        <Navigation onOpenBurgerPopup={onOpenBurgerPopup} />
      ) : (
        <NavTabMain />
      )}
    </header>
  );
}

export default Header;
