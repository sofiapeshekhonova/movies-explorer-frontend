import "./AboutProject.scss";
import MainDescription from "../MainDescription/MainDescription";
function AboutProject() {
  return (
    <section className="about-project">
      <MainDescription title={"О проекте"} />
      <ul className="about-project__container">
        <li className="about-project__container-text">
          <h4 className="about-project__title">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__container-text">
          <h4 className="about-project__title">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="about-project__spent-time">
        <div className="about-project__spent-time-backend">
          <p className="about-project__spent-time-title about-project__spent-time-title_backend">
            1&nbsp;неделя
          </p>
          <p className="about-project__spent-time-description">Back-end</p>
        </div>
        <div className="about-project__spent-time-frontend">
          <p className="about-project__spent-time-title about-project__spent-time-title_frontend">
            4&nbsp;недели
          </p>
          <p className="about-project__spent-time-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
