export default function editableText() {
  return {
    restrict: 'E',
    require: 'ngModel',
    templateUrl: '/templates/directives/editable-text.html',
    scope: {
      change: '&',
      text: '=ngModel'
    },
    compile: compile
  };
}

function compile(tElement) {
  if (tElement.attr('required')) {
    tElement.find('input').attr('required', true);
  }

  return {
    pre: precompile
  }
}

function precompile(scope, element, attrs, ngModel) {
  scope.showEditor = false;
  scope.focus = false;

  scope.openEditor = () => {
    if (ngModel.$pristine) {
      scope.newText = scope.text;
    }

    scope.showEditor = true;
    setTimeout(() => {
      element.find('input')[0].focus()
    }, 0)
    scope.focus = true;
  };

  scope.closeWithoutSaving = () => {
    ngModel.$setDirty()
    scope.showEditor = false
  };

  scope.saveChanges = () => {
    scope.showEditor = false
    ngModel.$setPristine()
    if (scope.newText != scope.text) {
      scope.text = scope.newText
      ngModel.$setViewValue(scope.newText)

      scope.change()
    }
  };
}
