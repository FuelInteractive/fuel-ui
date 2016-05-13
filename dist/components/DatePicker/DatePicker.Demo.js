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
var DatePickerProviders_1 = require('./DatePickerProviders');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var DatePickerDemo = (function () {
    function DatePickerDemo() {
        this.datePickerValue = new Date(2016, 7, 6);
        this.datePickerFieldValue = "8/6/2016";
        this.attributes = [
            new demoUtilities_1.Attribute('minDate', 'string|Date', 'new Date(1900,0,1)', 'Minimum selectable date'),
            new demoUtilities_1.Attribute('maxDate', 'string|Date', 'new Date(2200,0,1)', 'Maximum selectable date'),
            new demoUtilities_1.Attribute('dateFilter', 'function(date): boolean', 'null', 'Filter to disable dates. A return of <i>false</i> will disable the day'),
            new demoUtilities_1.Attribute('value', 'Date', 'null', 'Two-way binding of the selected DateRange')
        ];
        this.dateFieldAttributes = [
            new demoUtilities_1.Attribute('date', 'Date', 'null', 'Two-way binding of the selected date'),
            new demoUtilities_1.Attribute('value', 'string|Date', 'null', 'Two-way binding of the selected date'),
            new demoUtilities_1.Attribute('ngModel', 'string', 'null', 'Two-way binding of the result input string'),
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    DatePickerDemo.prototype.dateFilter = function (d) {
        if ([2].indexOf(d.getDay()) > -1)
            return false;
        return true;
    };
    DatePickerDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">DatePicker</h2>\n            <p class=\"card-text\">DatePicker is a custom component to select a single date on a calendar</p>\n        </div>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col-md-4\">\n        <div class=\"form-group\">\n            <label for=\"date\">Pick a Date</label>\n            <date-picker\n                minDate=\"11/1/2015\"\n                maxDate=\"11/12/2016\" \n                [dateFilter]=\"dateFilter\"\n                [(value)]=\"datePickerValue\">\n                <div class=\"date-picker-input-group\">\n                    <input name=\"date\" [(ngModel)]=\"datePickerFieldValue\" dateField class=\"form-control\" placeholder=\"pick a date\" />\n                </div>\n            </date-picker>\n        </div>\n    </div>\n    <div class=\"col-md-4\">\n        date-picker value: {{datePickerValue}}<br />\n        input ngModel: {{datePickerFieldValue}}\n    </div>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {DATE_PICKER_PROVIDERS} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>DatePicker is a custom element to select a date on a calendar. It supports filtering of dates so that you can disable dates programmatically. Also supports min and max dates</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;div class=&quot;form-group&quot;&gt;\n    &lt;label for=&quot;date&quot;&gt;Pick a Date&lt;/label&gt;\n    &lt;date-picker\n        minDate=&quot;11/1/2015&quot;\n        maxDate=&quot;11/12/2016&quot; \n        [dateFilter]=&quot;dateFilter&quot;\n        (valueChange)=&quot;datePickerValue&quot;&gt;\n        &lt;div class=&quot;date-picker-input-group&quot;&gt;\n            &lt;input name=&quot;date&quot; dateField class=&quot;form-control&quot; value=&quot;5/6/2016&quot; placeholder=&quot;pick a date&quot; /&gt;\n        &lt;/div&gt;\n    &lt;/date-picker&gt;\n&lt;/div&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class DatePickerExample { \n    datePickerValue: Date;\n    \n    dateFilter(d: Date): boolean {\n        \n        //every Tuesday\n        if([2].indexOf(d.getDay()) > -1)\n            return false;\n        \n        return true;\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>DateField Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"dateFieldAttributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [DatePickerProviders_1.DATE_PICKER_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
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
