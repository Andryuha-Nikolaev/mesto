export default class Api {
  constructor(options) {//конструктор принимает url сервера и заголовки запроса
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  //функция проверяет пришел ли ответ от сервера
  _handleOriginalResponse(res) {
    if (res.ok) {
      return res.json();//если да, то возвращает полученные данные
    }
    return Promise.reject(`Error: ${res.status}`);//иначе возвращает ошибку
  }

  //функция изменяет данные профиля на сервере
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',//метод запроса
      headers: this._headers,//заголовки запроса
      body: JSON.stringify({//тело запроса
        name: data.name,//в name передаем значение name объекта, переданного в setUserInfo
        about: data.about//в about передаем значение about объекта, переданного в setUserInfo
      })
    }).then(this._handleOriginalResponse)
  }

  //функция делает запрос серверу и получает данные профиля
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }

  //функция получения карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }

  //метод добавления новой карточки на сервер
  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',//метод запроса
      headers: this._headers,//заголовки запроса
      body: JSON.stringify({//тело запроса
        name: data.name,//в name передаем значение name объекта, переданного в setUserInfo
        link: data.link//в about передаем значение about объекта, переданного в setUserInfo
      })
    }).then(this._handleOriginalResponse)
  }

  // setUserAvatar(data) {
  //   return fetch(`${this._url}/users/me/avatar`, {
  //     method: 'PATCH',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       avatar: data.avatar
  //     })
  //   }).then(this._handleOriginalResponse)
  // }

  // deleteLike(data) {
  //   return fetch(`${this._url}/cards/likes/${data._id}`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   }).then(this._handleOriginalResponse)
  // }

  // setLike(data) {
  //   return fetch(`${this._url}/cards/likes/${data._id}`, {
  //     method: 'PUT',
  //     headers: this._headers,
  //   }).then(this._handleOriginalResponse)
  // }

  // deleteCard(data) {
  //   return fetch(`${this._url}/cards/${data._id}`, {
  //     method: 'DELETE',
  //     headers: this._headers
  //   }).then(this._handleOriginalResponse)
  // }

  // postCard(data) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'POST',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: data.name,
  //       link: data.link
  //     })
  //   }).then(this._handleOriginalResponse)
  // }



  // getInitialData() {
  //   return Promise.all([this.getUserInfo()]);
  // }

  // getCards() {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'GET',
  //     headers: this._headers
  //   }).then(this._handleOriginalResponse)
  // }

}
