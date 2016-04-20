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
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var RangeDemo = (function () {
    function RangeDemo() {
        this.numbers = [];
        this.startNumber = 0;
        this.endNumber = 5;
        this.stepNumber = 1;
    }
    RangeDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Range</h2>\n            <p class=\"card-text\">Range is a custom pipe to dynamically create an array of numbers based on a given range</p>\n        </div>\n    </div>\n</div>\n\n<p>\n    <code>*ngFor=\"#number of numbers | range : {{startNumber}} : {{endNumber}} : {{stepNumber}}\"</code><br/>\n</p>\n\n<p>Output: {{number | range : startNumber : endNumber : stepNumber | json}}</p>\n\n<div class=\"form-group row\">\n    <label for=\"startNumber\" class=\"col-sm-2 form-control-label\">Starting Number</label>\n    <div class=\"col-sm-2\">\n        <input name=\"startNumber\" [(ngModel)]=\"startNumber\" type=\"number\" [max]=\"endNumber\" class=\"form-control\"> \n    </div>\n</div>\n<div class=\"form-group row\">\n    <label for=\"endNumber\" class=\"col-sm-2 form-control-label\">Ending Number</label>\n    <div class=\"col-sm-2\">\n        <input name=\"endNumber\" [(ngModel)]=\"endNumber\" type=\"number\" [min]=\"startNumber\" class=\"form-control\"> \n    </div>\n</div>\n<div class=\"form-group row\">\n    <label for=\"stepNumber\" class=\"col-sm-2 form-control-label\">Step Number</label>\n    <div class=\"col-sm-2\">\n        <input name=\"stepNumber\" [(ngModel)]=\"stepNumber\" type=\"number\" min=\"1\" class=\"form-control\"> \n    </div>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {RangePipe} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Range is a pipe that simply takes in 3 arguments, a <code>start</code> number, <code>end</code> number, and <code>step</code> number.</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class RangeExample {\n    numbers:number[] = [];\n    start:number = 0;\n    end:number = 5;\n    step:number = 1;\n}\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\n*ngFor=\"#number of numbers | range : start : end : step\"\n</code>\n</pre>\n\n<h3>Parameters</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>start</td>\n            <td>number</td>\n            <td>0</td>\n            <td>The starting number of the array</td>\n        </tr>\n        <tr>\n            <td>end</td>\n            <td>number</td>\n            <td>4</td>\n            <td>The largest possible number of the array</td>\n        </tr>\n        <tr>\n            <td>step</td>\n            <td>number</td>\n            <td>1</td>\n            <td>The amount of step between each number within the array</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [common_1.CORE_DIRECTIVES, CodeHighlighter_1.CodeHighlighter],
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
