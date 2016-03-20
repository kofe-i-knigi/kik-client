export default function Auth($http) {
  return {
    logIn(creds) {
      const promise = $http.post('/api/auth/login', creds);

      promise.then((res) => {
        localStorage.idToken = res.data.token;
        console.log(localStorage.idToken);
      });

      return promise;
    }
  }
}

Auth.$inject = ['$http'];
