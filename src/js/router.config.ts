import {UIRouterConfig, UIRouter} from "ui-router-ng2";
import {STATES} from "./states";

import {authenticationHook} from "./hooks/auth.hook";

const HOOKS = [authenticationHook];

export class MyRouterConfig extends UIRouterConfig {
  configure(router: UIRouter):void {
    // Register all the states
    STATES.forEach(state => router.stateRegistry.register(state));
    // Register the 'otherwise' route
    router.urlRouterProvider.otherwise("/m/");

    // Register transition hooks
    HOOKS.forEach(hook => router.transitionService[hook.type](hook.criteria, hook.hook));
  }
}