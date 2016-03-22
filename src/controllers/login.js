export default class LoginCtrl {
  constructor($state, Auth) {
    this.$state = $state;
    this.Auth = Auth;
  }

  logIn() {
      if (!(this.login && this.password)) {
        return
      }

      this.Auth.logIn({
        login: this.login,
        password: this.password
      })
      .then(() => this.$state.go('admin.users'))
      .catch((res) => console.log(res.data));
  }
}

LoginCtrl.$inject = ['$state', 'Auth'];
