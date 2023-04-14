import { AppRoute } from "../../constants";
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";

import "./Register.scss";

function Register() {
  return (
    <main>
      <LoginAndRegister
        title={"Добро пожаловать!"}
        link={AppRoute.Login}
        paragraph={"Уже зарегистрировались?"}
        span={" Войти"}
      >
        <LoginAndRegisterForm
          buttonText={"Зарегистрироваться"}
          className="form__button"
        >
          <div className="form__container">
            <p className="form__title">Имя</p>
            <input
              id="name"
              className="form__input"
              name="name"
              type="text"
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
          <div className="form__container">
            <p className="form__title">Пароль</p>
            <input
              id="password"
              name="password"
              type="password"
              className="form__input"
              required
            />
            <span className="form__text-error">ошибка</span>
          </div>
        </LoginAndRegisterForm>
      </LoginAndRegister>
    </main>
  );
}

export default Register;
