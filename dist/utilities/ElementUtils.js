"use strict";
var AnimationUtils_1 = require("./AnimationUtils");
var ElementUtils = (function () {
    function ElementUtils() {
    }
    ElementUtils.outerHeight = function (el) {
        var height = el.clientHeight;
        var style = getComputedStyle(el);
        height += parseInt(style.marginTop) + parseInt(style.marginBottom);
        height += parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
        return height;
    };
    ElementUtils.outerWidth = function (el) {
        var width = el.clientWidth;
        var style = getComputedStyle(el);
        width += parseInt(style.marginLeft) + parseInt(style.marginRight);
        width += parseInt(style.borderLeftWidth) + parseInt(style.borderRightWidth);
        return width;
    };
    ElementUtils.scrollTo = function (element, to, duration) {
        if (duration <= 0)
            return;
        var startTime = new Date().getTime();
        var from = element.scrollTop;
        return new Promise(function (resolve, reject) {
            var timer = setInterval(function () {
                var time = new Date().getTime() - startTime;
                var scrollTo = AnimationUtils_1.AnimationUtils.easeInOutQuart(time, from, to - from, duration);
                element.scrollTop = scrollTo;
                if (time >= duration) {
                    element.scrollTop = to;
                    clearInterval(timer);
                    resolve();
                }
            }, 1000 / 60);
        });
    };
    return ElementUtils;
}());
exports.ElementUtils = ElementUtils;

//# sourceMappingURL=ElementUtils.js.map
