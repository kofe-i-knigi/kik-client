import AdminCtrl from './controllers/admin';
import LoginCtrl from './controllers/login';
import RegisterCtrl from './controllers/register';
import UserListCtrl from './controllers/users';
import StoreListCtrl from './controllers/stores';
import DashboardCtrl from './controllers/dashboard';
import MenuCtrl from './controllers/menu';

export default function($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: '/templates/admin.html',
      controller: AdminCtrl,
      controllerAs: 'adminCtrl'
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
      templateUrl: '/templates/users.html',
      controller: UserListCtrl,
      controllerAs: 'vm'
    })

    .state('admin.stores', {
      url: '/stores',
      templateUrl: '/templates/stores.html',
      controller: StoreListCtrl,
      controllerAs: 'vm'
    })

    .state('menu', {
      url: '/menu',
      templateUrl: '/templates/menu.html',
      controller: MenuCtrl,
      controllerAs: 'vm'
    });
}
