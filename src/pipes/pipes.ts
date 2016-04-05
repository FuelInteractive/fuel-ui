import {FORMAT_PROVIDERS, FormatPipe} from "./Format/Format";
import {MAPTOITERABLE_PROVIDERS, MapToIterablePipe} from "./MapToIterable/MapToIterable";
import {ORDERBY_PROVIDERS, OrderByPipe} from "./OrderBy/OrderBy";
import {RANGE_PROVIDERS, RangePipe} from "./Range/Range";

export var FUELUI_PIPE_PROVIDERS = [
    FORMAT_PROVIDERS,
    MAPTOITERABLE_PROVIDERS,
    ORDERBY_PROVIDERS,
    RANGE_PROVIDERS
];
export * from "./Format/Format";
export * from "./MapToIterable/MapToIterable";
export * from "./OrderBy/OrderBy";
export * from "./Range/Range";