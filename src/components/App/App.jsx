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

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path={AppRoute.Register} element={<Register />}></Route>
        <Route path={AppRoute.Login} element={<Login />}></Route>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Movies} element={<Movies />} />
        <Route path={AppRoute.SavedMovies} element={<SavedMovies />} />
        <Route path={AppRoute.Profile} element={<Profile />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
