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

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(this.__checkResponse);
  }
}

export const api = new Api({
  // baseUrl: 'https://api.movies.peshekhonova.nomoredomains.monster'
 baseUrl: 'http://localhost:3000',
});