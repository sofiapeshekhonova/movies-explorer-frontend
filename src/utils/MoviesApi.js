// https://api.nomoreparties.co/beatfilm-movies

class Api {
  constructor( {baseUrl}) { //прнимает ссылку и хеадерс
    this._baseUrl = baseUrl;

    this.__checkResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getMovies() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this.__checkResponse);
  }
}


export const apiMovies = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});