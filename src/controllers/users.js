export default class UsersListCtrl {
  constructor(User) {
    const vm = this;

    vm.users = User.query();
  }
}

UsersListCtrl.$inject = ['User'];
