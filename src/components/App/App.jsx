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
  //общее
  const [isOpenBurgerPopup, setisOpenBurgerPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageloading] = useState(true);
  const [loggedIn, isLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [updateUserError, setUpdateUserError] = useState("");
  const [errorMovies, setErrorMovies] = useState(""); 
  const [registerResponse, isregisterResponse] = useState({status: false, text: "",});
  //movies
  const [movies, setMovies] = useState([]);
  const [errorSearchFormSpan, setErrorSearchFormSpan] = useState(""); //ошибка при поиске фильмов
  const [checkbox, setCheckbox] = useState(false);
  const [activeShowAllMovies, setActiveShowAllMovies] = useState(false); //когда видна кнопка все фильмы
  const [isFiltered, setIsFiltered] = useState(false); //происходила ли фильтрация исходного массива
  const [filteredAllMovies, setFilteredAllMovies] = useState([]); //отфильтрованный массив
  const [formValue, setFormValue] = useState("")
//SavedMovies
  const [checkboxSave, setCheckboxSave] = useState(false)
  const [savedMovies, setSavedMovies] = useState([]);
  const [formValueSave, setFormValueSave] = useState("");
  const [errorSearchSavedMoviesPage, setErrorSearchSavedMoviesPage] = useState("") //ошибка при поиске фильмов
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [value, setValue] = useState("")
  const [checkboxSavePage, setCheckboxSavePage]= useState(false)

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => { //информация юзера
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

  useEffect(() => { // при перезагрузке
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

  useEffect(() => { //все фильмы из api
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

  useEffect(() => { //сохраненные фильмы из api
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

  useEffect(() => { //закрытие попапов
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
    setCheckbox(false);
    localStorage.clear();
    setFilteredAllMovies({});
    setIsFiltered(false);
    setFormValue("")
    setValue("")
    setFormValueSave("")
    setCheckboxSavePage(false)
    setCheckboxSave(false)
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

  function handleFilteredMovies(formValue, checkbox) { //при нажатии на кнопку найти
    setActiveShowAllMovies(true)
    setIsFiltered(true);
    let filteredMovies = movies.filter((item) =>
      item.nameRU.toLowerCase().includes(formValue.toLowerCase()));
    let sortFilteredMovies = filteredMovies.filter(
      (movie) => movie.duration <= 40);
    localStorage.setItem('formValue', JSON.stringify(formValue));
    if(checkbox) {
      filteredMovies = sortFilteredMovies;
    }
    setFilteredAllMovies(filteredMovies);
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
  }
 
  function handleShowAllMovies() {
    setFilteredAllMovies(movies)
    localStorage.removeItem("filteredMovies")
    localStorage.removeItem("formValue")
    localStorage.removeItem("chechbox")
    localStorage.setItem('allMovies', JSON.stringify(movies));
    window.scrollTo(0, 0);
    setIsFiltered(true);
    setFormValue("")
    setErrorSearchFormSpan("")
    setActiveShowAllMovies(false);
    setCheckbox(false);
  }

  function handleCheckboxFiltered(checkbox) {
    setIsFiltered(true);
    let filterMovies
    if(localStorage.getItem('filteredMovies')) {
      const films = JSON.parse(localStorage.getItem('filteredMovies'));
      let sortFilteredMovies = films.filter((movie) => movie.duration <= 40);
      if(checkbox) {
        filterMovies = sortFilteredMovies;
      } else if(localStorage.getItem('formValue')){
        setActiveShowAllMovies(true)
        const formValue =  JSON.parse(localStorage.getItem('formValue'))
        filterMovies = movies.filter((item) =>
        item.nameRU.toLowerCase().includes(formValue.toLowerCase())); 
      } else if(!checkbox && !localStorage.getItem('allMovies')) {
        setActiveShowAllMovies(true)
        filterMovies = films
      } else if (!checkbox && localStorage.getItem('allMovies')) {
        filterMovies = movies
      }
    } else if(localStorage.getItem('allMovies')) {
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      let sortFilteredMovies = allMovies.filter((movie) => movie.duration <= 40);
        if(checkbox) {
          filterMovies = sortFilteredMovies;
        } else if (!checkbox) {
          filterMovies = allMovies;
        }
    } else if(!localStorage.getItem('filteredMovies') &&  !localStorage.getItem('allMovies')) {
      setErrorMovies("Начните поиск")
    }
    setFilteredAllMovies(filterMovies);
    localStorage.setItem('filteredMovies', JSON.stringify(filterMovies));

  }

  useEffect(()=> {
    if(localStorage.getItem('filteredMovies')) {
      setIsFiltered(true)
      const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
      setFilteredAllMovies(filteredMovies); 
    } else if (localStorage.getItem('allMovies')) {
      setIsFiltered(true)
      const allMovies = JSON.parse(localStorage.getItem('allMovies'));
      setFilteredAllMovies(allMovies); 
    } else {
      setFilteredAllMovies({});
    }
  },[])

  //сохраненные фильмы
  function handleFilterSaveMovies(inputSearch) {
    setValue(inputSearch);
  }

  function handleCheckboxFilteredSaveMovies(checkbox) {
    setCheckboxSavePage(checkbox)
  }

  useEffect(() => {
    let filteredMovies = savedMovies.filter((item) =>
    item.nameRU.toLowerCase().includes(value.toLowerCase()));
    if(checkboxSavePage) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.duration <= 40);
    } 
    setFilteredMovies(filteredMovies)
  }, [savedMovies, value, checkboxSavePage]);

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
                    handleCheckboxFiltered={handleCheckboxFiltered}
                    checkbox={checkbox}
                    setCheckbox={setCheckbox}
                    formValue={formValue} 
                    setFormValue={setFormValue}
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
                    errorSpan={errorSearchSavedMoviesPage}
                    setErrorSpan={setErrorSearchSavedMoviesPage}
                    handleSaveMovie={handleSaveMovie}
                    formValue={formValueSave}
                    setFormValue={setFormValueSave}
                    checkbox={checkboxSave}
                    setCheckbox={setCheckboxSave}
                    movies={filteredMovies}
                    handleFilteredMovies={handleFilterSaveMovies} 
                    handleCheckboxFiltered={handleCheckboxFilteredSaveMovies}
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
