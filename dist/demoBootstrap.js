require("es6-shim");
require("zone.js");
require("reflect-metadata/Reflect");
require("core-js");
var angular2_1 = require("angular2/angular2");
var router_1 = require("angular2/router");
var components_1 = require("./components/components");
var DemoComponent_1 = require("./DemoComponent");
angular2_1.bootstrap(DemoComponent_1.DemoComponent, [
    router_1.ROUTER_PROVIDERS,
    angular2_1.FORM_PROVIDERS,
    angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
    components_1.FUELUI_COMPONENT_PROVIDERS
]);

//# sourceMappingURL=demoBootstrap.js.map
