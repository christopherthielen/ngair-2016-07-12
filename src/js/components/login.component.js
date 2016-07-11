var app = angular.module('ngair');

app.controller('LoginController', function (AuthService, $state) {
  var $ctrl = this;
  $ctrl.authenticating = false;

  $ctrl.login = function() {
    $ctrl.authenticating = true;
    AuthService.login().then(function() {
      $state.go('app');
    });
  }
});