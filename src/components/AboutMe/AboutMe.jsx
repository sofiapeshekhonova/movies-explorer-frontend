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
          <h2 className="about-me__title">Софья</h2>
          <p className="about-me__description">Фронтенд-разработчик, 28 лет</p>
          <p className="about-me__information">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__link" href="https://github.com/sofiapeshekhonova?tab=repositories" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;