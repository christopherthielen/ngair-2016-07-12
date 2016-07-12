import {Component, Inject} from "@angular/core";
import {StateService} from "ui-router-ng2";
import {AuthService} from "../services/authService";

let template = `
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
                        <button type="button" (click)="login()" class="pure-button pure-button-primary">Log in</button>
                        <span [hidden]="!authenticating">Authenticating...</span>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
`;

@Component({
  template: template
})
export class Login {
  private authenticating;

  constructor(private authService: AuthService, private $state: StateService) {
    this.authenticating = false;
  }

  login() {
    this.authenticating = true;
    var $state = this.$state;
    this.authService.login().then(function() {
      $state.go('app');
    });
  }
}