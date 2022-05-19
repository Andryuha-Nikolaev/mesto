export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //функция открытия попапа
open() {
  this._popup.classList.add('popup_opened'); //добавляем класс открытого попапа
  document.addEventListener('keydown', this._handleEscClose); //ставим слушатель на нажатие esc
};

//функция закрытия попапа
close() {
  this._popup.classList.remove('popup_opened'); //убираем класс открытого попапа
  document.removeEventListener('keydown', this._handleEscClose); //убираем слушатель на нажатие esc
};

//функция закрытия попапов на esc
_handleEscClose(evt) {
  if (evt.key === 'Escape') { //если действие происходит на кнопке esc
    this.close(); //то вызвать функцию закрытия попапа
  }
};

//слушатель закрытия попапов
setEventListeners() {
  this._popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
    else if (evt.target.classList.contains('popup__close-button')) {
      this.close();
    }
  });
}
}
