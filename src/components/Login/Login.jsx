import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";

import "../Register/Register.scss";

function Login() {
  return (
    <LoginAndRegister
      title={"Рады видеть!"}
      link={"/signup"}
      paragraph={"Ещё не зарегистрированы?"}
      span={" Регистрация"}
    >
      <LoginAndRegisterForm
        buttonText={"Войти"}
        className="login__button form__button
        "
      >
        <div className="form__container">
          <p className="form__title">Имя</p>
          <input
            id="email"
            className="form__input"
            name="email"
            type="email"
            required
          />
          <span className="form__text-error">ошибка</span>
        </div>
        <div className="form__container">
          <p className="form__title">E-mail</p>
          <input
            id="email"
            className="form__input"
            name="email"
            type="email"
            required
          />
          <span className="form__text-error">ошибка</span>
        </div>
      </LoginAndRegisterForm>
    </LoginAndRegister>
  );
}

export default Login;
