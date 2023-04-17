import "./MainDescription.scss";

function MainDescription({title}) {

  return (
    <div className="main-description">
      <h2 className="main-description__title">{title}</h2>
      <div className="main-description__line"></div>
    </div>
  );
}

export default MainDescription;