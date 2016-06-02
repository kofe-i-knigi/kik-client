import angular from 'angular';
import ngResource from 'angular-resource';

import Auth from './auth';
import User from './user';
import Store from './store';
import Stock from './stock';
import Delivery from './delivery';
import Product from './product';
import MenuItem from './menu-item';
import apiErrorHanler from './api-error-handler';

angular.module('app.services', [ngResource])
.service('Auth', Auth)
.service('User', User)
.service('Store', Store)
.service('Stock', Stock)
.service('Delivery', Delivery)
.service('Product', Product)
.service('MenuItem', MenuItem)
.service('apiErrorHandler', apiErrorHanler);

export default 'app.services';
