import { ROUTER_PROVIDERS_COMMON } from './router_providers_common';
import { BrowserPlatformLocation } from '@angular/platform-browser';
import { PlatformLocation } from '@angular/common';
export const ROUTER_PROVIDERS = [
    ROUTER_PROVIDERS_COMMON,
    /*@ts2dart_Provider*/ { provide: PlatformLocation, useClass: BrowserPlatformLocation },
];
//# sourceMappingURL=router_providers.js.map