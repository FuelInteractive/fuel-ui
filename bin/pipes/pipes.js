"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var OrderBy_1 = require("./OrderBy/OrderBy");
var Range_1 = require("./Range/Range");
exports.FUELUI_PIPE_PROVIDERS = [
    OrderBy_1.ORDERBY_PROVIDERS,
    Range_1.RANGE_PROVIDERS
];
__export(require("./OrderBy/OrderBy"));
__export(require("./Range/Range"));

//# sourceMappingURL=pipes.js.map
