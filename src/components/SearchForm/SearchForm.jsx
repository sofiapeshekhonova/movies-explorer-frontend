// рма поиска, куда пользователь будет вводить запрос. 
// Обратите внимание на фильтр с чекбоксом «Только короткометражки». 
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.

import "./SearchForm.scss";

function SearchForm() {

  return (
    <section className="search-form">
      <form>
        <div className="search-form__input-container">
          <input className="search-form__input" placeholder="Фильм" type="text"></input>
          <button className="search-form__button button__hover" type="button" aria-label="Кнопка найти">Найти</button>
        </div>
      </form>
      <label className="search-form__checkbox">
        <div className="search-form__checkbox-switcher">
          <button className="search-form__checkbox-button" type="button" aria-label="поиск по короткометражкам"></button>
        </div>
        <p className="search-form__checkbox-name">Короткометражки</p>
    </label>
    </section>
  );
}

export default SearchForm;