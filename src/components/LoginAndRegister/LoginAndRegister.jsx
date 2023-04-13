import { Link } from "react-router-dom";
import "./LoginAndRegister.scss";

function LoginAndRegister({title, paragraph, span, children, link}) {

  return (
    <main className="content">
      <section className="login">
        <h2 className="login__title">{title}</h2>
          {children}
        <Link to={link} className="login__paragraph">
          {paragraph} 
          <span className="login__paragraph_span">{span}</span>
        </Link>
      </section>
    </main>
  );
}

export default LoginAndRegister;