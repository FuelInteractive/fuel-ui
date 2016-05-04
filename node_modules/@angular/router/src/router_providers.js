"use strict";
var router_providers_common_1 = require('./router_providers_common');
var platform_browser_1 = require('@angular/platform-browser');
var common_1 = require('@angular/common');
exports.ROUTER_PROVIDERS = [
    router_providers_common_1.ROUTER_PROVIDERS_COMMON,
    /*@ts2dart_Provider*/ { provide: common_1.PlatformLocation, useClass: platform_browser_1.BrowserPlatformLocation },
];
//# sourceMappingURL=router_providers.js.map