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

import Api from '../components/Api';



let ownerId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
    'Content-Type': 'application/json'
  }
});


api.getUserInfo()
  .then((profileInfo) => {

    ownerId = profileInfo._id;
    userInfo.setUserInfo(profileInfo);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


api.getCards()
  .then((data) => {
    cardsList.renderItems(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// Загрузка готовых карточек и данных о пользователе с сервера
// Promise.all([api.getUserInfo()])
//   .then((data) => {
//     const [profileInfo, cardsData] = data;
//     ownerId = profileInfo._id;
//     userInfo.setUserInfo(profileInfo);
//     cardsList.renderCards(cardsData);
//   })
//   .catch((err) => {
//     console.log(`Ошибка: ${err}`);
//   });

// api.getInitialData()
//   .then((data) => {
//     const [profileInfo, cardsData] = data;
//     ownerId = profileInfo._id;
//     userInfo.setUserInfo(profileInfo);
//     cardsList.renderCards(cardsData);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

//тестовый вариант апи все в одном файле


// fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
//   method: 'GET',
//   headers: {
//     authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
//     'Content-Type': 'application/json'
//   }
// })
// .then((res) => {
//   if (res.ok) {
//     return res.json();
//   }

//   /* отклоняем промис, чтобы перейти
//   в блок catch, если сервер вернул ошибку */
//   return Promise.reject(`Что-то пошло не так: ${res.status}`);
// })
// .then((data) => {
//   userInfo.setUserInfo(data);
// })
// .catch((err) => {
//   console.log(err); // "Что-то пошло не так: ..."
// });







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
  renderer: (item) => {//передаем функцию
    const cardArray = createCard(item);
    cardsList.addItem(cardArray);//вставляем элемент в разметку с помощью функции addItem из класса Section
  }
},
  '.elements__list');


const popupViewImage = new PopupWithImage('.popup_view-image'); //экзепляр класса для открытия попапа увеличения картинки
popupViewImage.setEventListeners(); //подключаем слушатели



const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__caption' });

//слушатель открытия попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;//при открытии попапа значение инпута имени равно имени профиля
  aboutInput.value = profileInfo.about;//при открытии попапа значение инпута о себе равно о себе профиля
  validationPopupProfile.resetPopupForm(); //сбасываем ошибки валидации и проверяем на валидность поля
  popupWithFormEdit.open();
});


//экземпляр класса для попапа редактирования профиля
const popupWithFormEdit = new PopupWithForm(
  {
    submitForm: (data) => {
      // fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
      //   method: 'PATCH',
      //   headers: {
      //     authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     name: data.name,
      //     about: data.about
      //   })
      // })
      // .then((res) => {
      //   if (res.ok) {
      //     return res.json();
      //   }

      //   /* отклоняем промис, чтобы перейти
      //   в блок catch, если сервер вернул ошибку */
      //   return Promise.reject(`Что-то пошло не так: ${res.status}`);
      // })
      // .then((data) => {
      //   userInfo.setUserInfo(data);
      // })
      // .catch((err) => {
      //   console.log(err); // "Что-то пошло не так: ..."
      // })
      // .finally(() => {
      //   // popupWithFormEdit.renderLoading(false);
      //   popupWithFormEdit.close();
      // })


      // popupWithFormEdit.renderLoading(true, 'Загрузка...');
      api.setUserInfo(data)
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // popupWithFormEdit.renderLoading(false);
          popupWithFormEdit.close();
        })
    }
  }, '#popup-edit');
popupWithFormEdit.setEventListeners();
