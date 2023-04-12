// компонент страницы «О проекте». Он будет содержать только презентационные компоненты и в будущем, за исключением шапки навигации. Вот так выглядит список компонентов, которые будут использоваться только на этой странице:
// Promo — компонент с вёрсткой баннера страницы «О проекте».
// NavTab — компонент с навигацией по странице «О проекте».
// AboutProject — компонент с описанием дипломного проекта.
// Techs — компонент с использованными технологиями.
// AboutMe — компонент с информацией о студенте.
// Portfolio — компонент со ссылками на другие проекты.

// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo';
import "./Main.scss";
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';

function Main() {

  return (
    <>
    {/* <Header /> */}
    <div className="main">
    <Promo />
    <AboutProject />
    <Techs />
    </div>
    {/* <Footer /> */}
    </>
  );
}

export default Main;
