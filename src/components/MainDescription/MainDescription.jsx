import "./MainDescription.scss";

function MainDescription({title}) {

  return (
    <div className="main-description">
      <h3 className="main-description__title">{title}</h3>
      <div className="main-description__line"></div>
    </div>
  );
}

export default MainDescription;