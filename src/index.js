import angular from 'angular';
import routes from './routes';
import uiRouter from 'angular-ui-router';
import angularJwt from 'angular-jwt';
import typeahead from 'angular-ui-bootstrap/src/typeahead';
import tabs from 'angular-ui-bootstrap/src/tabs';
import datepicker from 'angular-ui-bootstrap/src/datepicker';
import buttons from 'angular-ui-bootstrap/src/buttons';
require('ng-table/dist/ng-table');
require('angular-i18n/angular-locale_ru.js');

import services from './services';
import directives from './directives';

angular.module('KIK', [
  uiRouter,
  angularJwt,
  typeahead,
  datepicker,
  tabs,
  buttons,
  'ngTable',
  services,
  directives
])

.config(['$locationProvider', '$httpProvider', 'jwtInterceptorProvider',
  ($locationProvider, $httpProvider, jwtInterceptorProvider) => {
  $locationProvider.html5Mode(true).hashPrefix('!');

  jwtInterceptorProvider.tokenGetter = function() {
    return localStorage.getItem('idToken');
  };

  $httpProvider.interceptors.push('jwtInterceptor');
  $httpProvider.interceptors.push('apiErrorHandler');
}])

.config(['$stateProvider', routes]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['KIK']);
});
