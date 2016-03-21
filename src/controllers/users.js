export default class UsersListCtrl {
  constructor(User, ngTableParams) {
    const vm = this;

    vm.tableParams = new ngTableParams({
      page: 1,
      count: 20,
      sorting: {},
      filter: vm.filters,
      filterDelay: 1000
    }, {
      getData(params) {
        return User.query(params.url()).$promise.then((data) => {
          params.total(data.length);

          return data;
        });
      }
    });
  }
}

UsersListCtrl.$inject = ['User', 'ngTableParams'];
