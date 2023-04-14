import {Link} from "react-router-dom";
import "./Profile.scss";
import {AppRoute} from "../../constants";
import Layout from "../Layout/Layout";

function Profile() {
  return (
    <Layout className="header" title="Main" isLoggedIn>
      <main className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="form" noValidate>
          <div className="profile-form__container">
            <p className="profile-form__title">Имя</p>
            <input
              id="name"
              className="profile-form__input"
              name="name"
              type="text"
              value="Будет имя"
            />
          </div>
          <div className="profile-form__container">
            <p className="profile-form__title">E-mail</p>
            <input
              id="email"
              className="profile-form__input"
              name="email"
              type="email"
              value="test@mail.ru"
            />
          </div>
          <button
            className="profile-form__button"
            type="submit"
            aria-label="Редактировать информацию о себе"
          >
            Редактировать
          </button>
        </form>
        <Link to={AppRoute.Main} className="profile__link">
          <button className="profile__button" type="button" aria-label="">
            Выйти из аккаунта
          </button>
        </Link>
      </main>
    </Layout>
  );
}

export default Profile;
