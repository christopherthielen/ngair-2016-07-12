import "./vendor";
import "./main";

import {UpgradeAdapter} from '@angular/upgrade';
import {uiRouterNgUpgrade} from "ui-router-ng1-to-ng2";

// ============================================================
// Create upgrade adapter and bootstrap the hybrid ng1/ng2 app
// ============================================================
export const upgradeAdapter = new UpgradeAdapter();

// Supply ui-router with the upgrade adapter
uiRouterNgUpgrade.setUpgradeAdapter(upgradeAdapter);

// Register some ng1 services as ng2 providers
upgradeAdapter.upgradeNg1Provider('AuthService');
upgradeAdapter.upgradeNg1Provider('Folders');
upgradeAdapter.upgradeNg1Provider('Messages');

// Manually bootstrap the app with the Upgrade Adapter (instead of ng-app)
document.addEventListener("DOMContentLoaded", function() {
  // Wait for DOM to be ready
  upgradeAdapter.bootstrap(document.body, ['ngair']);
});
