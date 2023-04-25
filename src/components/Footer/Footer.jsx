import "./Footer.scss";

function Footer({page}) {
  return (
    page && (
      <footer className="footer">
        <p className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__container">
          <p className="footer__year">© 2023</p>
          <ul className="footer__list">
            <li className="footer__item text-hover">
              <a
                className="footer__link"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item text-hover">
              <a
                className="footer__link"
                href="https://github.com/sofiapeshekhonova"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  );
}

export default Footer;
