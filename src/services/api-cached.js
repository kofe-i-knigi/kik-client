import {API_BASE} from '../config';

function apiCached($http) {
  return function(url, recache) {
    const data = localStorage.getItem(url);

    if (data && !recache) {
      return Promise.resolve(JSON.parse(data));
    } else {
      return $http.get(`${API_BASE}${url}`).then(res => {
        localStorage.setItem(url, JSON.stringify(res.data));

        return Promise.resolve(res.data);
      });
    }
  };
}

apiCached.$inject = ['$http'];

export default apiCached;
