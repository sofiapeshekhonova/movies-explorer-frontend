import { Link } from "react-router-dom";
import "./LoginAndRegister.scss";
import logo from '../../images/logo.svg'
import { AppRoute } from "../../constants";

function LoginAndRegister({title, paragraph, span, children, link}) {

  return (
      <section className="login">
        <Link to={AppRoute.Main}>
          <img className="login__logo" alt="логотип" src={logo} />
        </Link>
        <h2 className="login__title">{title}</h2>
          {children}
        <Link to={link} className="login__paragraph text-hover">
          {paragraph} 
          <span className="login__paragraph_span">{span}</span>
        </Link>
      </section>
  );
}

export default LoginAndRegister;