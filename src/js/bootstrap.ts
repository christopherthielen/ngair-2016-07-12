import "./vendor";
import {bootstrap} from "@angular/platform-browser-dynamic";


import {AuthService} from "./services/authService";
import {Folders, Messages} from "./services/datasources";
import {trace, UIROUTER_PROVIDERS, UIRouterConfig, UIView, Category} from "ui-router-ng2";
import {MyRouterConfig} from "./router.config";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";

bootstrap(UIView, [
  UIROUTER_PROVIDERS,
  {provide: UIRouterConfig, useClass: MyRouterConfig},
  {provide: LocationStrategy, useClass: PathLocationStrategy},

  {provide: AuthService, useClass: AuthService},
  {provide: Folders, useClass: Folders},
  {provide: Messages, useClass: Messages},
]);

trace.enable(Category.TRANSITION);
