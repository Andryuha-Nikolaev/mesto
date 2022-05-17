import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ formSubmit }, popupSelector) {
    super(popupSelector);
    this._formSubmit = formSubmit;

    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValue = {};
    this._inputList.forEach(input => {
      this._formValue[input.name] = input.value;
    });
    return this._formValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => this._formSubmit(this._getInputValues()));

  }

  close() {
    super.close();
    this._form.reset();
  }
}
