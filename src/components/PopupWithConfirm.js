import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._submitForm = submitForm;

    this._form = this._popup.querySelector('.form');
  }

  //метод в который в экземпляре класса Card будет записываться функция, срабатывающая при сабмите
  //попапа подтверждения
  submitCallback(removing) {
    this._handleSubmit = removing;
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
