
export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor({ data, ownerId, handleCardClick, handleDelIconClick, addCardLike }, cardSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = ownerId;// айди пользователя
    this._cardOwnerId = data.owner._id; // айди создателя карточки
    this._cardId = data._id;// айди карточки
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._handleDelIconClick = handleDelIconClick;// метод, который срабатывает при нажатии на иконку удаления карточки



    this._element = this._getTemplate(); //Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._cardImage = this._element.querySelector('.elements__image'); //изображение карточки
    this._cardText = this._element.querySelector('.elements__text'); //описание карточки
    this._like = this._element.querySelector('.elements__like-button'); //кнопка лайка карточки
    this._delete = this._element.querySelector('.elements__delete-button'); //кнопка удаления карточки

    this._likesCounter = this._element.querySelector(".elements__like-counter");

    this._addCardLike = addCardLike;// метод, который срабатывает при установке лайка
  }

  //Задача метода _getTemplate — вернуть разметку карточки через return
  //забираем разметку из HTML и клонируем элемент
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__list-item')
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  //функция лайка
  _toggleLike() {
    this._like.classList.toggle('elements__like-button_active');
  }


  //функция удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //слушатели событий
  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._toggleLike();
    });

    this._delete.addEventListener('click', () => {
      this._handleDelIconClick(this._cardId);//принимает айди данной карточки, и по нему удаляет карточку с сервера
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);// открытие попапа картинки по клику
    });
  }

  generateCard() {
    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._handleDeleteButton();//при создании карточки с сервера проверяется совпадает ли айди пользователя с айди создателя карточки


    this._likesCounter.textContent = this._likes.length;//счетчик количества лайков, берет длину массива лайков и добавляет в разметку

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  // метод оставляет иконки удаления только на созданных пользователем карточках
  _handleDeleteButton() {
    if (this._ownerId !== this._cardOwnerId) {
      this._delete.remove();
    }
  }
}
