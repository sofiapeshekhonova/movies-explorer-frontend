import {Routes, Route} from "react-router-dom";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.scss";
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { AppRoute } from "../../constants";
import BurgerPopup from "../BurgerPopup/BurgerPopup";
import { useEffect, useState } from "react";

function App() {
  const [isOpenBurgerPopup, setisOpenBurgerPopup] = useState(false);

  useEffect(() => {
    function handelEscape(evt) {
      if (evt.key === "Escape") {
        closeBurgerPopup();
      }
    }

    function handleClosePopups(evt) {
      if (
        evt.target.classList.contains("burger-popup_active")
      ) {
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
    setisOpenBurgerPopup(true)
  }

  function closeBurgerPopup () {
    setisOpenBurgerPopup(false)
  }
  
  return (
    <div className="page">
      <BurgerPopup isOpen={isOpenBurgerPopup} onClose={closeBurgerPopup}/>
      <Routes> 
        <Route path={AppRoute.Register} element={<Register />}></Route>
        <Route path={AppRoute.Login} element={<Login />}></Route>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Movies} element={<Movies onOpenBurgerPopup={handelOpenBurgerPopup}/>} />
        <Route path={AppRoute.SavedMovies} element={<SavedMovies onOpenBurgerPopup={handelOpenBurgerPopup}/>} />
        <Route path={AppRoute.Profile} element={<Profile onOpenBurgerPopup={handelOpenBurgerPopup}/>} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
