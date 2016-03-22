import angular from 'angular';
import routes from './routes';
import uiRouter from 'angular-ui-router';
import angularJwt from 'angular-jwt';
require('ng-table');

import services from './services';
import directives from './directives';

angular.module('KIK', [
  uiRouter,
  angularJwt,
  'ngTable',
  services,
  directives
])

.config(($locationProvider, $httpProvider, jwtInterceptorProvider) => {
  $locationProvider.html5Mode(true).hashPrefix('!');

  jwtInterceptorProvider.tokenGetter = function() {
    return localStorage.getItem('idToken');
  };

  $httpProvider.interceptors.push('jwtInterceptor');
  $httpProvider.interceptors.push('apiErrorHandler');
})

.config(['$stateProvider', routes])

angular.element(document).ready(() => {
  angular.bootstrap(document, ['KIK']);
});
