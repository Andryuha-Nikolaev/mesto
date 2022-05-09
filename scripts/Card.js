// import { openPopup } from './index.js';

export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._element = this._getTemplate(); // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardText = this._element.querySelector('.elements__text');
  }

  _getTemplate() {//Задача метода _getTemplate — вернуть разметку карточки через return
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
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

  _setEventListeners() {
    this._like = this._element.querySelector('.elements__like-button');
    this._like.addEventListener('click', () => {
      this._toggleLike();
    });

    this._delete = this._element.querySelector('.elements__delete-button');
    this._delete.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard() {
    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }
}
