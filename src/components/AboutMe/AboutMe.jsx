import "./AboutMe.scss";
import MainDescription from "../MainDescription/MainDescription";
import me from '../../images/me.jpg'

function AboutMe() {

  return (
    <section className="about-me">
      <MainDescription title={'Студент'} />
      <div className="about-me__container">
        <img className="about-me__image" src={me} alt="фотография студента"/>
        <div className="about-me__info">
          <h3 className="about-me__title">Софья</h3>
          <p className="about-me__decription">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__information">Я живу в Санкт-Петербурге. 
            С 2016 по 2022 год работала event-менеджером. Мне нравится заниматься фронтенд-разработкой, потому что ты сразу видишь результат. 
            Делаешь сайт более понятным для пользователя и немного облегчаешь ему жизнь.
          </p>
          <a className="about-me__link text-hover" href="https://github.com/sofiapeshekhonova?tab=repositories" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;