"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Format_1 = require("./Format/Format");
var MapToIterable_1 = require("./MapToIterable/MapToIterable");
var OrderBy_1 = require("./OrderBy/OrderBy");
var Range_1 = require("./Range/Range");
exports.FUELUI_PIPE_PROVIDERS = [
    Format_1.FORMAT_PROVIDERS,
    MapToIterable_1.MAPTOITERABLE_PROVIDERS,
    OrderBy_1.ORDERBY_PROVIDERS,
    Range_1.RANGE_PROVIDERS
];
__export(require("./Format/Format"));
__export(require("./MapToIterable/MapToIterable"));
__export(require("./OrderBy/OrderBy"));
__export(require("./Range/Range"));

//# sourceMappingURL=pipes.js.map
