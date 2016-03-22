import angular from 'angular';

import editableText from './editable-text';
import onEnter from './on-enter';

angular.module('app.directives', [])
.directive('onEnter', onEnter)
.directive('editableText', editableText);

export default 'app.directives';
