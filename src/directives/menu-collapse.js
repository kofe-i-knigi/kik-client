const angular = require('angular');

export default function() {
  return {
    restrict: 'A',
    link(scope, element) {
      const toggle = element[0].querySelector('[collapse-toggle]');
      const arrow = angular.element(toggle.querySelector('.fa-angle-right'));
      const body = angular.element(element[0].querySelector('[collapse-body]'));

      toggle.addEventListener('click', () => {
        element.toggleClass('active');
        body.toggleClass('treeview-open');
        arrow.toggleClass('fa-angle-right fa-angle-down');
      });
    }
  };
}
