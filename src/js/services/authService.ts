import {app} from "../ngmodule";

app.service('AuthService', function ($timeout) {
  var AuthService = {
    user: sessionStorage.getItem('user'),
    logout: function () {
      sessionStorage.removeItem('user');
      AuthService.user = undefined;
    },
    login: function () {
      // Pretend they're now authenticated.
      return $timeout(function () {
        sessionStorage.setItem('user', 'username');
        AuthService.user = 'username';
      }, 1000);
    }
  };

  return AuthService;
});