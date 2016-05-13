"use strict";
var DateUtils = (function () {
    function DateUtils() {
    }
    DateUtils.isValidDate = function (value) {
        return Object.prototype.toString.call(value) === "[object Date]"
            && !isNaN(value.valueOf()) && value.getTime() != 0;
    };
    DateUtils.handleDateInput = function (value) {
        if (DateUtils.isValidDate(value))
            return value;
        return new Date(value);
    };
    return DateUtils;
}());
exports.DateUtils = DateUtils;

//# sourceMappingURL=DateUtils.js.map
