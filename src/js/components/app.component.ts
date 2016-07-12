import {Component, Input, Inject} from "@angular/core";
import {StateService, UIROUTER_DIRECTIVES} from "ui-router-ng2";

let template = `
    <div id="layout" class="content pure-g">
    
        <div id="nav" class="pure-u" [class.active]="menuOpen">
            <a class="nav-menu-button" (click)="toggleMenu()">Menu</a>
    
            <div class="nav-inner">
    
                <div class="pure-menu">
                    <ul class="pure-menu-list">
                        <li class="pure-menu-heading">Folders</li>
                        <li class="pure-menu-item" *ngFor="let folder of folders" (click)="closeMenu()" 
                            uiSref=".folder" [uiParams]="{ folderId: folder._id }" uiSrefActive="pure-menu-active" >
                            <a class="pure-menu-link">{{folder._id}} <span class="email-count"></span></a>
                        </li>
                        <li class="pure-menu-heading">Other</li>
                        <li class="pure-menu-item">
                            <a (click)="logout()" class="pure-menu-link">Log Out</a>
                        </li>
                        <li class="pure-menu-item" (click)="reset()">
                            <a class="pure-menu-link">Reset All Data</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    
        <ui-view name="messages" class="pure-u-1"></ui-view>
    
        <ui-view id="main" name="message" class="pure-u-1"></ui-view>
    
    </div>
`;

@Component({
  template: template,
  directives: [UIROUTER_DIRECTIVES]
})
export class App {
  @Input() private folders;
  private menuOpen;

  constructor(@Inject('AuthService') private AuthService, private $state: StateService) { }

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
