"use strict";
var MobileDetection = (function () {
    function MobileDetection() {
    }
    MobileDetection.isAndroid = function () {
        return navigator.userAgent.match(/Android/i) != null;
    };
    MobileDetection.isBlackBerry = function () {
        return navigator.userAgent.match(/BlackBerry/i) != null;
    };
    MobileDetection.isIOS = function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) != null;
    };
    MobileDetection.isOpera = function () {
        return navigator.userAgent.match(/Opera Mini/i) != null;
    };
    MobileDetection.isWindows = function () {
        return navigator.userAgent.match(/IEMobile|WPDesktop/i) != null;
    };
    MobileDetection.isAny = function () {
        return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows());
    };
    return MobileDetection;
}());
exports.MobileDetection = MobileDetection;

//# sourceMappingURL=DetectionUtils.js.map
