"use strict";
var AnimationUtils = (function () {
    function AnimationUtils() {
    }
    //http://codepen.io/branneman/pen/tCdHa
    //
    // http://easings.net/#easeInOutQuart
    //  time: current time
    //  beginning: beginning value
    //  change: change in value
    //  duration: duration
    //
    AnimationUtils.easeInOutQuart = function (time, beginning, change, duration) {
        if ((time /= duration / 2) < 1)
            return change / 2 * time * time * time * time + beginning;
        return -change / 2 * ((time -= 2) * time * time * time - 2) + beginning;
    };
    return AnimationUtils;
}());
exports.AnimationUtils = AnimationUtils;

//# sourceMappingURL=AnimationUtils.js.map
