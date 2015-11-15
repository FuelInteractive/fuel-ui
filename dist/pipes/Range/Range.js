/*
 * Example use
 *		Basic Array of single type: *ng-for="#n of someBlankArray | 0 : 9"
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require("angular2/angular2");
var Range = (function () {
    function Range() {
    }
    Range.prototype.transform = function (value, config) {
        if (config === void 0) { config = [0, 4]; }
        var newValue = [];
        var min = parseInt(config[0]);
        var max = parseInt(config[1]);
        for (var i = min; i <= max; i++)
            newValue.push(i);
        return newValue;
    };
    Range = __decorate([
        angular2_1.Pipe({
            name: 'range',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], Range);
    return Range;
})();
exports.Range = Range;
exports.RANGE_PROVIDERS = [
    Range
];

//# sourceMappingURL=Range.js.map
