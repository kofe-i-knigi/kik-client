import {API_BASE} from '../config';

function apiCached($rootScope, $timeout, $http) {
  return function(url, recache) {
    const data = localStorage.getItem(url);

    if (data && !recache) {
      $timeout(() => $rootScope.$apply());
      return Promise.resolve(JSON.parse(data));
    } else {
      return $http.get(`${API_BASE}${url}`).then(res => {
        localStorage.setItem(url, JSON.stringify(res.data));

        return Promise.resolve(res.data);
      });
    }
  };
}

apiCached.$inject = ['$rootScope', '$timeout', '$http'];

export default apiCached;
