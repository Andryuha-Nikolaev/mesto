export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._initialArray = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  //перебирает массив данных _initialArray. Вызывает для каждого элемента функцию переданную в renderer
  renderItems(data) {
    // Переберем массив _initialArray с начальными карточками
    data.forEach(item => this._renderer(item));
  }

  //принимает параметр element и вставляет его в контейнер методом append
  addItem(element, place = 'prepend'){
  // {
  //   this._container.predend(element);
  // }
    if (place === 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
