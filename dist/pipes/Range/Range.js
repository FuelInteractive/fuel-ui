/*
 * Example use
 *		Basic Array of single type: *ngFor="#n of someBlankArray | 0 : 9"
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var RangePipe = (function () {
    function RangePipe() {
    }
    RangePipe.prototype.transform = function (value, config) {
        if (config === void 0) { config = [0, 4, 1]; }
        var newValue = [];
        var min = !isNaN(parseInt(config[0])) ? parseInt(config[0]) : 0;
        var max = !isNaN(parseInt(config[1])) ? parseInt(config[1]) : 4;
        var step = !isNaN(parseInt(config[2])) ? parseInt(config[2]) : 1;
        for (var i = min; i <= max; i += step)
            newValue.push(i);
        return newValue;
    };
    RangePipe = __decorate([
        core_1.Pipe({
            name: 'range',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], RangePipe);
    return RangePipe;
}());
exports.RangePipe = RangePipe;
exports.RANGE_PROVIDERS = [
    RangePipe
];

//# sourceMappingURL=Range.js.map
