import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;

    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__button-save');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._formValue = {};
    this._inputList.forEach(input => {
      this._formValue[input.name] = input.value;
    });
    return this._formValue;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(isLoading, downloadMessage = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = downloadMessage;
      this._submitButton.classList.add('form__button-save_loading');
    } else {
      this._submitButton.textContent = this._submitButtonText;
      this._submitButton.classList.remove('form__button-save_loading');
  }
}
}
