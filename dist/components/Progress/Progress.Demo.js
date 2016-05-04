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
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var ProgressDemo = (function () {
    function ProgressDemo() {
        this.progress = 25;
        this.attributes = [
            new demoUtilities_1.Attribute('value', 'number', '0', 'Percentage of progress bar that is filled'),
            new demoUtilities_1.Attribute('max', 'number', '1', 'The number to fill the progress bar completely')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    ProgressDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Progress</h2>\n            <p class=\"card-text\">Progress is a custom component to display an overall progress based on percentage</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <form>\n        <div class=\"form-group row\">\n            <label for=\"progress\" class=\"col-sm-2 form-control-label\">Progress %</label>\n            <div class=\"col-sm-2\">\n                <input class=\"form-control\" [(ngModel)]=\"progress\" min=\"0\" max=\"100\" type=\"number\" name=\"progress\">\n            </div>\n        </div>\n    </form>\n    <progress class=\"progress progress-striped progress-animated\" [value]=\"progress\" max=\"100\">{{progress}}%</progress>\n</section>\n\n<div class=\"source\">\n<h3>Getting Started</h3>\n<p>Progress is an HTML5 Bootstrap element that displays a graphical progress bar</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;progress \n    class=&quot;progress progress-striped progress-animated&quot;\n    [value]=&quot;progress&quot; \n    max=&quot;100&quot;&gt;\n        {<pre>{</pre>progress}}%\n&lt;/progress&gt;\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressDemo);
    return ProgressDemo;
}());
exports.ProgressDemo = ProgressDemo;
exports.PROGRESS_DEMO_PROVIDERS = [
    ProgressDemo
];

//# sourceMappingURL=Progress.Demo.js.map
