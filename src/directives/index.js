import angular from 'angular';

import editableText from './editable-text';
import onEnter from './on-enter';
import menuCollapse from './menu-collapse';

angular.module('app.directives', [])
.directive('onEnter', onEnter)
.directive('editableText', editableText)
.directive('menuCollapse', menuCollapse);

export default 'app.directives';
