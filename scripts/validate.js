const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector)); // 2. Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  formList.forEach((formElement) => { // 3. Перебираем все найденные формы. Для каждой формы (formElement) выполняем блок кода в фигурных скобках.
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); // 4. У каждой формы отменим стандартное поведение
    });
    setEventListeners(formElement, obj); // 5. Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector)); // 6. Получаем коллекцию всех элементов группы полей с классом form__input. Преобразуем его в массив(иначе нам будет недоступен метод some())
  const buttonElement = formElement.querySelector(obj.submitButtonSelector); //7. Находим кнопку в группе полей с классом form__button-save.
  toggleButtonState(inputList, buttonElement, obj); // 8. Вызываем функцию toggleButtonState с передачей в нее массива найденных полей ввода и кнопки. Нужно для установки недоступного состояния кнопки при загрузке страницы.
  inputList.forEach((inputElement) => { // 12. Обходим массив найденных полей ввода. Для каждого поля ввода (inputElement) выполняем код в фигурных скобках
    inputElement.addEventListener('input', function () { // 13. Подключаем обработчик события input для поля ввода.
      checkInputValidity(formElement, inputElement, obj); // *20. Тут начинаю новую нумерацию, так как код будет выполнен только когда возникнет событие input. Вызывается функция checkInputValidity с передачей в нее группы полей и поля ввода на котором возникло событие input.
      toggleButtonState(inputList, buttonElement, obj); // *21. Вызываем функцию toggleButtonState. Будут выполненны пп 9-11
    });
  });
};

const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) { // 9. Вызываем функцию hasInvalidInput с передачей в нее массива полей ввода группы полей. Анализируем возвращенное функцией значение
    // сделай кнопку неактивной
    buttonElement.classList.add(obj.inactiveButtonClass); // 11.1 Если функция hasInvalidInput вернула Истина, то есть есть некорректные поля, то добавлять класс который оформляет кнопку в состояние неактивной.
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(obj.inactiveButtonClass); // 11.2 Если функция hasInvalidInput вернула Ложь, то есть все поля заполнены корректно, то удалить класс который оформляет кнопку в состояние неактивной.
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

const checkInputValidity = (formElement, inputElement, obj) => { // *21 Анализируем прошло ли проверку валидации значение содержащееся в поле ввода inputElement
  if (!inputElement.validity.valid) { // *21.1 Если НЕТ, то вызывается функция showInputError. В функцию передаем значение сообщения об ошибке сгенерированного браузером (свойство validationMessage поля ввода inputElement)
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else { // *21.2 Если ДА, то вызывается функция hideInputError
    hideInputError(formElement, inputElement, obj);
  }
};

const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // *21.1.1 Находим элемент в группе полей с классом содержащим идентификатор поля и суфикс -error (связанный с полем ввода span)
  inputElement.classList.add(obj.inputErrorClass); // *21.1.2 Для поля ввода с ошибкой добавляем класс form__input_type_error в котором мы определяем его оформление в случае ошибки (например цвет границы)
  errorElement.textContent = errorMessage; // *21.1.3 Устанавливаем текстовое содержимое связанного спана текстом ошибки из параметра errorMessage
  errorElement.classList.add(obj.errorClass); //*21.1.4 Для связанного спана добавляем класс в стилях которого определена его видимость (без него он скрыт)
};

const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // *21.2.1 Находим элемент в группе полей с классом содержащим идентификатор поля и суфикс -error (связанный с полем ввода span)
  inputElement.classList.remove(obj.inputErrorClass); // *21.2.2 Для поля ввода с ошибкой УДАЛЯЕМ класс form__input_type_error в котором мы определяем его оформление в случае ошибки (например цвет границы). Без него оформление поле ввода будет как задано в классе элемента.
  errorElement.classList.remove(obj.errorClass); // *21.1.4 Для связанного спана Удаляем класс в стилях которого определена его видимость. Скрываем элемент.
  errorElement.textContent = ''; // *21.1.4 Обнуляем текстовое содержимое спана. Ошибки нет.
};

const hasInvalidInput = (inputList) => { //10. Используем для перебора значений массива полей ввода функцию some(). Для каждого поля из массива проверяем корректно ли его содержимое. Если хотя бы одно из полей неккоретно, то some вернет Истину. Иначе Ложь. Это же значение мы вернем из функции.
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

enableValidation(config); // 1. Это единственная строчка кода которая лежит вне функции.
//При загрузке страницы произойдет вызов функции enableValidation()
