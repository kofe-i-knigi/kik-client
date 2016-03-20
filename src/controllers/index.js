import angular from 'angular';

import AppCtrl from './app';
import LoginCtrl from './login';
import UserListCtrl from './users';

angular.module('app.controllers', [])
.controller('AppCtrl', AppCtrl)
.controller('UserListCtrl', UserListCtrl)
.controller('LoginCtrl', LoginCtrl);

export default 'app.controllers';
