const popups = document.querySelectorAll('.popup'); //все попапы
const closeButton = document.querySelector('.popup__close-button'); //общая кнопка закрытия для всех попапов

const editPopupElement = document.querySelector('#popup-edit'); //попап редактирования профиля
const editButton = document.querySelector('#edit-button'); //кнопка открытия попапа редактирования
const editFormElement = document.querySelector('#edit-form'); //форма попапа редактирования профиля
const nameInput = editFormElement.querySelector('#input__name'); //инпут имени
const jobInput = editFormElement.querySelector('#input__about'); //инпут описания
const editButtonSave = editFormElement.querySelector('#edit-button-save'); //кнопка сохранения попапа редактирования профиля
const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileCaption = document.querySelector('.profile__caption'); //описание профиля на странице

const addPopupElement = document.querySelector('#popup-add'); //попап добавления фото
const addButton = document.querySelector('#add-button'); //кнопка открытия попапа добавления фото
const addFormElement = document.querySelector('#add-form'); //форма попапа добавления фото
const namePhoto = addFormElement.querySelector('#photo-name'); //инпут названия фото
const linkPhoto = addFormElement.querySelector('#photo-link'); //инпут ссылки на фото
const addButtonSave = addFormElement.querySelector('#add-button-save'); //кнопка сохранения попапа добавления фото
const photosContainer = document.querySelector('.elements__list'); //подключили список элементов

const template = document.querySelector('#template-list-item');//подключили темплейт

const imagePopupElement = document.querySelector('.popup_view-image'); //попап картинки
const imagePopupImage = imagePopupElement.querySelector('.popup__image'); //изображение попапа картинки
const imagePopupDescription = imagePopupElement.querySelector('.popup__description'); //описание картинки попапа

//функция закрытия попапов на esc
const EscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

//функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', EscPress);
};

//функция закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', EscPress);
};

//функция попапа редактирования профиля
const openEditPopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCaption.textContent;
  // validationPopupEdit.resetPopupForm();
  openPopup(editPopupElement);
};

//функция попапа добавления фото
const openAddPopup = () => {
  addFormElement.reset();
  // validationPopupAdd.resetPopupForm();
  openPopup(addPopupElement);
};

//кнопка октрытия попапа редактирования профиля
editButton.addEventListener('click', openEditPopup);

//кнопка открытия попапа добавления фото
addButton.addEventListener('click', openAddPopup);

//общая функция для закрытия выбранного попапа
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

//функция изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  closePopup(editPopupElement);
}

//обработчик изменяет данные профиля по нажатию кнопки сохранить
editFormElement.addEventListener('submit', handleProfileFormSubmit);

//функция добавления карточки. сгенерирует html элемент и вернет его
const createPhoto = (photoCard) => {
  const card = template.content.querySelector('.elements__list-item').cloneNode(true);
  card.querySelector('.elements__text').textContent = photoCard.name;
  card.querySelector('.elements__image').src = photoCard.link;

  //лайк
  card.querySelector('.elements__like-button').addEventListener('click', () => {
    event.target.classList.toggle('elements__like-button_active');
  })

  //удаление карточки
  card.querySelector('.elements__delete-button').addEventListener('click', () => {
    card.remove();
  })

  //открытие попапа картинки по клику на изображение
  card.querySelector('.elements__image').addEventListener('click', function() {
    imagePopupImage.src = photoCard.link;
    imagePopupImage.alt = photoCard.name;
    imagePopupDescription.textContent = photoCard.name;

    openPopup(imagePopupElement);
  })

  return card;
}

//функция принимает photoCard, создает строку с использованием значений photoCard и добавляет ее в начало списка elements__list
const renderPhoto = (photoCard) => {
  photosContainer.prepend(createPhoto(photoCard));
}

//функция добавляет фото
const addPhoto = (event) => {
  event.preventDefault(); //запрещаем выполнение события по умолчанию, чтобы при отправе страница не перезагружалась
  let photoCard = { }; //создаем объект
  photoCard.name = namePhoto.value; //присваиваем для name объекта значение из инпута name
  photoCard.link = linkPhoto.value; //присваиваем для link объекта значение из инпута link
  renderPhoto(photoCard); //вызов функции добавляет строку в elements__list
  closePopup(addPopupElement); //закрывает попап после добавления фото
  namePhoto.value = ''; //очищает инпут
  linkPhoto.value = ''; //очищает инпут
}

//перебираем массив и выводим результат в новый отдельный массив
const elements = initialCards.map(photoCard => {
  return createPhoto(photoCard);
});

photosContainer.append(...elements);

//вешаем обработчик события на форму добавления новой карточки. При нажатии на Создать, выполнятся функция addPhoto
addFormElement.addEventListener('submit', addPhoto);

