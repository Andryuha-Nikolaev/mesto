const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('#popup-edit'); //попап редактирования профиля
const buttonEdit = document.querySelector('#edit-button'); //кнопка открытия попапа редактирования
const formProfile = document.querySelector('#edit-form'); //форма попапа редактирования профиля
const nameInput = formProfile.querySelector('#name-input'); //инпут имени
const jobInput = formProfile.querySelector('#about-input'); //инпут описания
const buttonSubmitProfile = formProfile.querySelector('#edit-button-save'); //кнопка сохранения попапа редактирования профиля
const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileCaption = document.querySelector('.profile__caption'); //описание профиля на странице

const popupCard = document.querySelector('#popup-add'); //попап добавления фото
const buttonAdd = document.querySelector('#add-button'); //кнопка открытия попапа добавления фото
const formCard = document.querySelector('#add-form'); //форма попапа добавления фото
const namePhoto = formCard.querySelector('#photo-input'); //инпут названия фото
const linkPhoto = formCard.querySelector('#link-input'); //инпут ссылки на фото
const buttobSubmitCard = formCard.querySelector('#add-button-save'); //кнопка сохранения попапа добавления фото
const photosContainer = document.querySelector('.elements__list'); //подключили список элементов

const template = document.querySelector('#template-list-item');//подключили темплейт

const popupImage = document.querySelector('.popup_view-image'); //попап картинки
const imagePopupImage = popupImage.querySelector('.popup__image'); //изображение попапа картинки
const descriptionImagePopup = popupImage.querySelector('.popup__description'); //описание картинки попапа


config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};



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
  inputList = Array.from(formProfile.querySelectorAll(".form__input"));
  toggleButtonState(inputList, buttonSubmitProfile, config);
  openPopup(popupProfile);
};

//функция попапа добавления фото
const openAddPopup = () => {
  formCard.reset();
  inputList = Array.from(formCard.querySelectorAll(".form__input"));
  toggleButtonState(inputList, buttobSubmitCard, config);
  openPopup(popupCard);
};

//кнопка октрытия попапа редактирования профиля
buttonEdit.addEventListener('click', openEditPopup);

//кнопка открытия попапа добавления фото
buttonAdd.addEventListener('click', openAddPopup);

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened'))  {
      closePopup(popup);
    }
    else if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

//функция изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  closePopup(popupProfile);
}

//обработчик изменяет данные профиля по нажатию кнопки сохранить
formProfile.addEventListener('submit', handleProfileFormSubmit);

//функция добавления карточки. сгенерирует html элемент и вернет его
const createPhoto = (photoCard) => {
  const card = template.content.querySelector('.elements__list-item').cloneNode(true);
  card.querySelector('.elements__text').textContent = photoCard.name;
  card.querySelector('.elements__image').src = photoCard.link;
  card.querySelector('.elements__image').alt = photoCard.name;

  //лайк
  card.querySelector('.elements__like-button').addEventListener('click', () => {
    event.target.classList.toggle('elements__like-button_active');
  })

  //удаление карточки
  card.querySelector('.elements__delete-button').addEventListener('click', () => {
    card.remove();
  })

  //открытие попапа картинки по клику на изображение
  card.querySelector('.elements__image').addEventListener('click', function () {
    imagePopupImage.src = photoCard.link;
    imagePopupImage.alt = photoCard.name;
    descriptionImagePopup.textContent = photoCard.name;

    openPopup(popupImage);
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
  let photoCard = {}; //создаем объект
  photoCard.name = namePhoto.value; //присваиваем для name объекта значение из инпута name
  photoCard.link = linkPhoto.value; //присваиваем для link объекта значение из инпута link
  renderPhoto(photoCard); //вызов функции добавляет строку в elements__list
  namePhoto.value = ''; //очищает инпут
  linkPhoto.value = ''; //очищает инпут
  closePopup(popupCard); //закрывает попап после добавления фото
}

//перебираем массив и выводим результат в новый отдельный массив
const elements = initialCards.map(photoCard => {
  return createPhoto(photoCard);
});

photosContainer.append(...elements);

//вешаем обработчик события на форму добавления новой карточки. При нажатии на Создать, выполнятся функция addPhoto
formCard.addEventListener('submit', addPhoto);
