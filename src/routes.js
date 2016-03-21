import AppCtrl from './controllers/app';
import LoginCtrl from './controllers/login';
import RegisterCtrl from './controllers/register';
import UserListCtrl from './controllers/users';
import DashboardCtrl from './controllers/dashboard';

export default function($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: '/templates/app.html',
      controller: AppCtrl,
      controllerAs: 'appCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: LoginCtrl,
      controllerAs: 'vm'
    })

    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: RegisterCtrl,
      controllerAs: 'vm'
    })

    .state('admin.dashboard', {
      url: '',
      templateUrl: '/templates/dashboard.html',
      controller: DashboardCtrl,
      controllerAs: 'vm'
    })

    .state('admin.users', {
      url: '/users',
      abstract: true,
      template: '<ui-view>'
    })

    .state('admin.users.list', {
      url: '',
      templateUrl: '/templates/users/list.html',
      controller: UserListCtrl,
      controllerAs: 'vm'
    });
}
