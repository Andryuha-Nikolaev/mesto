import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._name =  this._popup.querySelector('.popup__description');
    this._link = this._popup.querySelector('.popup__image');
  }

  open (name, link) {
    this._link.src = link;
    this._name.alt = name;
    this._name.textContent = name;
    super.open();
}
}
