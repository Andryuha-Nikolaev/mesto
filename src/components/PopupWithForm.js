import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitForm }, popupSelector) {
    super(popupSelector);
    this._submitForm = submitForm;

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
    this._form.addEventListener('submit', () => {
      this._submitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }
}

