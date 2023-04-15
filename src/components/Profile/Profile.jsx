import {Link} from "react-router-dom";
import "./Profile.scss";
import {AppRoute} from "../../constants";
import Layout from "../Layout/Layout";
import { useState } from "react";

function Profile({onOpenBurgerPopup}) {

  const [isInputEdit, setIsInputEdit] = useState(true);
  
  function handleEditClick(evt) {
    evt.preventDefault();
    setIsInputEdit(!isInputEdit);
  }

  // const mistakeActive = mistake ? profile__span profile__span_active : profile__span;
  // const buttonClass = isInputEdit ? "form__button profile__save-button button__disabled": "form__button profile__save-button";
  const saveButton = isInputEdit ? "profile__save-buttons" : "profile__save-buttons_active button__hover";
  const editButton = isInputEdit ? "profile__form-buttons_active" : "profile__form-buttons";

  return (
    <Layout className="header" title="Main" isLoggedIn page={false} onOpenBurgerPopup={onOpenBurgerPopup}>
      <main className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="form" noValidate>
          <div className="profile-form__container">
            <p className="profile-form__title">Имя</p>
            <input readOnly={isInputEdit}
              id="name"
              className="profile-form__input"
              name="name"
              type="text"
              defaultValue="Имя"
            />
          </div>
          <div className="profile-form__container">
            <p className="profile-form__title">E-mail</p>
            <input readOnly={isInputEdit}
              id="email"
              className="profile-form__input"
              name="email"
              type="email"
              defaultValue="email"
            />
          </div>
          <div className={editButton}>
            <button onClick={handleEditClick}
              className="profile__form-button text__hover"
              type="submit"
              aria-label="Редактировать информацию о себе"
            >
              Редактировать
            </button>
            <Link to={AppRoute.Main} className="profile__link text__hover">
            <button className="profile__button" type="button" aria-label="">
              Выйти из аккаунта
            </button>
          </Link>
        </div>
        <div className={saveButton}>
          <span className="profile__span">При обновлении профиля произошла ошибка.</span>
          <button className="form__button profile__save-button">Сохранить</button>
        </div>
        </form>
      </main>
    </Layout>
  );
}

export default Profile;
