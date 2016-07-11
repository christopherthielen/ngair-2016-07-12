import {app} from "../ngmodule";

class LoginController {
  constructor(AuthService, $state) {
    this.AuthService = AuthService;
    this.$state = $state;
    this.authenticating = false;
  }

  login() {
    this.authenticating = true;
    var $state = this.$state;
    this.AuthService.login().then(function() {
      $state.go('app');
    });
  }
}

app.component('login', {
  templateUrl: '/src/partials/login.html',
  controller: LoginController
});
