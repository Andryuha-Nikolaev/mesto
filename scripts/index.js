const popupElement = document.querySelector('#popup-edit');
const editButton = document.querySelector('#edit-button');
const closeButton = popupElement.querySelector('#edit-close-button');
const formElement = document.querySelector('#edit-form');
const nameInput = formElement.querySelector('#input__name');
const jobInput = formElement.querySelector('#input__about');
const buttonSave = formElement.querySelector('#edit-button-save');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const addPopupElement = document.querySelector('#popup-add'); //подключаем попап добавления фото
const addButton = document.querySelector('#add-button'); //добавляем кнопку открытия попапа
const addFormElement = document.querySelector('#add-form'); //добавляем форму попапа
const namePhoto = addFormElement.querySelector('#photo-name'); //добавялем инпут названия фото
const linkPhoto = addFormElement.querySelector('#photo-link'); //добавляем инпут ссылки на фото
const addCloseButton = addPopupElement.querySelector('#add-close-button'); //добавляем кнопку закрытия попапа
const addButtonSave = addFormElement.querySelector('#add-button-save'); //добавляем кнопку сохранения попапа
const photosContainer = document.querySelector('.elements__list'); //подключили список элементов

const template = document.querySelector('#template-list-item');

const imagePopupElement = document.querySelector('#popup-image'); //подкелючаем попап картинки
const imagePopupClose = imagePopupElement.querySelector('#image-close-button'); //подключаем кнопку закрытия попапа
const imagePopupImage = imagePopupElement.querySelector('.popup__image'); //подключаем изображение попапа
const imagePopupDescription = imagePopupElement.querySelector('.popup__description'); //подключаем описание картинки попапа

//функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//кнопка октрытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCaption.textContent;
  openPopup(popupElement);
})

//кнопка закрытия попапа редактирования профиля
closeButton.addEventListener('click', () => {
  closePopup(popupElement);
})

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = jobInput.value;
  closePopup(popupElement);
}

formElement.addEventListener('submit', handleProfileFormSubmit);

//массив фото
const initialCards = [
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

//кнопка открытия попапа добавления фото
addButton.addEventListener('click', () => {
  openPopup(addPopupElement);
});

//кнопка закрытия попапа добавления фото
addCloseButton.addEventListener('click', () => {
  closePopup(addPopupElement)
});

//кнопка закрытия попапа картинки
imagePopupClose.addEventListener('click', () => {
  closePopup(imagePopupElement)
});

//функция сгенерирует html элемент и вернет его
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


const renderPhoto = (photoCard) => {
  photosContainer.prepend(createPhoto(photoCard));
} //функция принимает photoCard, создает строку с использованием значений photoCard и добавляет ее в начало списка elements__list

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


const elements = initialCards.map(photoCard => {
  return createPhoto(photoCard);
}); //перебираем массив и выводим результат в новый отдельный массив

photosContainer.append(...elements);
addFormElement.addEventListener('submit', addPhoto); //вешаем обработчик события на форму добавления новой карточки. При нажатии на Создать, выполнятся функция addPhoto

