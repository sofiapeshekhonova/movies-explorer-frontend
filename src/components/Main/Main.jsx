import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Layout from '../Layout/Layout';

function Main({isLoggedIn}) {

  return (
    <Layout className="header header__main" title="Main" isLoggedIn={false} page>
      <div className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </div>
    </Layout>

  );
}

export default Main;
