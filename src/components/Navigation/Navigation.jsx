// import { Link } from "react-router-dom";
// import profile from "../../images/profile.svg"
// import { AppRoute } from "../../constants";
import "./Navigation.scss"
import NavTab from "../NavTab/NavTab";
import burger from "../../images/burger-button.svg"

function Navigation({onOpenBurgerPopup}) {
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
  // const styleHeaderNavigation = activeBurger ? 'nav-tab nav-tab_active' : 'nav-tab';

  return (
    <>
    <NavTab />
    <button className="header__burger" onClick={onOpenBurgerPopup}>
      <img src={burger} alt="кнопка закрытия меню"/>
      {/* <span className='header__burger-line'></span> */}
    </button>
    </>
  );
}

export default Navigation;