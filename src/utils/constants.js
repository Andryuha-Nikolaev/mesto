//масстив карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const buttonEdit = document.querySelector('#edit-button'); //кнопка открытия попапа редактирования
export const formProfile = document.querySelector('#edit-form'); //форма попапа редактирования профиля
export const nameInput = formProfile.querySelector('#name-input'); //инпут имени
export const aboutInput = formProfile.querySelector('#about-input'); //инпут описания

export const buttonAdd = document.querySelector('#add-button'); //кнопка открытия попапа добавления фото
export const formCard = document.querySelector('#add-form'); //форма попапа добавления фото

//объект с настройками валидации
export const validationSettings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};
