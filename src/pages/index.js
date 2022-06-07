import './index.css';

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirm from '../components/PopupWithConfirm';
import {
  buttonEdit,
  formProfile,
  buttonAvatar,
  formAvatar,
  nameInput,
  aboutInput,
  buttonAdd,
  formCard,
  validationSettings
} from "../utils/constants.js";

import Api from '../components/Api';



//_________API__________

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
    'Content-Type': 'application/json'
  }
});

// получение готовых карточек и данных о пользователе с сервера, после чего отрисовывается вся страница
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([profileInfo, cardsData]) => {
    userId = profileInfo._id;// id пользователя
    userInfo.setUserInfo(profileInfo);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });



//_________Валидация__________

const validationPopupProfile = new FormValidator(validationSettings, formProfile); //создаем экземпляр валидации для формы редактирования профиля
const validationPopupAvatar = new FormValidator(validationSettings, formAvatar); //создаем экземпляр валидации для формы аватара
const validationPopupCard = new FormValidator(validationSettings, formCard); //создаем экземпляр валидации для формы добавления карточки

validationPopupProfile.enableValidation(); //вызываем enableValidation для формы профиля
validationPopupAvatar.enableValidation(); //вызываем enableValidation для формы аватара
validationPopupCard.enableValidation(); //вызываем enableValidation для формы картинки



//_________Создание карточек__________

// кнопка открытия попапа добавления фото
buttonAdd.addEventListener('click', () => {
  validationPopupCard.resetPopupForm(); //сбасываем ошибки валидации и проверяем на валидность поля
  popupWithFormAdd.open();
});

// экземпляр класса для попапа добавления фото
const popupWithFormAdd = new PopupWithForm(
  {
    submitForm: (data) => {
      popupWithFormAdd.loading(true);
      api.postCard(data)
        .then((res) => {
          cardsList.addItem(createCard(res), 'prepend');
          popupWithFormAdd.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAdd.loading(false);
        })
    }
  }, '#popup-add');
popupWithFormAdd.setEventListeners();

// функция создания карточки
const createCard = (data) => {
  const card = new Card({
    data: data,
    userId: userId,
    handleCardClick: (name, link) => {
      popupViewImage.open(name, link);
    },

    handleDelIconClick: (cardId) => {
      popupWithConfirm.open();
      popupWithConfirm.submitCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            popupWithConfirm.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },

    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleDeleteLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  }, '#template-list-item'); // создадим экземпляр карточки
  return card.generateCard(); // создадим карточку и возвращаем наружу
};

// создаем экземпляр класса Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({
  renderer: (item) => {// передаем функцию
    const cardArray = createCard(item);
    cardsList.addItem(cardArray, 'append');// вставляем элемент в разметку с помощью функции addItem из класса Section
  }
},
  '.elements__list');

// экзепляр класса для открытия попапа увеличения картинки
const popupViewImage = new PopupWithImage('.popup_view-image');
popupViewImage.setEventListeners();// вызываем слушатели

// экзепляр класса подтверждения удаления карточки
const popupWithConfirm = new PopupWithConfirm('#popup-confirm');
popupWithConfirm.setEventListeners();// вызываем слушатели



//_________Информация профиля__________

// экзепляр класса информации о пользователе
const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__caption', avatarSelector: '.profile__avatar' });

// кнопка открытия попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();//профиль инфо - объект, содержащий имя и описание профиля, записанные в разметку страницы
  nameInput.value = profileInfo.name;//при открытии попапа значение инпута имени равно имени профиля, берется из значения name объекта профиль инфо
  aboutInput.value = profileInfo.about;//при открытии попапа значение инпута о себе равно о себе профиля, берется из значения name объекта профиль инфо
  validationPopupProfile.resetPopupForm(); //сбасываем ошибки валидации и проверяем на валидность поля
  popupWithFormEdit.open();
});

// экземпляр класса для попапа редактирования профиля
const popupWithFormEdit = new PopupWithForm(
  {
    submitForm: (data) => {
      popupWithFormEdit.loading(true);
      api.setUserInfo(data)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupWithFormEdit.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormEdit.loading(false);
        })
    }
  }, '#popup-edit');
popupWithFormEdit.setEventListeners();

// кнопка открытия попапа изменения аватара
buttonAvatar.addEventListener('click', () => {
  validationPopupAvatar.resetPopupForm();
  popupWithFormAvatar.open();
});

// экземпляр класса попапа изменения аватара
const popupWithFormAvatar = new PopupWithForm(
  {
    submitForm: (data) => {
      popupWithFormAvatar.loading(true);
      api.setUserAvatar(data)
        .then((res) => {
          userInfo.setUserInfo(res);
          popupWithFormAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAvatar.loading(false);
        })
    }
  }, '#popup-avatar');
popupWithFormAvatar.setEventListeners();
