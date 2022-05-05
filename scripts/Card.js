import { openPopup } from './index.js';

export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {//Задача метода _getTemplate — вернуть разметку карточки через return
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector('#template-list-item')
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  _toggleLike() {
    this._like.classList.toggle('elements__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _openImagePopup() {
    const popupImage = document.querySelector('.popup_view-image'); //попап картинки
    const imagePopupImage = popupImage.querySelector('.popup__image'); //изображение попапа картинки
    const descriptionImagePopup = popupImage.querySelector('.popup__description'); //описание картинки попапа
    imagePopupImage.src = this._link;
    imagePopupImage.alt = this._name;
    descriptionImagePopup.textContent = this._name;
    openPopup(popupImage);
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.elements__like-button');
    this._like.addEventListener('click', () => {
      this._toggleLike();
    });
    this._delete = this._element.querySelector('.elements__delete-button');
    this._delete.addEventListener('click', () => {
      this._deleteCard();
    });
    this._image = this._element.querySelector('.elements__image');
    this._image.addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Добавим данные
    this._element.querySelector('.elements__image').src = this._link;
    this._element.querySelector('.elements__text').textContent = this._name;
    this._element.querySelector('.elements__image').alt = this._name;

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }
}
