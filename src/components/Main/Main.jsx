import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Layout from '../Layout/Layout';

function Main({isLoggedIn}) {

  return (
    <Layout className="header header_main" title="Main" isLoggedIn={false} page>
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    </Layout>

  );
}

export default Main;
