import {ORDERBY_PROVIDERS, OrderBy} from "./OrderBy/OrderBy";
import {RANGE_PROVIDERS, Range} from "./Range/Range";

export var FUELUI_PIPE_PROVIDERS = [
    ORDERBY_PROVIDERS,
    RANGE_PROVIDERS
];
export * from "./OrderBy/OrderBy";
export * from "./Range/Range";