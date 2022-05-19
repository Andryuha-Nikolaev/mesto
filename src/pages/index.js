import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  buttonEdit,
  formProfile,
  nameInput,
  aboutInput,
  buttonAdd,
  formCard,
  validationSettings
} from "../utils/constants.js";

const validationPopupProfile = new FormValidator(validationSettings, formProfile); //создаем экземпляр валидации для формы редактирования профиля
validationPopupProfile.enableValidation(); //вызываем enableValidation для формы профиля

const validationPopupCard = new FormValidator(validationSettings, formCard); //создаем экземпляр валидации для формы добавления карточки
validationPopupCard.enableValidation(); //вызываем enableValidation для формы картинки

//кнопка открытия попапа добавления фото
buttonAdd.addEventListener('click', () => {
  validationPopupCard.resetPopupForm(); //сбасываем ошибки валидации и проверяем на валидность поля
  popupWithFormAdd.open();
});

//экземпляр класса для попапа добавления фото
const popupWithFormAdd = new PopupWithForm(
  {
    submitForm: (data) => {
      const cardPopup = createCard(data);
      cardsList.addItem(cardPopup);
      popupWithFormAdd.close();
    }
  }, '#popup-add');
popupWithFormAdd.setEventListeners();

//функция создания карточки
const createCard = function createCard(data) {
  const card = new Card({
    data, handleCardClick: (name, link) => {
      popupViewImage.open(name, link);
    }
  }, '#template-list-item'); //создадим экземпляр карточки
  const cardElement = card.generateCard(); //создадим карточку и возвращаем наружу
  return cardElement; //вернем карточку
};

//создаем экземпляр класса Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({
  data: initialCards,//передаем массив с карточками
  renderer: (item) => {//передаем функцию
    const cardArray = createCard(item);
    cardsList.addItem(cardArray);//вставляем элемент в разметку с помощью функции addItem из класса Section
  }
},
  '.elements__list');
cardsList.renderItems();//вызываем функцию которая переберет переданный массив и вызовет для каждого элемента функцию
//переданную в renderer



const popupViewImage = new PopupWithImage('.popup_view-image'); //экзепляр класса для открытия попапа увеличения картинки
popupViewImage.setEventListeners(); //подключаем слушатели



const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__caption' });

//кнопка открытия попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;//при открытии попапа значение инпута имени равно имени профиля
  aboutInput.value = profileInfo.about;//при открытии попапа значение инпута о себе равно о себе профиля
  validationPopupProfile.resetPopupForm(); //сбасываем ошибки валидации и проверяем на валидность поля
  popupWithFormEdit.open();
});

//экземпляр класса для попапа профиля
const popupWithFormEdit = new PopupWithForm(
  {
    submitForm: (data) => {
      userInfo.setUserInfo(data);
      popupWithFormEdit.close();
    }
  }, '#popup-edit');
popupWithFormEdit.setEventListeners();
