class RegisterCtrl {
  constructor($state, Auth) {
    const vm = this;

    vm.user = {};

    vm.register = () => {
      Auth.register(vm.user)
      .then(() => $state.go('barista.dashboard'))
      .catch((res) => console.log(res.data));
    };
  }
}

RegisterCtrl.$inject = ['$state', 'Auth'];

export default RegisterCtrl;
