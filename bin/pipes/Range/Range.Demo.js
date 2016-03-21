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
var core_1 = require('angular2/core');
var common_1 = require("angular2/common");
var Range_1 = require('./Range');
var RangeDemo = (function () {
    function RangeDemo() {
        this.numbers = [];
        this.startNumber = 0;
        this.endNumber = 5;
    }
    RangeDemo = __decorate([
        core_1.Component({
            template: "\n        <code>*ngFor=\"#number of numbers | range : {{startNumber}} : {{endNumber}}\"</code><br/>\n        <li *ngFor=\"#number of numbers | range : startNumber : endNumber\" class=\"page-item\" [class.active]=\"currentPage == page\">\n            {{number}}\n        </li>\n        <div class=\"form-group row\">\n            <label for=\"startNumber\" class=\"col-sm-2 form-control-label\">Starting Number</label>\n            <div class=\"col-sm-2\">\n                <input name=\"startNumber\" [(ngModel)]=\"startNumber\" type=\"number\" [max]=\"endNumber\" class=\"form-control\"> \n            </div>\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"endNumber\" class=\"col-sm-2 form-control-label\">Ending Number</label>\n            <div class=\"col-sm-2\">\n                <input name=\"endNumber\" [(ngModel)]=\"endNumber\" type=\"number\" [min]=\"startNumber\" class=\"form-control\"> \n            </div>\n        </div>\n        ",
            directives: [common_1.CORE_DIRECTIVES],
            pipes: [Range_1.RANGE_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], RangeDemo);
    return RangeDemo;
}());
exports.RangeDemo = RangeDemo;
exports.RANGE_DEMO_PROVIDERS = [
    RangeDemo
];

//# sourceMappingURL=Range.Demo.js.map
