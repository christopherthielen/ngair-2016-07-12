var app = angular.module('ngair');

app.controller('AppController', function (AuthService, $state, folders) {
  var $ctrl = this;
  $ctrl.folders = folders;

  $ctrl.toggleMenu = function () { $ctrl.menuOpen = !$ctrl.menuOpen; };
  $ctrl.closeMenu = function () { $ctrl.menuOpen = false; };

  $ctrl.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $ctrl.reset = function() {
    sessionStorage.clear();
    document.location.reload();
  }
});