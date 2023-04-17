import "./Techs.scss";
import MainDescription from "../MainDescription/MainDescription";

function Techs() {

  return (
    <section className="techs">
      <MainDescription title={'Технологии'} />
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__description">На курсе веб-разработки мы освоили&nbsp;технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        <li className="techs__list-items">HTML</li>
        <li className="techs__list-items">CSS</li>
        <li className="techs__list-items">JS</li>
        <li className="techs__list-items">React</li>
        <li className="techs__list-items">Git</li>
        <li className="techs__list-items">Express.js</li>
        <li className="techs__list-items">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;