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
import * as auth from '../../utils/Auth';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function App() {
  const [isOpenBurgerPopup, setisOpenBurgerPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, isLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [registerResponse, isregisterResponse] = useState({
    status: false,
    text: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    // если у пользователя есть токен в localStorage,эта функция проверит валидность токена
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            isLoggedIn(true); 
            setUserData(res); //получаем данные пользователя
            console.log(res)
            navigate(AppRoute.Movies, {replace: true});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate, token]);

  useEffect(() => {
    if (token) {
      isLoggedIn(true);
      setIsLoading(true);
      Promise.all([api.getUserInfo(), apiMovies.getMovies()])
        .then(([user]) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [token]);

  function handelRegisterClick(password, email, name) {
    register(password, email, name)
      .then((res) => {
        if (res) {
          isregisterResponse({
            status: true,
            text: "Вы успешно зарегистрировались!",
          });
          navigate(AppRoute.Login, {replace: true});
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
      .finally(() => setOpenInfoTooltip(true));
  }

  function handelLoginClick(password, email) {
    login(password, email)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      isLoggedIn(true);
      navigate('/movies',{replace: true});
    })
    .catch((res) => {
      if(res === 'Ошибка 401') {
        setOpenInfoTooltip(true);
        isregisterResponse({
          status: false,
          text: "Пользователь с такой почтой не зарегистрирован",
        });
      } else if(!res) {
        isregisterResponse({
          status: false,
          text: res,
        });
      }
    })
  } 

  useEffect(() => {
    function handelEscape(evt) {
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
    document.addEventListener("keydown", handelEscape);

    return () => {
      document.removeEventListener("keydown", handelEscape);
      document.removeEventListener("mousedown", handleClosePopups);
    };
  }, []);

  function handelOpenBurgerPopup() {
    setisOpenBurgerPopup(true);
  }

  function closeBurgerPopup() {
    setisOpenBurgerPopup(false);
  }

  function closeAllPopups() {
    setOpenInfoTooltip(false);
  }

  console.log(loggedIn)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BurgerPopup isOpen={isOpenBurgerPopup} onClose={closeBurgerPopup} />
        <Routes>
          <Route path={AppRoute.Register} element={
          <Register register={handelRegisterClick}/>}>
          </Route>
          <Route
            path={AppRoute.Login}
            element={<Login login={handelLoginClick} />}
          />
          <Route path={AppRoute.Main} element={<Main isLoggedIn={loggedIn} />} />
          <Route
            path={AppRoute.Movies}
            element={
              <ProtectedRouteElement 
                component={Movies}
                isLoggedIn={loggedIn}
                onOpenBurgerPopup={handelOpenBurgerPopup}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path={AppRoute.SavedMovies}
            element={
              <SavedMovies
                onOpenBurgerPopup={handelOpenBurgerPopup}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path={AppRoute.Profile}
            element={<Profile onOpenBurgerPopup={handelOpenBurgerPopup} />}
          />
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Routes>
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeAllPopups}
          registerResponse={registerResponse}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
