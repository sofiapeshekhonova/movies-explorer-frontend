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

  saveNewUserInfo(userInformaiton) {
     return fetch(this._baseUrl + '/users/me', {
       method: 'PATCH',
       headers: {
         Authorization: `Bearer ${localStorage.getItem('jwt')}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(userInformaiton)
     })
       .then(this.__checkResponse);
   }

   saveMovies(card) {
    const token = localStorage.getItem('jwt');
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameEN: card.nameEN,
        nameRU: card.nameRU,
      })
    }).then(this.__checkResponse);
  }

  getSavedMovies() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/movies`, {
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