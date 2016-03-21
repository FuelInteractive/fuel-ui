import {ORDERBY_DEMO_PROVIDERS, OrderByDemo} from "./OrderBy/OrderBy.Demo";
import {RANGE_DEMO_PROVIDERS, RangeDemo} from "./Range/Range.Demo";

export var FUELUI_DEMO_PIPE_PROVIDERS = [
	ORDERBY_DEMO_PROVIDERS,
    RANGE_DEMO_PROVIDERS
];

export * from "./OrderBy/OrderBy.Demo";
export * from "./Range/Range.Demo";