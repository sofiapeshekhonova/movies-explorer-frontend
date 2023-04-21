import {Routes, Route, useNavigate} from "react-router-dom";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.scss";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import {AppRoute} from "../../constants";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import {useEffect, useState} from "react";
import {register, login} from "../../utils/Auth";
import {api} from "../../utils/MainApi";
import {apiMovies} from "../../utils/MoviesApi";
import * as auth from "../../utils/Auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";

function App() {
  const [isOpenBurgerPopup, setisOpenBurgerPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, isLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [visibleFilms, setVisibleFilms] = useState([]);
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [updateUserError, setUpdateUserError] = useState("");
  const [pageLoading, setPageloading] = useState(true);
  const [activeShowAllMovies, isActiveShowAllMovies] = useState(false);
  const [allMoviesButton, setAllMoviesButton] = useState(false);
  const [errorMovies, setErrorMovies] = useState("");
  const [formValue, setFormValue] = useState("");  
  const [checkbox, setCheckbox] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [registerResponse, isregisterResponse] = useState({
    status: false,
    text: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      setIsLoading(true);      
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            isLoggedIn(true);
            setCurrentUser(res); 
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [navigate, token]);

  useEffect(() => {
    if (token) {
      isLoggedIn(true);
      setPageloading(true);
      Promise.all([api.getUserInfo(), apiMovies.getMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setMovies(movies);
          navigate({ replace: false });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPageloading(false))
    }
  }, [navigate, token]);

  function handleRegisterClick(password, email, name) {
    setIsLoading(true);
    register(password, email, name)
      .then((res) => {
        if (res) {
          isregisterResponse({
            status: true,
            text: "Вы успешно зарегистрировались!",
          });
          handleLoginClick(password, email)
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
        setIsLoading(false);
      }
      );
  }

  function handleLoginClick(password, email) {
    setIsLoading(true);
    login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        isLoggedIn(true);
        navigate("/movies", {replace: true});
        setCurrentUser(data);
      })
      .catch((res) => {
        if (res === "Ошибка 401") {
          setOpenInfoTooltip(true);
          isregisterResponse({
            status: false,
            text: "Пользователь с такой почтой не зарегистрирован",
          });
        } else if (!res) {
          isregisterResponse({
            status: false,
            text: res,
          });
        }
      })
  }

  function handleUpdateUserClick(value) {
    setIsLoading(true);
    api
    .saveNewUserInfo(value)
    .then((user) => {
      setCurrentUser(user);
    })
    .then(closeAllPopups)
    .catch((err) => {
      if (err === "Ошибка: 409") {
        setUpdateUserError("Пользователь с такой почтой уже зарегистрирован")
      } else {
        setUpdateUserError(err)
      }
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    navigate(AppRoute.Login);
    isLoggedIn(false); 
    setCurrentUser('');
    localStorage.removeItem('filterMovies')
    localStorage.removeItem('allMovies')
  }

  useEffect(() => {
    function handleEscape(evt) {
      if (evt.key === "Escape") {
        closeBurgerPopup();
      }
    }

    function handleClosePopups(evt) {
      if (evt.target.classList.contains("burger-popup_active")) {
        closeBurgerPopup();
      }
    }

    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);

  function handleOpenBurgerPopup() {
    setisOpenBurgerPopup(true);
  }

  function closeBurgerPopup() {
    setisOpenBurgerPopup(false);
  }

  function closeAllPopups() {
    setOpenInfoTooltip(false);
  }
  
  function handleSaveMovie(movie) { 
    api.saveMovie(movie)
        .then((movie) => {
            setSavedMovies(savedMovies.concat(movie))
            console.log(movie)
            // setCardId(res._id);
            // setSavedFilms(savedFilms.concat(res));
            // setCopyOfSavedFilms(copyOfSavedFilms.concat(res));
        })
        .catch((err) => {
          console.log(err);
            //setSearchError(err);
        })
}
  function handleCheckboxClick(checkbox, movie) {
    setErrorMovies("")

    let filteredMovies = movies.filter(item => item.nameRU.toLowerCase().includes(movie.toLowerCase()));
    let sortAllMovies = movies.filter(movie => movie.duration <= 40);
    let sortFilteredMoviesMovies = filteredMovies.filter(movie => movie.duration <= 40);

    localStorage.setItem('filterMovies', JSON.stringify(filteredMovies));
    localStorage.setItem('checkbox', JSON.stringify(checkbox))
    localStorage.setItem('inputMovieName', movie);
    //localStorage.setItem('sortAllMovies', JSON.stringify(sortAllMovies))
    //localStorage.setItem('sortFilterMoviesMovies', JSON.stringify(sortFilteredMoviesMovies))

    if (filteredMovies.length !== 0 && !checkbox) {
      setVisibleFilms(filteredMovies)
    } else if (filteredMovies.length !== 0 && checkbox && sortFilteredMoviesMovies.length !==0) {
      setVisibleFilms(sortFilteredMoviesMovies);
    } else if (filteredMovies.length !== 0 && checkbox && sortFilteredMoviesMovies.length === 0) {
      setErrorMovies("Фильмы не найдены")
    } else if (filteredMovies.length === 0) {
      setErrorMovies("Фильмы не найдены")
    } else if (movie.length === 0) {
      setVisibleFilms(movies);
    } else if(movie.length === 0 && !checkbox) {
      setVisibleFilms(sortAllMovies);
    }
  }
  
  // localStorage.getItem('sortAllMovies')
  // localStorage.getItem('sortFilterMoviesMovies')
  useEffect(() => { 
    if (localStorage.getItem('filterMovies') && localStorage.getItem('checkbox')) { 
      const inputMovieName = localStorage.getItem('inputMovieName')
      //const filterFilms = JSON.parse(localStorage.getItem('filterMovies'));
      const checkbox = JSON.parse(localStorage.getItem('checkbox'));
      handleCheckboxClick(checkbox, inputMovieName);
      //setVisibleFilms(filterFilms);
      setFormValue(inputMovieName);
      setAllMoviesButton(true);
      setCheckbox(checkbox)
    } else if (localStorage.getItem('allMovies')) {
      const allFilms = JSON.parse(localStorage.getItem('allMovies'));  
      setVisibleFilms(allFilms);
    } else {
      setVisibleFilms('')
    }
}, [movies, allMoviesButton])


  useEffect(() => { //при нажатии на кнопку "все фильмы" 
    if (activeShowAllMovies === true) {
      localStorage.removeItem('filterMovies');
      localStorage.removeItem('inputMovieName');
      let allMovies = movies
      localStorage.setItem('allMovies', JSON.stringify(allMovies));
      setVisibleFilms(allMovies);
      window.scrollTo(0, 0);
      isActiveShowAllMovies(false);
      setAllMoviesButton(false);
      setErrorMovies('');
    } 
  },[activeShowAllMovies, movies])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route
              path={AppRoute.Register}
              element={<Register register={handleRegisterClick} />}
            ></Route>
            <Route
              path={AppRoute.Login}
              element={<Login login={handleLoginClick} />}
            />
            <Route
              path={AppRoute.Main}
              element={<Main isLoggedIn={loggedIn} onOpenBurgerPopup={handleOpenBurgerPopup}/>}
            />
            <Route
              path={AppRoute.Movies}
              element={
                <>
                {token && pageLoading ? <Preloader /> :
                <ProtectedRouteElement
                  component={Movies}
                  handleSaveMovie={handleSaveMovie}
                  setFormValue={setFormValue}
                  checkbox={checkbox}
                  formValue={formValue}
                  setCheckbox={setCheckbox}
                  errorMovies={errorMovies}
                  isLoggedIn={loggedIn}
                  onOpenBurgerPopup={handleOpenBurgerPopup}
                  isLoading={isLoading}
                  movies={visibleFilms}
                  handleCheckboxClick={handleCheckboxClick}
                  isActiveShowAllMovies={isActiveShowAllMovies}
                  allMoviesButton={allMoviesButton}
                  setAllMoviesButton={setAllMoviesButton}
                />
                }
                </>
              }
            />
            <Route
              path={AppRoute.SavedMovies}
              element={
                <ProtectedRouteElement
                  component={SavedMovies}
                  isLoggedIn={loggedIn}
                  onOpenBurgerPopup={handleOpenBurgerPopup}
                  isLoading={isLoading}
                  handleSaveMovie={handleSaveMovie}
                  setFormValue={setFormValue}
                  checkbox={checkbox}
                  formValue={formValue}
                  setCheckbox={setCheckbox}
                  errorMovies={errorMovies}
                  //isLoggedIn={loggedIn}
                 // onOpenBurgerPopup={handleOpenBurgerPopup}
                 // isLoading={isLoading}
                 // movies={visibleFilms}
                  handleCheckboxClick={handleCheckboxClick}
                  isActiveShowAllMovies={isActiveShowAllMovies}
                  allMoviesButton={allMoviesButton}
                  setAllMoviesButton={setAllMoviesButton}
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
                  setUpdateUserError={setUpdateUserError}
                  signOut={signOut}
                />
              }
            />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
          </Routes>
        )}
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          registerResponse={registerResponse}
        />
        <BurgerPopup isOpen={isOpenBurgerPopup} onClose={closeBurgerPopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
