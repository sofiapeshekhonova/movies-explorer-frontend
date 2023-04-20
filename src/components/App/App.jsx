import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
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
import {useEffect, useRef, useState} from "react";
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
  const [sortMovies, setSortMovies] = useState({});
  const [visibleFilms, setVisibleFilms] = useState([]);
  const [searchMovies, setSearchMovies] = useState([])
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [updateUserError, setUpdateUserError] = useState("");
  const [pageLoading, setPageloading] = useState(true);
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const [activeShowAllMovies, isActiveShowAllMovies] = useState(false);
  const [allMoviesButton, setAllMoviesButton] = useState(false);
  const [errorMovies, setErrorMovies] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [registerResponse, isregisterResponse] = useState({
    status: false,
    text: "",
  });
  const isMounted = useRef(false);
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

   // function handleSortMovies(movies) {
  //   const sortMovies = movies.filter(movie => movie.duration <= 40);
  //   return setSortMovies(sortMovies)
  // }

  function handleSortClick() {
    setActiveCheckbox(!activeCheckbox)
  }

  
  function handleSearchMovies(movie) {
    setErrorMovies("")
    let filterMovies = movies.filter(item => item.nameRU.toLowerCase().includes(movie.toLowerCase()));
    if (filterMovies.length !== 0) {
      localStorage.setItem('filterMovies', JSON.stringify(filterMovies));
      setVisibleFilms(filterMovies)
      //localStorage.setItem('inputText', JSON.stringify(movie));
      localStorage.setItem('inputMovieName', movie);
    } else {
      setErrorMovies("Фильмы не найдены")
  
    }
  }
  
  useEffect(() => { // эффект, который достает найденные фильмы из хранилища
    if (localStorage.getItem('filterMovies')) { 
        const filterFilms = JSON.parse(localStorage.getItem('filterMovies'));
        const inputText = JSON.parse(localStorage.getItem('inputText'));
        setSearchInputText(inputText);
        setVisibleFilms(filterFilms);
        setAllMoviesButton(true);
    } else if (localStorage.getItem('allMovies')) {
      const allFilms = JSON.parse(localStorage.getItem('allMovies'));  
      setVisibleFilms(allFilms);
    } else {
      setVisibleFilms('')
    }
}, [movies, allMoviesButton])


  useEffect(() => {
    if (activeShowAllMovies === true) {
      localStorage.removeItem('filterMovies')
      let allMovies = movies
      console.log(allMovies)
      localStorage.setItem('allMovies', JSON.stringify(allMovies));
      setVisibleFilms(allMovies);
      console.log(allMovies)
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
                  errorMovies={errorMovies}
                  isLoggedIn={loggedIn}
                  onOpenBurgerPopup={handleOpenBurgerPopup}
                  isLoading={isLoading}
                  movies={visibleFilms}
                  handleSortClick={handleSortClick}
                  activeCheckbox={activeCheckbox}
                  handleSearchMovies={handleSearchMovies}
                  isActiveShowAllMovies={isActiveShowAllMovies}
                  allMoviesButton={allMoviesButton}
                  setAllMoviesButton={setAllMoviesButton}
                  setSearchInputText={searchInputText}
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
