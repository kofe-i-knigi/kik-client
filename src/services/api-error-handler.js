export default function apiErrorHanler($q, $window) {
  return {
    'responseError': function(errorResponse) {

      switch (errorResponse.status) {
      case 401:
      case 403:
        $window.location = '/login';
        break;
      // case 404:
      //   $window.location = '/404';
      }
      return $q.reject(errorResponse);
    }
  };
}

apiErrorHanler.$inject = ['$q', '$window'];
