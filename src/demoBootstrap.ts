import {FORM_PROVIDERS, bootstrap, provide} from "angular2/angular2";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";

import {FUELUI_COMPONENT_PROVIDERS} from "./components/components";

import {DemoComponent} from "./DemoComponent";

bootstrap(DemoComponent, [
	ROUTER_PROVIDERS,
	FORM_PROVIDERS,
	provide(LocationStrategy, {useClass: HashLocationStrategy}),
	FUELUI_COMPONENT_PROVIDERS
]);
