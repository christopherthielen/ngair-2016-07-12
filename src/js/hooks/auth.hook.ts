import {AuthService} from "../services/authService";
import {Transition, HookMatchCriteria, TransitionHookFn} from "ui-router-ng2";


/** The hook is invoked when a matching transition is started */
const type = "onStart";

/**
 * Invoke the hook when transitioning *to* a state with a truthy `requiresAuth` property on the `data` object.
 * Since `data` values are inherited, the criteria also matches if any parent state's `data` has a truthy `requiresAuth`
 */
const criteria: HookMatchCriteria = {
  to: (state) => state.data && state.data.requiresAuth
};

/**
 * Get the AuthService from the injector.
 * Check if the user is authenticated.
 * If not, redirect to the 'login' state
 */
const hook: TransitionHookFn = (trans: Transition) => {
  let authSvc = trans.injector().get(AuthService);
  if (!authSvc.user) {
    return trans.router.stateService.target('login');
  }
};

/** A hook which protects states which require authentication */
export const authenticationHook = { type, criteria, hook };