
export default class Card {
  // в конструкторе будут динамические данные,
  // для каждого экземпляра свои
  constructor({ data, userId, handleCardClick, handleDelIconClick, handleSetLike, handleDeleteLike }, cardSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;// айди пользователя
    this._cardOwnerId = data.owner._id; // айди создателя карточки
    this._cardId = data._id;// айди карточки
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;

    this._handleDelIconClick = handleDelIconClick;// метод, который срабатывает при нажатии на иконку удаления карточки
    this._handleSetLike = handleSetLike;// метод установки лайка
    this._handleDeleteLike = handleDeleteLike;// метод удаления лайка


    this._element = this._getTemplate(); //Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._cardImage = this._element.querySelector('.elements__image'); //изображение карточки
    this._cardText = this._element.querySelector('.elements__text'); //описание карточки
    this._like = this._element.querySelector('.elements__like-button'); //кнопка лайка карточки
    this._delete = this._element.querySelector('.elements__delete-button'); //кнопка удаления карточки

    this._likesCounter = this._element.querySelector(".elements__like-counter");

    // метод, который срабатывает при установке лайка
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

  //функция удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //слушатели событий
  _setEventListeners() {
    this._delete.addEventListener('click', () => {
      this._handleDelIconClick(this._cardId);//принимает айди данной карточки, и по нему удаляет карточку с сервера
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);// открытие попапа картинки по клику
    });

    this._like.addEventListener('click', () => {
      if (this._like.classList.contains('elements__like-button_active')) {
        this._handleDeleteLike(this._cardId);
      } else {
      this._handleSetLike(this._cardId);
      }
    });
  }

  generateCard() {
    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._handleDeleteButton();//при создании карточки с сервера проверяется совпадает ли айди пользователя с айди создателя карточки

    this._likesCounter.textContent = this._likes.length;//счетчик количества лайков, берет длину массива лайков и добавляет в разметку

    this._checkLikedState();

    this._setEventListeners();
    // Вернём элемент наружу
    return this._element;
  }

  // поставить/удалить лайк, изменение количества лайков
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesCounter.textContent = this._likes.length;
    this._like.classList.toggle('elements__like-button_active');
  }

  _checkLikedState() {
    this._data.likes.forEach((likeUser) => {
      if (likeUser._id === this._userId) {
        this._like.classList.add('elements__like-button_active');
      }
    })
  }

  // метод оставляет иконки удаления только на созданных пользователем карточках
  _handleDeleteButton() {
    if (this._userId !== this._cardOwnerId) {
      this._delete.remove();
    }
  }
}
