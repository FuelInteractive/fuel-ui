/*
 * Example use
 *		Basic Array of single type: *ng-for="#todo of todoService.todos | orderBy : 'desc'"
 *		Multidimensional Array Sort on single column: *ng-for="#todo of todoService.todos | orderBy : 'asc' : 'status'"
 *		Multidimensional Array Sort on multiple columns: *ng-for="#todo of todoService.todos | orderBy : 'asc' : ['status', 'title']"
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
var OrderBy = (function () {
    function OrderBy() {
    }
    OrderBy.prototype.transform = function (value, config) {
        if (config === void 0) { config = ['asc', null]; }
        if (!Array.isArray(value))
            return value;
        var newValue = [];
        var sort = config[0];
        var property = config[1];
        if (property == null || property == '') {
            //Basic array
            newValue = sort == 'asc' ? value.sort() : value.sort().reverse();
        }
        else if (!Array.isArray(property)) {
            //Single property to sort by, only look for that
            newValue = value.sort(function (a, b) {
                if (a[property] === b[property]) {
                    return 0;
                }
                else {
                    //Lowercase strings and parse numbers
                    if ((isNaN(parseFloat(a[property])) || isFinite(a[property]))
                        || (isNaN(parseFloat(b[property])) || isFinite(b[property]))) {
                        a[property] = a[property].toLowerCase();
                        b[property] = b[property].toLowerCase();
                    }
                    else {
                        a[property] = parseFloat(a[property]);
                        b[property] = parseFloat(b[property]);
                    }
                    if (sort == 'asc') {
                        return (a[property] < b[property]) ? -1 : 1;
                    }
                    else {
                        return (a[property] > b[property]) ? -1 : 1;
                    }
                }
            });
        }
        else {
            //Loop over property array in order and sort
            newValue = value.sort(function (a, b) {
                for (var i = 0; i < property.length; i++) {
                    //Lowercase strings and parse numbers
                    if ((isNaN(parseFloat(a[property[i]])) || isFinite(a[property[i]]))
                        || (isNaN(parseFloat(b[property[i]])) || isFinite(b[property[i]]))) {
                        a[property[i]] = a[property[i]].toLowerCase();
                        b[property[i]] = b[property[i]].toLowerCase();
                    }
                    else {
                        a[property[i]] = parseFloat(a[property[i]]);
                        b[property[i]] = parseFloat(b[property[i]]);
                    }
                    if (sort == 'asc') {
                        if (a[property[i]] < b[property[i]])
                            return -1;
                        if (a[property[i]] > b[property[i]])
                            return 1;
                    }
                    else {
                        if (a[property[i]] > b[property[i]])
                            return -1;
                        if (a[property[i]] < b[property[i]])
                            return 1;
                    }
                }
                return 0; //equal each other
            });
        }
        return newValue;
    };
    OrderBy = __decorate([
        angular2_1.Pipe({
            name: 'orderBy',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], OrderBy);
    return OrderBy;
})();
exports.OrderBy = OrderBy;
exports.ORDERBY_PROVIDERS = [
    OrderBy
];

//# sourceMappingURL=OrderBy.js.map
