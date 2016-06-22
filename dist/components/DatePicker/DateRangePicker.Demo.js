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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var utilities_1 = require('../../utilities/utilities');
var DatePickerProviders_1 = require('./DatePickerProviders');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var DateRangePickerDemo = (function () {
    function DateRangePickerDemo() {
        this.dateRangePickerValue = new utilities_1.DateRange(new Date(), new Date());
        /*arrivalDate = new Date(2016,7,6);
        departureDate = new Date(2016,7,10);*/
        this.arrivalDate = "8/6/2016";
        this.departureDate = "8/10/2016";
        this.attributes = [
            new demoUtilities_1.Attribute('minDate', 'string|Date', 'new Date(1900,0,1)', 'Minimum selectable date'),
            new demoUtilities_1.Attribute('maxDate', 'string|Date', 'new Date(2200,0,1)', 'Maximum selectable date'),
            new demoUtilities_1.Attribute('dateFilter', 'function(date): boolean', 'null', 'Filter to disable dates. A return of <i>false</i> will disable the day'),
            new demoUtilities_1.Attribute('value', 'DateRange', 'null', 'Two-way binding of the selected DateRange')
        ];
        this.dateFieldAttributes = [
            new demoUtilities_1.Attribute('date', 'Date', 'null', 'Two-way binding of the selected date'),
            new demoUtilities_1.Attribute('value', 'string|Date', 'null', 'Two-way binding of the selected date'),
            new demoUtilities_1.Attribute('ngModel', 'string', 'null', 'Two-way binding of the result input string'),
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
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
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">DateRangePicker</h2>\n            <p class=\"card-text\">DateRangePicker is a custom component to select a date range on a single calendar</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row\">\n    <div class=\"col-md-4\">\n        <form class=\"form-inline\">\n            <date-range-picker\n                minDate=\"11/1/2015\"\n                maxDate=\"11/12/2016\" \n                [dateFilter]=\"dateFilter\"\n                (valueChange)=\"datePickerValueChange($event)\">\n                <div class=\"form-group\">\n                    <label for=\"arrival\">Arrival Date</label>\n                    <div class=\"date-picker-input-group\">\n                        <input name=\"arrival\" [(ngModel)]=\"arrivalDate\" startDateField class=\"form-control\" placeholder=\"Arrival\" />\n                    </div>\n                </div>\n                \n                <div class=\"form-group\">\n                    <label for=\"departure\">Departure Date</label>\n                    <div class=\"date-picker-input-group\">\n                        <input name=\"departure\" [(ngModel)]=\"departureDate\" endDateField class=\"form-control\" placeholder=\"Departure\" />\n                    </div>\n                </div>\n            </date-range-picker>\n        </form>\n    </div>\n    <div class=\"col-md-6\">\n        value.start: {{dateRangePickerValue.start}} <br/>\n        value.end: {{dateRangePickerValue.end}} <br />\n        startDateField: {{arrivalDate}} <br />\n        endDateField: {{departureDate}} <br />\n    </div>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {DateRange, DATE_PICKER_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>DateRangePicker is a custom element to select a date range on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;form class=&quot;form-inline&quot;&gt;\n    &lt;date-range-picker\n        minDate=&quot;11/1/2015&quot;\n        maxDate=&quot;11/12/2016&quot; \n        [dateFilter]=&quot;dateFilter&quot;\n        (valueChange)=&quot;datePickerValueChange($event)&quot;&gt;\n        &lt;div class=&quot;form-group&quot;&gt;\n            &lt;label for=&quot;arrival&quot;&gt;Arrival Date&lt;/label&gt;\n            &lt;div class=&quot;date-picker-input-group&quot;&gt;\n                &lt;input name=&quot;arrival&quot; startDateField class=&quot;form-control&quot; value=&quot;5/5/2016&quot; placeholder=&quot;Arrival&quot; /&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n        \n        &lt;div class=&quot;form-group&quot;&gt;\n            &lt;label for=&quot;departure&quot;&gt;Departure Date&lt;/label&gt;\n            &lt;div class=&quot;date-picker-input-group&quot;&gt;\n                &lt;input name=&quot;departure&quot; endDateField class=&quot;form-control&quot; value=&quot;5/10/2016&quot; placeholder=&quot;Departure&quot; /&gt;\n            &lt;/div&gt;\n        &lt;/div&gt;\n    &lt;/date-range-picker&gt;\n&lt;/form&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class DateRangePickerExample { \n    dateRangePickerValue: DateRange;\n    \n    datePickerValueChange(eventValue: any){\n        this.dateRangePickerValue = eventValue;\n    }\n    \n    dateFilter(d: Date): boolean {\n        \n        //every Tuesday\n        if([2].indexOf(d.getDay()) > -1)\n            return false;\n        \n        return true;\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>DateRangePicker Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>StartDate / EndDate Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"dateFieldAttributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [DatePickerProviders_1.DATE_PICKER_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS, common_1.FORM_DIRECTIVES]
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
