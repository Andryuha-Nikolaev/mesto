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



let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '6634f396-3fbd-4a4f-858c-8c72fb67fb49',
    'Content-Type': 'application/json'
  }
});


//функция делает запрос серверу и получает данные профиля
// api.getUserInfo()
//   .then((profileInfo) => {//берет данные из полученного с сервера объекта с данными(условно profileInfo)

//     ownerId = profileInfo._id;//ownerId это значение _id полученного обекта
//     userInfo.setUserInfo(profileInfo);//вызов метода setUserInfo экземпляра класса userInfo (класс UserInfo)
//     //метод берет полученный обект, берет из него значения name и about, и записывает их в разметку по переданным селекторам в параметры экземпляра класса userInfo
//   })
//   .catch((err) => {
//     console.log(`Ошибка: ${err}`);
//   });


// api.getCards()
//   .then((data) => {
//     cardsList.renderItems(data);
//   })
//   .catch((err) => {
//     console.log(`Ошибка: ${err}`);
//   });

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([profileInfo, cardsData]) => {
    userId = profileInfo._id;// айди пользователя
    userInfo.setUserInfo(profileInfo);
    cardsList.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });





const validationPopupProfile = new FormValidator(validationSettings, formProfile); //создаем экземпляр валидации для формы редактирования профиля
validationPopupProfile.enableValidation(); //вызываем enableValidation для формы профиля

const validationPopupCard = new FormValidator(validationSettings, formCard); //создаем экземпляр валидации для формы добавления карточки
validationPopupCard.enableValidation(); //вызываем enableValidation для формы картинки

const validationPopupAvatar = new FormValidator(validationSettings, formAvatar); //создаем экземпляр валидации для формы добавления карточки
validationPopupAvatar.enableValidation(); //вызываем enableValidation для формы картинки

//кнопка открытия попапа добавления фото
buttonAdd.addEventListener('click', () => {
  validationPopupCard.resetPopupForm(); //сбасываем ошибки валидации и проверяем на валидность поля
  popupWithFormAdd.open();
});

//экземпляр класса для попапа добавления фото
const popupWithFormAdd = new PopupWithForm(
  {
    submitForm: (data) => {
      popupWithFormAdd.loading(true);
      api.postCard(data)
        .then((res) => {
          cardsList.addItem(createCard(res), 'prepend');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAdd.loading(false);
          popupWithFormAdd.close();
        })
    }
  }, '#popup-add');
popupWithFormAdd.setEventListeners();

//функция создания карточки
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
  }, '#template-list-item'); //создадим экземпляр карточки
  const cardElement = card.generateCard(); //создадим карточку и возвращаем наружу
  return cardElement; //вернем карточку
};

//создаем экземпляр класса Section, который отвечает за отрисовку элементов на странице
const cardsList = new Section({
  renderer: (item) => {//передаем функцию
    const cardArray = createCard(item);
    cardsList.addItem(cardArray, 'append');//вставляем элемент в разметку с помощью функции addItem из класса Section
  }
},
  '.elements__list');


const popupViewImage = new PopupWithImage('.popup_view-image'); //экзепляр класса для открытия попапа увеличения картинки
popupViewImage.setEventListeners(); //подключаем слушатели

const popupWithConfirm = new PopupWithConfirm('#popup-confirm');
popupWithConfirm.setEventListeners();



const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__caption', avatarSelector: '.profile__avatar' });

//слушатель открытия попапа редактирования профиля
buttonEdit.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();//профиль инфо - объект, содержащий имя и описание профиля, записанные в разметку страницы
  nameInput.value = profileInfo.name;//при открытии попапа значение инпута имени равно имени профиля, берется из значения name объекта профиль инфо
  aboutInput.value = profileInfo.about;//при открытии попапа значение инпута о себе равно о себе профиля, берется из значения name объекта профиль инфо
  validationPopupProfile.resetPopupForm(); //сбасываем ошибки валидации и проверяем на валидность поля
  popupWithFormEdit.open();
});


//экземпляр класса для попапа редактирования профиля
const popupWithFormEdit = new PopupWithForm(
  {
    submitForm: (data) => {
      popupWithFormEdit.loading(true);
      api.setUserInfo(data)
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormEdit.loading(false);
          popupWithFormEdit.close();
        })
    }
  }, '#popup-edit');
popupWithFormEdit.setEventListeners();

//слушатель открытия попапа изменения аватара
buttonAvatar.addEventListener('click', () => {
  // validationPopupAvatar.resetPopupForm();
  popupWithFormAvatar.open();
});

//экземпляр класса попапа изменения аватара
const popupWithFormAvatar = new PopupWithForm(
  {
    submitForm: (data) => {
      popupWithFormAvatar.loading(true);
      api.setUserAvatar(data)
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupWithFormAvatar.loading(false);
          popupWithFormAvatar.close();
        })
    }
  }, '#popup-avatar');
  popupWithFormAvatar.setEventListeners();
