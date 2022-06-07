export default class Api {
  constructor(options) {//конструктор принимает url сервера и заголовки запроса
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // метод проверяет пришел ли ответ от сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();//если да, то возвращает полученные данные
    }
    return Promise.reject(`Error: ${res.status}`);//иначе возвращает ошибку
  }

  // метод изменяет данные профиля на сервере
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',//метод запроса
      headers: this._headers,//заголовки запроса
      body: JSON.stringify({//тело запроса
        name: data.name,//в name передаем значение name объекта, переданного в setUserInfo
        about: data.about//в about передаем значение about объекта, переданного в setUserInfo
      })
    }).then(this._handleResponse)
  }

  // метод изменяет аватар на сервере
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._handleResponse)
  }

  // метод делает запрос серверу и получает данные профиля
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleResponse)
  }

  // метод получения карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleResponse)
  }

  // метод добавления новой карточки на сервер
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse)
  }

  // метод удаления карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleResponse)
  }

  // метод установки лайка
  setLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  // метод удаления лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }
}
