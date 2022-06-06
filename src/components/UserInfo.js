export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);//селектор имени в разметке
    this._about = document.querySelector(aboutSelector);//селектор описания в разметке
    this._avatar = document.querySelector(avatarSelector);//селектор аватар в разметке
  }

  //метод создает объект, значения которого берутся из разметки
  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,//name - значение имени из разметки, текст контект по селектору нэйм селектор
      about: this._about.textContent
    };

    return userInfo;//возвращает объект с ключами name и  about
  };

  //метод берет полученный обект, берет из него значения name и about, и записывает их в разметку по переданным селекторам в параметры экземпляра класса userInfo
  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  };
}
