import angular from 'angular';
import ngResource from 'angular-resource';

import User from './user';
import Auth from './auth';

angular.module('app.services', [ngResource])
.service('User', User)
.service('Auth', Auth);

export default 'app.services';