import {API_BASE} from '../config';

export default function Auth($http) {
  return {
    logIn(creds) {
      const promise = $http.post(`${API_BASE}/auth/login`, creds);

      promise.then((res) => {
        localStorage.idToken = res.data.token;
        console.log(localStorage.idToken);
      });

      return promise;
    },

    register(creds) {
      const promise = $http.post(`${API_BASE}/auth/register`, creds);

      promise.then((res) => {
        localStorage.idToken = res.data.token;
      });

      return promise;
    },

    getRegToken() {
      return $http.get(`${API_BASE}/admin/auth/regtoken`);
    }
  }
}

Auth.$inject = ['$http'];
