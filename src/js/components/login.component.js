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
  controller: LoginController,
  template: `
    <div class="login">
        <div>
            <form class="pure-form pure-form-aligned" style="flex: 0 1 auto;">
                <fieldset>
                    <div class="pure-control-group">
                        <label for="name">Username</label>
                        <input id="name" type="text" placeholder="Username" value="username">
                    </div>
    
                    <div class="pure-control-group">
                        <label for="password">Password</label>
                        <input id="password" type="password" placeholder="Password" value="password">
                    </div>
    
                    <div class="pure-controls">
                        <button type="button" ng-click="$ctrl.login()" class="pure-button pure-button-primary">Log in</button>
                        <span ng-show="$ctrl.authenticating">Authenticating...</span>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
`
});
