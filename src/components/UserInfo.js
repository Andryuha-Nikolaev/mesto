export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    };

    return userInfo;
  };

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
  };
}
