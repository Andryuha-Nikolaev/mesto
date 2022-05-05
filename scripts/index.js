import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('#popup-edit'); //попап редактирования профиля
const buttonEdit = document.querySelector('#edit-button'); //кнопка открытия попапа редактирования
const formProfile = document.querySelector('#edit-form'); //форма попапа редактирования профиля
const nameInput = formProfile.querySelector('#name-input'); //инпут имени
const jobInput = formProfile.querySelector('#about-input'); //инпут описания
const profileName = document.querySelector('.profile__name'); //имя профиля на странице
const profileCaption = document.querySelector('.profile__caption'); //описание профиля на странице

const popupCard = document.querySelector('#popup-add'); //попап добавления фото
const buttonAdd = document.querySelector('#add-button'); //кнопка открытия попапа добавления фото
const formCard = document.querySelector('#add-form'); //форма попапа добавления фото
const namePhoto = formCard.querySelector('#photo-input'); //инпут названия фото
const linkPhoto = formCard.querySelector('#link-input'); //инпут ссылки на фото
const photosContainer = document.querySelector('.elements__list'); //подключили список элементов



const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const validationPopupProfile = new FormValidator(validationSettings, formProfile);//создаем экземпляр валидации для формы редактирования профиля
const validationPopupCard = new FormValidator(validationSettings, formCard);//создаем экземпляр валидации для формы добавления карточки

validationPopupProfile.enableValidation();
validationPopupCard.enableValidation();



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

//функция закрытия попапов на esc
const EscPress = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

//функция попапа редактирования профиля
const openEditPopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCaption.textContent;
  validationPopupProfile.resetPopupForm();
  openPopup(popupProfile);
};

//функция попапа добавления фото
const openAddPopup = () => {
  formCard.reset();
  validationPopupCard.resetPopupForm();
  openPopup(popupCard);
};

//кнопка октрытия попапа редактирования профиля
buttonEdit.addEventListener('click', openEditPopup);

//кнопка открытия попапа добавления фото
buttonAdd.addEventListener('click', openAddPopup);

//функция закрытия попапов
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    else if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});



//функция изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  closePopup(popupProfile);
};

//обработчик изменяет данные профиля по нажатию кнопки сохранить
formProfile.addEventListener('submit', handleProfileFormSubmit);



const createCard = (data) => {//функция создания карточки
  const card = new Card(data.name, data.link);// Создадим экземпляр карточки
  const cardElement = card.generateCard();// Создаём карточку и возвращаем наружу
  return cardElement;
};

const addCards = (items) => {//функция создания карточки из попапа
  const cardPopup = createCard(items);
  photosContainer.prepend(cardPopup);
};

initialCards.forEach((item) => {//добавление карточки из массива
  const cardArray = createCard(item);
  photosContainer.append(cardArray);
});

const addPhoto = (event) => {
  event.preventDefault(); //запрещаем выполнение события по умолчанию, чтобы при отправе страница не перезагружалась
  const items = {}; //создаем объект
  items.name = namePhoto.value; //присваиваем для name объекта значение из инпута name
  items.link = linkPhoto.value; //присваиваем для link объекта значение из инпута link
  addCards(items); //вызов функции добавляет строку в elements__list
  namePhoto.value = ''; //очищает инпут
  linkPhoto.value = ''; //очищает инпут
  closePopup(popupCard); //закрывает попап после добавления фото
};

//вешаем обработчик события на форму добавления новой карточки. При нажатии на Создать, выполнятся функция addPhoto
formCard.addEventListener('submit', addPhoto);

export { openPopup };
