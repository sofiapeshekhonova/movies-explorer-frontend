import "./Navigation.scss"
import NavTab from "../NavTab/NavTab";
import burger from "../../images/burger-button.svg"

function Navigation({onOpenBurgerPopup}) {
  return (
    <>
    <NavTab />
    <button className="header__burger" onClick={onOpenBurgerPopup}>
      <img className="header__img" src={burger} alt="кнопка закрытия меню"/>
    </button>
    </>
  );
}

export default Navigation;