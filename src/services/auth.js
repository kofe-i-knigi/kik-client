import {API_BASE} from '../config';

export default function Auth($http, $state) {
  return {
    logIn(creds) {
      const promise = $http.post(`${API_BASE}/auth/login`, creds);

      promise.then((res) => {
        localStorage.idToken = res.data.token;
        localStorage.user = JSON.stringify(res.data);
      });

      return promise;
    },

    register(creds) {
      const promise = $http.post(`${API_BASE}/auth/register`, creds);

      promise.then((res) => {
        localStorage.idToken = res.data.token;
        localStorage.user = JSON.stringify(res.data);
      });

      return promise;
    },

    getRegToken() {
      return $http.get(`${API_BASE}/admin/auth/regtoken`);
    },

    myUser() {
      let userString = localStorage.getItem('user');

      return userString ? JSON.parse(userString) : null;
    },

    logout() {
      delete localStorage.user;
      delete localStorage.idToken;

      $state.go('login');
    }
  }
}

Auth.$inject = ['$http', '$state'];
