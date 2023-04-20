import "./SearchForm.scss";
import ValidationForm from "../../hooks/ValidationForm";
import { useEffect, useState } from "react";

function SearchForm({handleSortClick, activeCheckbox, handleSearchMovies, setAllMoviesButton}) {
const [formValue, setFormValue] = useState("");  
  const switcherClassName = `search-form__checkbox-switcher ${
    activeCheckbox && "search-form__checkbox-switcher_active"
  }`;
  const buttonCheckboxClassName = `search-form__checkbox-button ${
    activeCheckbox && "search-form__checkbox-button_active"
  }`;

  // let buttonDisables = !(errors.movie === "");
  // let buttonClassName = buttonDisables ? " search-form__button search-form__button_disabled"  : "search-form__button button-hover";

  useEffect(() => { // эффект, который устанавливает значения полей input и checkbox, если они сохранены в памяти
    if (localStorage.getItem('inputMovieName')) {
      setFormValue(localStorage.getItem('inputMovieName'));  
  }  
}, [])

  // function handleChange(e) {
  //   e.preventDefault();
  //   handleSortClick();
  // }

  function handleChange(e) {
    setFormValue(e.target.value);
  }
  
  function handelSortSubmit(e) {
    e.preventDefault();
    handleSearchMovies(formValue);
    setAllMoviesButton(true);
  }

  return (
    <section className="search-form">
      <form onSubmit={handelSortSubmit} >
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
            className={'search-form__button button-hover'}
            type="submit"
            aria-label="Кнопка найти"
          >
            Найти
          </button>
        </div>
        {/* <span className="form__text-error form__text-error_profile">{errors.movie}</span> */}
      </form>
      <label className="search-form__checkbox">
        <input
          className={switcherClassName}
          type="checkbox"
          //onClick={handleChange}
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

// function SearchForm({handleSortClick, activeCheckbox, handleSearchMovies, setAllMoviesButton}) {
//   const {handleChange, errors, formValue, setFormValue} = ValidationForm();
//   // function handleChange(e) {
//   //   e.preventDefault();
//   //   console.log("fsdfs");
//   //   handleSortClick();
//   // }
  

//   const switcherClassName = `search-form__checkbox-switcher ${
//     activeCheckbox && "search-form__checkbox-switcher_active"
//   }`;
//   const buttonCheckboxClassName = `search-form__checkbox-button ${
//     activeCheckbox && "search-form__checkbox-button_active"
//   }`;

//   let buttonDisables = !(errors.movie === "");
//   let buttonClassName = buttonDisables ? " search-form__button search-form__button_disabled"  : "search-form__button button-hover";

//   useEffect(() => { // эффект, который устанавливает значения полей input и checkbox, если они сохранены в памяти
//     if (localStorage.getItem('inputMovieName')) {
//       setFormValue(localStorage.getItem('inputMovieName'));
//     //setFormValue не установить    
//   }  
// }, [])
//   function handelSortSubmit(e) {
//     e.preventDefault();
//     handleSearchMovies(formValue.movie);
//    // formValue.movie = "";
//     setAllMoviesButton(true);
//   }

//   return (
//     <section className="search-form">
//       <form onSubmit={handelSortSubmit} >
//         <div className="search-form__input-container">
//           <input
//             className="search-form__input"
//             placeholder="Найдите фильм"
//             type="text"
//             required
//             name="movie"
//             minLength="1"
//             value={formValue.movie || ""}
//             onChange={handleChange}
//           />
//           <button
//             disabled={buttonDisables}
//             className={buttonClassName}
//             type="submit"
//             aria-label="Кнопка найти"
//           >
//             Найти
//           </button>
//         </div>
//         <span className="form__text-error form__text-error_profile">{errors.movie}</span>
//       </form>
//       <label className="search-form__checkbox">
//         <input
//           className={switcherClassName}
//           type="checkbox"
//           //onClick={handleChange}
//         />
//         <button
//           className={buttonCheckboxClassName}
//           type="button"
//           aria-label="поиск по короткометражкам"
//         />
//         <p className="search-form__checkbox-name">Короткометражки</p>
//       </label>
//     </section>
//   );
// }

// export default SearchForm;
