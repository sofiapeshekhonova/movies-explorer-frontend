import { Routes, Route } from 'react-router-dom';
// import Register from '../Register/Register';
// import Login from '../Login/Login';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';
import "./App.scss";
import Movies from '../Movies/Movies';

function App() {

  return (
    <div className="page">
        <Routes>
          {/* <Route path="/signup" element={
            <Register />
            }>
          </Route>
          <Route path="/signin" element={
            <Login />
            }>
          </Route> */}
           <Route path="/" element={ <Main />} /> 
           <Route path="/movies" element={ <Movies />} />
            <Route path="/saved-movies" element={ <SavedMovies />} />
           {/*<Route path="/profile" element={ <Profile />} /> */}
        {/* <Route path="*" element={<NotFound/>} />  */}
        </Routes>
    </div>
  );
}

export default App;
