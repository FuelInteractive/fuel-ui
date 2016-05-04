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
var Tab_1 = require('../../components/Tab/Tab');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var TimePicker_1 = require('../../components/TimePicker/TimePicker');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var TimePickerDemo = (function () {
    function TimePickerDemo() {
        this.date = new Date();
        this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);
        this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
        this.hourStep = 1;
        this.minuteStep = 1;
        this.readonly = false;
        this.disabled = false;
        this.showSeconds = true;
        this.showSpinners = true;
        this.showMeridian = true;
        this.timepickerAttributes = [
            new demoUtilities_1.Attribute('hourStep', 'number', '1', 'The amount of hours per step'),
            new demoUtilities_1.Attribute('minuteStep', 'number', '1', 'The amount of minutes per step'),
            new demoUtilities_1.Attribute('secondStep', 'number', '1', 'The amount of seconds per step'),
            new demoUtilities_1.Attribute('value', 'Date', 'new Date(new Date().getFullYear(), 0, 1, 0, 0, 0)', 'Date value of the TimePicker'),
            new demoUtilities_1.Attribute('meridians', 'string[]', '["AM", "PM"]', 'An array of 2 strings to be used for the 2 meridians'),
            new demoUtilities_1.Attribute('showSeconds', 'boolean', 'false', 'Show the seconds input to update'),
            new demoUtilities_1.Attribute('readonlyInput', 'boolean', 'false', 'Make inputs that are shown readonly'),
            new demoUtilities_1.Attribute('showSpinners', 'boolean', 'true', 'Show or hide arrows to click and step through inputs'),
            new demoUtilities_1.Attribute('disabled', 'boolean', 'false', 'Disable all showing inputs, buttons, and spinners'),
            new demoUtilities_1.Attribute('min', 'Date', 'new Date(new Date().getFullYear(), 0, 1, 0, 0, 0)', 'Miniumum selectable date'),
            new demoUtilities_1.Attribute('max', 'Date', 'new Date(new Date().getFullYear(), 0, 1, 23, 59, 59)', 'Maximum selectable date')
        ];
        this.timepickerAttributesColumns = demoUtilities_1.AttributeColumns;
        this.timepickerAttributesSort = demoUtilities_1.AttributesDefaultSort;
        this.timepickerEvents = [
            new demoUtilities_1.Event('value', '$event = date: Date', 'Curently selected date of TimePicker')
        ];
        this.timepickerEventsColumns = demoUtilities_1.EventColumns;
        this.timepickerEventsSort = demoUtilities_1.EventsDefaultSort;
    }
    TimePickerDemo.prototype.setDate = function () {
        this.date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 14, 0, 0);
    };
    TimePickerDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">TimePicker</h2>\n            <p class=\"card-text\">TimePicker is a custom component to select time through a Date object</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <form>\n        <div class=\"form-group row\">\n            <label for=\"hourStep\" class=\"col-sm-2 col-md-1 form-control-label\">Hour Step</label>\n            <div class=\"col-sm-1\">\n                <input class=\"form-control\" [(ngModel)]=\"hourStep\" min=\"1\" type=\"number\" name=\"hourStep\">\n            </div>\n            <label for=\"minuteStep\" class=\"col-sm-2 col-md-1 form-control-label\">Minute Step</label>\n            <div class=\"col-sm-1\">\n                <input class=\"form-control\" [(ngModel)]=\"minuteStep\" min=\"1\" type=\"number\" name=\"minuteStep\">\n            </div>\n        </div>\n    </form>\n    <p>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"showMeridian = !showMeridian\">Toggle Mode: {{showMeridian ? '12H' : '24H'}}</button>\n        <button type=\"button\" class=\"btn btn-warning btn-sm\" (click)=\"readonly = !readonly\">Readonly: {{readonly ? 'On' : 'Off'}}</button>\n        <button type=\"button\" class=\"btn btn-danger btn-sm\" (click)=\"disabled = !disabled\">Disabled: {{disabled ? 'On' : 'Off'}}</button>\n        <button type=\"button\" class=\"btn btn-info btn-sm\" (click)=\"showSeconds = !showSeconds\">Seconds: {{showSeconds ? 'On' : 'Off'}}</button>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"showSpinners = !showSpinners\">Spinners: {{showSpinners ? 'On' : 'Off'}}</button>\n    </p>\n    <p>\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" (click)=\"setDate()\">Set time to 14:00:00</button>        \n    </p>\n    \n    <timepicker \n        [(value)]=\"date\" \n        [min]=\"minDate\" \n        [max]=\"maxDate\" \n        [hourStep]=\"hourStep\"\n        [minuteStep]=\"minuteStep\" \n        [disabled]=\"disabled\" \n        [readonlyInput]=\"readonly\" \n        [showSeconds]=\"showSeconds\" \n        [showSpinners]=\"showSpinners\" \n        [showMeridian]=\"showMeridian\">\n    </timepicker>\n\n    {{date | date : 'h:mm:ss'}}\n    \n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {TimePicker} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>TimePicker is a custom element to show an interactive TimePicker interface. TimePickers allow for many customizations</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;timepicker \n    [(value)]=&quot;date&quot; \n    [min]=&quot;minDate&quot; \n    [max]=&quot;maxDate&quot; \n    [hourStep]=&quot;hourStep&quot;\n    [minuteStep]=&quot;minuteStep&quot; \n    [disabled]=&quot;disabled&quot; \n    [readonlyInput]=&quot;readonly&quot; \n    [showSeconds]=&quot;showSeconds&quot; \n    [showSpinners]=&quot;showSpinners&quot; \n    [showMeridian]=&quot;showMeridian&quot;&gt;\n&lt;/timepicker&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class TimePickerExample {\n    date: Date = new Date();\n    minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0);\n    maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);\n    hourStep: number = 1;\n    minuteStep: number = 1;\n    readonly: boolean = false;\n    disabled: boolean = false;\n    showSeconds: boolean = true;\n    showSpinners: boolean = true;\n    showMeridian: boolean = true;\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>TimePicker Attributes</h3>\n<table-sortable\n    [columns]=\"timepickerAttributesColumns\"\n    [data]=\"timepickerAttributes\"\n    [sort]=\"timepickerAttributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>TimePicker Events</h3>\n<table-sortable\n    [columns]=\"timepickerEventsColumns\"\n    [data]=\"timepickerEvents\"\n    [sort]=\"timepickerEventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [common_1.CORE_DIRECTIVES, TimePicker_1.TIMEPICKER_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], TimePickerDemo);
    return TimePickerDemo;
}());
exports.TimePickerDemo = TimePickerDemo;
exports.TIMEPICKER_DEMO_PROVIDERS = [
    TimePickerDemo
];

//# sourceMappingURL=TimePicker.Demo.js.map
