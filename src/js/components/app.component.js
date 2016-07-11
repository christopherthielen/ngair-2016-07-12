var app = angular.module('ngair');

function AppController(AuthService, $state) {
  this.AuthService = AuthService;
  this.$state = $state;
}

AppController.prototype.toggleMenu = function () {
  this.menuOpen = !this.menuOpen;
};

AppController.prototype.closeMenu = function () {
  this.menuOpen = false;
};

AppController.prototype.logout = function() {
  this.AuthService.logout();
  this.$state.go('login');
};

AppController.prototype.reset = function() {
  sessionStorage.clear();
  document.location.reload();
};

app.component('app', {
  templateUrl: '/src/partials/app.html',
  controller: AppController,
  bindings: { folders: '<' }
});
