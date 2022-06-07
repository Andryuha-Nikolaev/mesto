import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__button-save');
  }

  //метод в который в экземпляре класса Card будет записываться функция, срабатывающая при сабмите
  //попапа подтверждения
  submitCallback(del) {
    this._handleSubmit = del;
  }

  //слушатель сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();// сброс стандартного поведения при сабмите
      this._handleSubmit();
    });
  }
}
