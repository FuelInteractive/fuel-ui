function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var Alert_1 = require("./Alert/Alert");
var Carousel_1 = require("./Carousel/Carousel");
var DatePicker_1 = require("./DatePicker/DatePicker");
var Modal_1 = require("./Modal/Modal");
var Pagination_1 = require("./Pagination/Pagination");
exports.FUELUI_COMPONENT_PROVIDERS = [
    Alert_1.ALERT_PROVIDERS,
    Carousel_1.CAROUSEL_PROVIDERS,
    DatePicker_1.DatePicker,
    Modal_1.MODAL_PROVIDERS,
    Pagination_1.PAGINATION_PROVIDERS
];
__export(require("./Alert/Alert"));
__export(require("./Carousel/Carousel"));
__export(require("./DatePicker/DatePicker"));
__export(require("./Modal/Modal"));
__export(require("./Pagination/Pagination"));

//# sourceMappingURL=components.js.map
