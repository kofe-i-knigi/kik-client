export default function($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: '/templates/app.html',
      controller: 'AppCtrl as appCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginCtrl as vm'
    })

    .state('admin.dashboard', {
      url: '',
      templateUrl: '/templates/dashboard.html'
    })

    .state('admin.users', {
      url: 'users',
      abstract: true,
      template: '<ui-view>'
    })

    .state('admin.users.list', {
      url: '',
      templateUrl: '/templates/users/list.html',
      controller: 'UserListCtrl as vm'
    });
}
