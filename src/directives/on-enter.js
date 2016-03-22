export default function onEnter() {
  return {
    restrict: 'A',
    link: link
  };
}

function link(scope, element, attrs) {
  element.bind('keydown keypress', (event) => {
    if (event.which === 13) {
      scope.$apply(() => {
        scope.$eval(attrs.onEnter);
      });
      event.preventDefault();
    }
  });
}
