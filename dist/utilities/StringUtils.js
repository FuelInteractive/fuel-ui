"use strict";
var StringHelper = (function () {
    function StringHelper() {
    }
    StringHelper.escapeHtml = function (html) {
        var that = this;
        return String(html).replace(/[<>"'\/]/g, function (s) {
            return that.entityMap[s];
        });
    };
    StringHelper.entityMap = {
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&apos;',
        "/": '&#x2F;'
    };
    return StringHelper;
}());
exports.StringHelper = StringHelper;

//# sourceMappingURL=StringUtils.js.map
