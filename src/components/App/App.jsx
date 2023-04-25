import {Routes, Route, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.scss";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {AppRoute, errorText} from "../../constants";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import {useEffect, useState} from "react";
import {register, login} from "../../utils/Auth";
import {api} from "../../utils/MainApi";
import {apiMovies} from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function App() {
  const [isOpenBurgerPopup, setisOpenBurgerPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageloading] = useState(true);
  const [loggedIn, isLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [updateUserError, setUpdateUserError] = useState("");
  const [errorSearchFormSpan, setErrorSearchFormSpan] = useState("");
  const [errorMovies, setErrorMovies] = useState("");
  const [errorSaveMovies, setErrorSaveMovies] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState("")
  const [formValueSave, setFormValueSave] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxSave, setCheckboxSave] = useState(false)
  const [savedMovies, setSavedMovies] = useState([]);
  const [savePageClick, setSavePageClick] = useState(false)
  const [saveMoviePageClick, setMovieSavePageClick] = useState(false)
  const [savedFilterMovies, setSavedFilterMovies] = useState([]);
  const [activeShowAllMovies, setActiveShowAllMovies] = useState(true); //когда видна кнопка все фильмы
  const [isFiltered, setIsFiltered] = useState(false); //происходила ли фильтрация исходного массива
  const [filteredAllMovies, setFilteredAllMovies] = useState([]); //отфильтрованный массив
  const [registerResponse, isregisterResponse] = useState({status: false, text: "",});

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (loggedIn) {
      setPageloading(true);
      api
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPageloading(false));
    } else {
      setPageloading(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (token) {
      setPageloading(true);
      api
        .getUserInfo()
        .then((res) => {
          if (res) {
            isLoggedIn(true);
            navigate({replace: false});
          }
        })
        .catch(() => {
          isLoggedIn(false);
        })
        .finally(() => setPageloading(false));
    }
  }, [token]);

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      apiMovies
        .getMovies()
        .then((movies) => {
          setMovies(movies);
          navigate({replace: false});
        })
        .catch((err) => {
          setErrorMovies(errorText)
        })
        .finally(setTimeout(() => setIsLoading(false), 1000));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      api
        .getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
        })
        .catch((err) => {
          console.log(err);
          setErrorMovies(errorText)
        })
        .finally(setTimeout(() => setIsLoading(false), 1000));
    }
  }, [loggedIn]);

  // useEffect(() => {
    
  //   // if (localStorage.getItem("filterMovies") && localStorage.getItem("checkbox")) {
  //   //   const inputMovieName = localStorage.getItem("inputMovieName");
  //   //   const checkbox = JSON.parse(localStorage.getItem("checkbox"));
  //   //   //handleFilterAllMovies(checkbox, inputMovieName);
  //   //   setFormValue(inputMovieName);
  //   //   setAllMoviesButton(true);
  //   //   setCheckbox(checkbox);
  //   // } else if (localStorage.getItem("allMovies")) {
  //   //   const allFilms = JSON.parse(localStorage.getItem("allMovies"));
  //   //   setVisibleFilms(allFilms);
  //   // } else {
  //   //   setVisibleFilms("");
  //   // }
  // }, [movies, allMoviesButton]);

  useEffect(() => {
    function handleEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function handleClosePopups(evt) {
      if (evt.target.classList.contains("burger-popup_active")) {
        closeAllPopups();
      }
    }
    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);

  useEffect(()=> {
    if(savedFilterMovies.length  === 0 && !savePageClick) {
      setIsLoading(true)
      setSavedFilterMovies(savedMovies)
    } else if(savePageClick || checkboxSave) {
      handleFilterSaveMovies(checkboxSave, formValueSave)
    } else if(!checkboxSave && savedFilterMovies.length  !== 0) {
      setIsLoading(false)
      handleFilterSaveMovies(checkboxSave, formValueSave)
    }
  }, [checkboxSave, savedMovies, savePageClick])

  function handleRegisterClick(password, email, name) {
    register(password, email, name)
      .then((res) => {
        if (res) {
          isregisterResponse({
            status: true,
            text: "Вы успешно зарегистрировались!",
          });
          handleLoginClick(password, email);
        }
      })
      .catch((res) => {
        if (res === "Ошибка 409") {
          setOpenInfoTooltip(true);
          isregisterResponse({
            status: false,
            text: "Пользователь с такой почтой уже зарегистрирован",
          });
        } else if (!res) {
          isregisterResponse({
            status: false,
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
        }
      })
      .finally(() => {
        setOpenInfoTooltip(true);
      });
  }

  function handleLoginClick(password, email) {
    login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/movies");
      })
      .catch((res) => {
        if (res === "Ошибка 401") {
          setOpenInfoTooltip(true);
          isregisterResponse({
            status: false,
            text: "Не правильная почта или пароль",
          });
        } else if (!res) {
          isregisterResponse({
            status: false,
            text: res,
          });
        }
      });
  }

  function handleUpdateUserClick(value) {
    setIsLoading(true);
    api
      .saveNewUserInfo(value)
      .then((user) => {
        setCurrentUser(user);
        setUpdateUserError("Данные изменены успешно");
      })
      .then(closeAllPopups)
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setUpdateUserError("Пользователь с такой почтой уже зарегистрирован");
        } else {
          setUpdateUserError(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function signOut() {
    navigate(AppRoute.Login);
    isLoggedIn(false);
    setCurrentUser("");
    setMoviesInputSearch("")
    setCheckbox(false)
    localStorage.clear();
  }

  function handleOpenBurgerPopup() {
    setisOpenBurgerPopup(true);
  }

  function closeAllPopups() {
    setOpenInfoTooltip(false);
    setisOpenBurgerPopup(false);
  }

  function handleSaveMovie(movie) {
    api
      .saveMovies(movie)
      .then((movie) => {
        setSavedMovies(savedMovies.concat(movie));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovies(movie) {
    api
      .deleteMovies(movie._id)
      .then(() => {
        setSavedMovies((i) => i.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //   localStorage.setItem("filterMovies", JSON.stringify(visibleFilms));
  //   localStorage.setItem("checkbox", JSON.stringify(checkbox));
  //   localStorage.setItem("inputMovieName", formValue);


  function handleFilterSaveMovies(checkbox, inputSearch) {
    let filteredMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(inputSearch.toLowerCase())
    );
    let sortFilteredMovies = filteredMovies.filter(
      (movie) => movie.duration <= 40
    );
    
    // localStorage.setItem("filterMoviesSavePage", JSON.stringify(filteredMovies));
    // localStorage.setItem("checkboxSavePage", JSON.stringify(checkbox));
    // localStorage.setItem("inputMovieNameSavePage", inputSearch);

    if (filteredMovies.length !== 0 && !checkbox) {
      setErrorSaveMovies("")
      setSavedFilterMovies(filteredMovies);
    } else if(filteredMovies.length !== 0 && checkbox && sortFilteredMovies.length !== 0) {
      setErrorSaveMovies("")
      setSavedFilterMovies(sortFilteredMovies);
    } else if(sortFilteredMovies.length === 0 && checkbox) {
      setErrorSaveMovies("Фильмы не найдены");
    } else if(filteredMovies.length === 0 ) {
      setErrorSaveMovies("Фильмы не найдены")
    } 
  }

  function handleCheckboxChange() { 
    setCheckbox(!checkbox);
  }
  
  function handleFilteredMovies(formValue) { //при нажатии на кнопку найти
    setMoviesInputSearch(formValue);
    setIsFiltered(true);
  }

  useEffect(() => {
    let filteredMovies = movies.filter((item) =>
      item.nameRU.toLowerCase().includes(moviesInputSearch.toLowerCase())
    );
    let sortFilteredMovies = filteredMovies.filter(
      (movie) => movie.duration <= 40
    );
    if (checkbox) {
      filteredMovies = sortFilteredMovies;
    }
    setFilteredAllMovies(filteredMovies);
    setMoviesInputSearch(moviesInputSearch)
  }, [movies, moviesInputSearch, checkbox, loggedIn]);

  function handleShowAllMovies() {
    setMoviesInputSearch("");
    setCheckbox(false);
    window.scrollTo(0, 0);
    setIsFiltered(true);
    //setErrorMovies("");
    setErrorSearchFormSpan("")
    setActiveShowAllMovies(false);
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {pageLoading ? (
          <Preloader />
        ) : (
          <>
            <Routes>
              <Route path={AppRoute.Register} element={<Register register={handleRegisterClick} />} />
              <Route path={AppRoute.Login} element={<Login login={handleLoginClick} />} />
              <Route path={AppRoute.Main}
                element={<Main isLoggedIn={loggedIn} onOpenBurgerPopup={handleOpenBurgerPopup} />}
              />
              <Route path={AppRoute.Movies}
                element={
                  <ProtectedRouteElement
                    component={Movies}
                    errorMovies={errorMovies}
                    isLoggedIn={loggedIn}
                    isLoading={isLoading}
                    onOpenBurgerPopup={handleOpenBurgerPopup}
                    handleSaveMovie={handleSaveMovie}
                    handleFilteredMovies={handleFilteredMovies}
                    isFiltered={isFiltered}
                    activeShowAllMovies={activeShowAllMovies}
                    setActiveShowAllMovies={setActiveShowAllMovies}
                    handleShowAllMovies={handleShowAllMovies}
                    handleDeleteMovies={handleDeleteMovies}
                    movies={filteredAllMovies}
                    savedMovies={savedMovies}
                    errorSpan={errorSearchFormSpan}
                    setErrorSpan={setErrorSearchFormSpan}
                    handleCheckboxChange={handleCheckboxChange}
                    checkbox={checkbox}
                  />
                }
              />
              <Route path={AppRoute.SavedMovies}
                element={
                  <ProtectedRouteElement
                    component={SavedMovies}
                    handleDeleteMovies={handleDeleteMovies}
                    isLoggedIn={loggedIn}
                    onOpenBurgerPopup={handleOpenBurgerPopup}
                    isLoading={isLoading}
                    handleSaveMovie={handleSaveMovie}
                    setFormValue={setFormValueSave}
                    checkbox={checkboxSave}
                    formValue={formValueSave}
                    setCheckbox={setCheckboxSave}
                    errorSaveMovies={errorSaveMovies}
                    movies={savedFilterMovies}
                    handleFilterMovies={handleFilterSaveMovies}
                   setActiveShowAllMovies={setActiveShowAllMovies}
                  />
                }
              />
              <Route
                path={AppRoute.Profile}
                element={
                  <ProtectedRouteElement
                    component={Profile}
                    isLoggedIn={loggedIn}
                    onOpenBurgerPopup={handleOpenBurgerPopup}
                    currentUser={currentUser}
                    onUpdateUser={handleUpdateUserClick}
                    updateUserError={updateUserError}
                    signOut={signOut}
                  />
                }
              />
              <Route path={AppRoute.NotFound} element={<NotFound />} />
            </Routes>
            <InfoTooltip
              isOpen={isOpenInfoTooltip}
              onClose={closeAllPopups}
              registerResponse={registerResponse}
            />
            <BurgerPopup isOpen={isOpenBurgerPopup} onClose={closeAllPopups} />
          </>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
