class LoginCtrl {
  constructor($state, Auth) {
    const vm = this;

    vm.logIn = () => {
      if (!(vm.login && vm.password)) {
        return
      }

      Auth.logIn({
        login: vm.login,
        password: vm.password
      })
      .then(() => $state.go('admin.users.list'))
      .catch((res) => console.log(res.data));
    };
  }
}

LoginCtrl.$inject = ['$state', 'Auth'];

export default LoginCtrl;
