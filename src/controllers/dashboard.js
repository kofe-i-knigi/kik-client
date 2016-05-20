export default class DashboardCtrl {
  constructor(Auth) {
    const vm = this;

    Auth.getRegToken().then((res) => {
      vm.regToken = res.data.token;
    });

  }
}

DashboardCtrl.$inject = ['Auth'];
