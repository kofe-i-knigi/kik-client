import angular from 'angular';
import ngResource from 'angular-resource';

import Auth from './auth';
import User from './user';
import Store from './store';
import apiErrorHanler from './api-error-handler';

angular.module('app.services', [ngResource])
.service('Auth', Auth)
.service('User', User)
.service('Store', Store)
.service('apiErrorHandler', apiErrorHanler);

export default 'app.services';
