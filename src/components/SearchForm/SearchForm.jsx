// рма поиска, куда пользователь будет вводить запрос. 
// Обратите внимание на фильтр с чекбоксом «Только короткометражки». 
// Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.

import "./SearchForm.scss";

function SearchForm() {

  const isActive = true;

  const switcherClassName = `search-form__checkbox-switcher ${isActive && 'search-form__checkbox-switcher_active'}`
  const buttonClassName = `search-form__checkbox-button ${isActive && 'search-form__checkbox-button_active'}`


  return (
    <section className="search-form">
      <form>
        <div className="search-form__input-container">
          <input className="search-form__input" placeholder="Фильм" type="text" required></input>
          <button className="search-form__button button__hover" type="submit" aria-label="Кнопка найти">Найти</button>
        </div>
      </form>
      <label className="search-form__checkbox">
        <div className={switcherClassName}>
          <button className={buttonClassName} type="button" aria-label="поиск по короткометражкам"></button>
        </div>
        <p className="search-form__checkbox-name">Короткометражки</p>
    </label>
    </section>
  );
}

export default SearchForm;