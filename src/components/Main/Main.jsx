import Promo from '../Promo/Promo';
import "./Main.scss";
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Layout from '../Layout/Layout';

function Main() {

  return (
    <Layout className="header header__main" title="Main" isLoggedIn={false}>
    <div className="main">
    <Promo />
    <AboutProject />
    <Techs />
    <AboutMe />
    <Portfolio />
    </div>
    {/* <Footer /> */}
    </Layout>

  );
}

export default Main;
