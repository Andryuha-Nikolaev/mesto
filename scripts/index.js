const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#input__name');
const jobInput = formElement.querySelector('#input__about');
const buttonSave = formElement.querySelector('.popup__button-save');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');


function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCaption.textContent;
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleProfileFormSubmit);
