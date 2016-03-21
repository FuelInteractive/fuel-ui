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
var DatePicker_1 = require('./DatePicker');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var DatePickerDemo = (function () {
    function DatePickerDemo() {
    }
    DatePickerDemo.prototype.dateFilter = function (d) {
        if ([2].indexOf(d.getDay()) > -1)
            return false;
        return true;
    };
    DatePickerDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">DatePicker</h2>\n            <p class=\"card-text\">DatePicker is a custom component to select a single date on a calendar</p>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-4\">\n        <date-picker\n            label=\"Pick a date\"\n            minDate=\"11/1/2015\"\n            maxDate=\"11/12/2016\" \n            [dateFilter]=\"dateFilter\"\n            (valueChange)=\"datePickerValue\">\n        </date-picker>\n    </div>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {DatePicker} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>DatePicker is a custom element to select a date on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;date-picker\n    label=&quot;Pick a date&quot;\n    minDate=&quot;11/1/2015&quot;\n    maxDate=&quot;11/12/2016&quot; \n    [dateFilter]=&quot;dateFilter&quot;\n    (valueChange)=&quot;datePickerValue&quot;&gt;\n&lt;/date-picker&gt;\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class DatePickerExample { \n    datePickerValue: Date;\n    \n    dateFilter(d: Date): boolean {\n        \n        //every Tuesday\n        if([2].indexOf(d.getDay()) > -1)\n            return false;\n        \n        return true;\n    }\n}\n</code>\n</pre>\n\n<h3>Attributes</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>label</td>\n            <td>string</td>\n            <td>null</td>\n            <td>Placeholder to display before a date is selected</td>\n        </tr>\n        <tr>\n            <td>minDate</td>\n            <td>string|Date</td>\n            <td>new Date(1900,0,1)</td>\n            <td>Minimum selectable date</td>\n        </tr>\n        <tr>\n            <td>maxDate</td>\n            <td>string|Date</td>\n            <td>new Date(2200,0,1)</td>\n            <td>Maximum selectable date</td>\n        </tr>\n        <tr>\n            <td>dateFilter</td>\n            <td>function(date): boolean</td>\n            <td>null</td>\n            <td>Filter to disable dates. A return of <i>false</i> will disable the day</td>\n        </tr>\n        <tr>\n            <td>value</td>\n            <td>Date</td>\n            <td>null</td>\n            <td>Two-way binding of the selected date</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [DatePicker_1.DatePicker, CodeHighlighter_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], DatePickerDemo);
    return DatePickerDemo;
}());
exports.DatePickerDemo = DatePickerDemo;
exports.DATEPICKER_DEMO_PROVIDERS = [
    DatePickerDemo
];

//# sourceMappingURL=DatePicker.Demo.js.map
