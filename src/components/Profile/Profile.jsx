import {Link} from "react-router-dom";
import "./Profile.scss";

function Profile() {
  return (
    <main className="content">
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="form" noValidate>
        <div className="profile-form__container">
            <p className="profile-form__title">Имя</p>
            <input
              id="name"
              className="profile-form__input"
              name="name"
              type="text"
              value='Будет имя'
            />
        </div>
        <div className="profile-form__container">
          <p className="profile-form__title">E-mail</p>
          <input
            id="email"
            className="profile-form__input"
            name="email"
            type="email"
            value='test@mail.ru'
          />
        </div>
          <button className="profile-form__button" type="submit" aria-label="Редактировать информацию о себе">Редактировать</button>
        </form>
        <Link to="/" className="profile__link">
          <button className="profile__button" type="submit" aria-label="">
            Выйти из аккаунта
          </button>
        </Link>
      </section>
    </main>
  );
}

export default Profile;
