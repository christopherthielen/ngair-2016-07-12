import {app} from "../ngmodule";

class AppController {
  constructor(AuthService, $state) {
    this.AuthService = AuthService;
    this.$state = $state;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    this.AuthService.logout();
    this.$state.go('login');
  }

  reset() {
    sessionStorage.clear();
    document.location.reload();
  }
}

app.component('app', {
  templateUrl: '/src/partials/app.html',
  controller: AppController,
  bindings: { folders: '<' }
});
