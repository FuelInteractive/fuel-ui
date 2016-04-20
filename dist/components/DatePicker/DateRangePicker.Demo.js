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
var DateRangePicker_1 = require('./DateRangePicker');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var DateRangePickerDemo = (function () {
    function DateRangePickerDemo() {
    }
    DateRangePickerDemo.prototype.datePickerValueChange = function (event) {
        this.dateRangePickerValue = event;
    };
    DateRangePickerDemo.prototype.dateFilter = function (d) {
        if ([2].indexOf(d.getDay()) > -1)
            return false;
        return true;
    };
    DateRangePickerDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">DateRangePicker</h2>\n            <p class=\"card-text\">DateRangePicker is a custom component to select a date range on a single calendar</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row\">\n    <div class=\"col-md-3\">\n        <date-range-picker\n            minDate=\"11/1/2015\"\n            maxDate=\"11/12/2016\" \n            [dateFilter]=\"dateFilter\"\n            startLabel=\"Arrival\"\n            endLabel=\"Departure\"\n            (valueChange)=\"datePickerValueChange($event)\"> \n        </date-range-picker>\n    </div>\n    <div class=\"col-md-6\" *ngIf=\"dateRangePickerValue != null\">\n        value.start: {{dateRangePickerValue.start}} <br/>\n        value.end: {{dateRangePickerValue.end}}\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {DateRange, DateRangePicker} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>DateRangePicker is a custom element to select a date range on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;date-range-picker\n    minDate=&quot;11/1/2015&quot;\n    maxDate=&quot;11/12/2016&quot; \n    [dateFilter]=&quot;dateFilter&quot;\n    startLabel=&quot;Arrival&quot;\n    endLabel=&quot;Departure&quot;\n    (valueChange)=&quot;datePickerValueChange($event)&quot;&gt; \n&lt;/date-range-picker&gt;\n</code>\n</pre>\n\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class DateRangePickerExample { \n    dateRangePickerValue: DateRange;\n    \n    datePickerValueChange(eventValue: any){\n        this.dateRangePickerValue = eventValue;\n    }\n    \n    dateFilter(d: Date): boolean {\n        \n        //every Tuesday\n        if([2].indexOf(d.getDay()) > -1)\n            return false;\n        \n        return true;\n    }\n}\n</code>\n</pre>\n\n<h3>Attributes</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>startLabel</td>\n            <td>string</td>\n            <td>null</td>\n            <td>Placeholder and label to display for the start date input</td>\n        </tr>\n        <tr>\n            <td>endLabel</td>\n            <td>string</td>\n            <td>null</td>\n            <td>Placeholder and label to display for the end date input</td>\n        </tr>\n        <tr>\n            <td>minDate</td>\n            <td>string|Date</td>\n            <td>new Date(1900,0,1)</td>\n            <td>Minimum selectable date</td>\n        </tr>\n        <tr>\n            <td>maxDate</td>\n            <td>string|Date</td>\n            <td>new Date(2200,0,1)</td>\n            <td>Maximum selectable date</td>\n        </tr>\n        <tr>\n            <td>dateFilter</td>\n            <td>function(date): boolean</td>\n            <td>null</td>\n            <td>Filter to disable dates. A return of <i>false</i> will disable the day</td>\n        </tr>\n        <tr>\n            <td>value</td>\n            <td>DateRange</td>\n            <td>null</td>\n            <td>Two-way binding of the selected DateRange</td>\n        </tr>\n        <tr>\n            <td>startDate</td>\n            <td>Date</td>\n            <td>null</td>\n            <td>Two-way binding of the selected start date</td>\n        </tr>\n        <tr>\n            <td>endDate</td>\n            <td>Date</td>\n            <td>null</td>\n            <td>Two-way binding of the selected end date</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [DateRangePicker_1.DateRangePicker, CodeHighlighter_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], DateRangePickerDemo);
    return DateRangePickerDemo;
}());
exports.DateRangePickerDemo = DateRangePickerDemo;
exports.DATERANGEPICKER_DEMO_PROVIDERS = [
    DateRangePickerDemo
];

//# sourceMappingURL=DateRangePicker.Demo.js.map
