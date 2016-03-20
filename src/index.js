import angular from 'angular';
import routes from './routes';
import uiRouter from 'angular-ui-router';

import controllers from './controllers';
import services from './services';

angular.module('KIK', [
  uiRouter,
  services,
  controllers
])

.config(($locationProvider) => {
  $locationProvider.html5Mode(true).hashPrefix('!');
})

.run(['$rootScope', '$state', ($rootScope, $state) => {

  $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
    if (error.status == 404) {
      $state.go('pages.404');
    } else {
      console.error('Ошибка соединения')
    }
  });
}])

.config(['$stateProvider', routes])

angular.element(document).ready(() => {
  angular.bootstrap(document, ['KIK']);
});
