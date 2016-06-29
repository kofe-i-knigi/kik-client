export default class LoginCtrl {
  constructor($state, Auth) {
    this.$state = $state;
    this.Auth = Auth;

    this.user = Auth.myUser();
    this.redirect();
  }

  logIn() {
      if (!(this.login && this.password)) {
        return;
      }

      this.Auth.logIn({
        login: this.login,
        password: this.password
      })
      .then((res) => {
        this.user = res.data;
        this.redirect();
      })
      .catch((res) => console.log(res.data));
  }

  redirect() {
    if (!localStorage.idToken) {
      return;
    }

    if (this.user.role == 'admin') {
      this.$state.go('admin.dashboard');
    } else if (this.user.role == 'barista') {
      this.$state.go('barista.cashbox.menu');
    }
  }
}

LoginCtrl.$inject = ['$state', 'Auth'];
