import angular from 'angular';
import ngResource from 'angular-resource';

import Auth from './auth';
import User from './user';
import Store from './store';
import Stock from './stock';
import Delivery from './delivery';
import Product from './product';
import MenuItem from './menu-item';
import Category from './category';
import Shift from './shift';
import apiErrorHanler from './api-error-handler';

import apiCached from './api-cached';
import Receipt from './receipt';

angular.module('app.services', [ngResource])
.service('Auth', Auth)
.service('User', User)
.service('Store', Store)
.service('Stock', Stock)
.service('Delivery', Delivery)
.service('Product', Product)
.service('MenuItem', MenuItem)
.service('apiCached', apiCached)
.service('Receipt', Receipt)
.service('Category', Category)
.service('Shift', Shift)
.service('apiErrorHandler', apiErrorHanler);

export default 'app.services';
