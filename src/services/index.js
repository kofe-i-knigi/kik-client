import angular from 'angular';
import ngResource from 'angular-resource';

import User from './user';
import Auth from './auth';
import apiErrorHanler from './api-error-handler';

angular.module('app.services', [ngResource])
.service('User', User)
.service('Auth', Auth)
.service('apiErrorHandler', apiErrorHanler);

export default 'app.services';