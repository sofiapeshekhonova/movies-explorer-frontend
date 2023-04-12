import "./Portfolio.scss";
import arrow from '../../images/links.svg';

function Portfolio() {

  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__works">
          <a className="portfolio__link" href="https://github.com/sofiapeshekhonova/how-to-learn" target="_blank" rel="noreferrer">
            <h3 className="portfolio__link-name">Статичный сайт</h3>
            <img className="portfolio__link-img" src={arrow} alt="стрелки-ссылки"/>
          </a>
        </li>
        <li className="portfolio__works">
          <a className="portfolio__link" href="https://github.com/sofiapeshekhonova/russian-travel" target="_blank" rel="noreferrer">
            <h3 className="portfolio__link-name">Адаптивный сайт</h3>
            <img className="portfolio__link-img" src={arrow} alt="стрелки-ссылки"/>
          </a>
        </li>
        <li className="portfolio__works">
          <a className="portfolio__link" href="https://github.com/sofiapeshekhonova/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
            <h3 className="portfolio__link-name">Одностраничное приложение</h3>
            <img className="portfolio__link-img" src={arrow} alt="стрелки-ссылки"/>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;