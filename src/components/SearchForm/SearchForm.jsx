import { useEffect } from "react";
import "./SearchForm.scss";

function SearchForm({props, pageSavedMovie}) {
  const {
    setActiveShowAllMovies,
    errorSpan,
    setErrorSpan,
    checkbox, 
    setCheckbox,
    isFiltered,
    formValue, 
    setFormValue,
    handleFilteredMovies, 
    handleCheckboxFiltered,
  } = props;

  const switcherClassName = `search-form__checkbox-switcher ${
    checkbox && "search-form__checkbox-switcher_active"
  }`;
  const buttonCheckboxClassName = `search-form__checkbox-button ${
    checkbox && "search-form__checkbox-button_active"
  }`;


  useEffect(() => {
    if (localStorage.getItem("formValue") && !pageSavedMovie) {
      const value = JSON.parse(localStorage.getItem("formValue"))
      setFormValue(value);
    }
  }, []);

  useEffect(() => {
    if(localStorage.getItem("checkbox") &&! pageSavedMovie) {
      const checkbox = JSON.parse(localStorage.getItem("checkbox"));
      setCheckbox(checkbox)
    }
  }, []);

  function handleChange(e) {
    setFormValue(e.target.value);
    setErrorSpan("");
  }

  function handleCheckboxChange() { // нажали на чекбокс
    if(isFiltered && !pageSavedMovie) {
      setCheckbox(!checkbox);
      handleCheckboxFiltered(!checkbox)
      localStorage.setItem('checkbox', JSON.stringify(!checkbox));
      console.log("")
    } else {
      setCheckbox(!checkbox);
      handleCheckboxFiltered(!checkbox)
    }
  }

  function handelSortSubmit(e) {
    e.preventDefault();
    !pageSavedMovie && setActiveShowAllMovies(true);
    if (!e.target.closest("form").checkValidity()) {
      setErrorSpan("Поле не должно быть пустым");
      return;
    }
    handleFilteredMovies(formValue, checkbox)
  }

  return (
    <section className="search-form">
      <form onSubmit={handelSortSubmit} noValidate>
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            placeholder="Найдите фильм"
            type="text"
            required
            name="movie"
            minLength="1"
            value={formValue || ""}
            onChange={handleChange}
          />
          <button
            className={"search-form__button button-hover"}
            type="submit"
            aria-label="Кнопка найти"
            disabled={errorSpan}
          >
            Найти
          </button>
        </div>
        <span className="form__text-error">{errorSpan}</span>
      </form>
      <label className="search-form__checkbox">
        <input
          className={switcherClassName}
          type="checkbox"
          checked={checkbox}
          onChange={handleCheckboxChange}
        />
        <button
          className={buttonCheckboxClassName}
          type="button"
          aria-label="поиск по короткометражкам"
        />
        <p className="search-form__checkbox-name">Короткометражки</p>
      </label>
    </section>
  );
}

export default SearchForm;
