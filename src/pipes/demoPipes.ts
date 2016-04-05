import {FORMAT_DEMO_PROVIDERS, FormatDemo} from "./Format/Format.Demo";
import {MAPTOITERABLE_DEMO_PROVIDERS, MapToIterableDemo} from "./MapToIterable/MapToIterable.Demo";
import {ORDERBY_DEMO_PROVIDERS, OrderByDemo} from "./OrderBy/OrderBy.Demo";
import {RANGE_DEMO_PROVIDERS, RangeDemo} from "./Range/Range.Demo";

export var FUELUI_DEMO_PIPE_PROVIDERS = [
    FORMAT_DEMO_PROVIDERS,
    MAPTOITERABLE_DEMO_PROVIDERS,
	ORDERBY_DEMO_PROVIDERS,
    RANGE_DEMO_PROVIDERS
];

export * from "./Format/Format.Demo";
export * from "./MapToIterable/MapToIterable.Demo";
export * from "./OrderBy/OrderBy.Demo";
export * from "./Range/Range.Demo";