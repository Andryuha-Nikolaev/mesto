export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  //перебирает массив данных. Вызывает для каждого элемента функцию переданную в renderer
  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  //принимает параметр element и вставляет его в контейнер методом append
  addItem(element, place = 'prepend'){
    if (place === 'append') {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
