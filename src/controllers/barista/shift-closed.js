export default class ShiftClosedCtrl {
  constructor(Auth) {
    this.Auth = Auth;
  }

  logout() {
    this.Auth.logout();
  }
}

ShiftClosedCtrl.$inject = ['Auth'];
