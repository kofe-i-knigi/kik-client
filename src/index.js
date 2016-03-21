import angular from 'angular';
import routes from './routes';
import uiRouter from 'angular-ui-router';
import angularJwt from 'angular-jwt';
require('ng-table');

import services from './services';

angular.module('KIK', [
  uiRouter,
  angularJwt,
  'ngTable',
  services
])

.config(($locationProvider, $httpProvider, jwtInterceptorProvider) => {
  $locationProvider.html5Mode(true).hashPrefix('!');

  jwtInterceptorProvider.tokenGetter = function() {
    return localStorage.getItem('idToken');
  };

  $httpProvider.interceptors.push('jwtInterceptor');
  $httpProvider.interceptors.push('apiErrorHandler');
})

.run(['$rootScope', '$state', ($rootScope, $state) => {

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    if (error.status == 404) {
      $state.go('pages.404');
    } else {
      console.error('Ошибка соединения');
    }
  });
}])

.config(['$stateProvider', routes])

angular.element(document).ready(() => {
  angular.bootstrap(document, ['KIK']);
});
