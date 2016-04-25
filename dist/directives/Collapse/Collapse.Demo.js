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
var Collapse_1 = require('./Collapse');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var CollapseDemo = (function () {
    function CollapseDemo() {
        this.collapsed = false;
        this.duration = 500;
        this.attributes = [
            new demoUtilities_1.Attribute('collapse', 'boolean', 'false', 'Boolean whether the content is shown or hidden'),
            new demoUtilities_1.Attribute('duration', 'number', '500', 'Number of milliseconds for how long the open/close animation takes')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    CollapseDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Collapse</h2>\n            <p class=\"card-text\">Collapse is a custom directive to display and hide content on click</p>\n        </div>\n    </div>\n</div>\n\n<button class=\"btn btn-primary\" (click)=\"collapsed = !collapsed\">Toggle Collapse</button>\n<style>\n    #collapse-demo-box {\n        border: 1px solid black; \n        padding: 0 25px;\n    }\n</style>\n<div id=\"collapse-demo-box\" [collapse]=\"collapsed\" [duration]=\"duration\">\n    <h2>All of your content</h2>\n    <ul>\n        <li>That you wish</li>\n        <li>to be able</li>\n        <li>to collapse</li>\n    </ul>\n    <p>At any time!</p>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Collapse} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Collapse allows you to toggle content on the page with a nice sliding animation</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;div [collapse]=&quot;collapsed&quot; [duration]=&quot;duration&quot;&gt;\n    &lt;h2&gt;All of your content&lt;/h2&gt;\n    &lt;ul&gt;\n        &lt;li&gt;That you wish&lt;/li&gt;\n        &lt;li&gt;to be able&lt;/li&gt;\n        &lt;li&gt;to collapse&lt;/li&gt;\n    &lt;/ul&gt;\n    &lt;p&gt;At any time!&lt;/p&gt;\n&lt;/div&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class CollapseExample { \n    collapsed: boolean = false;\n    duration: number = 500;\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Collapse_1.COLLAPSE_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], CollapseDemo);
    return CollapseDemo;
}());
exports.CollapseDemo = CollapseDemo;
exports.COLLAPSE_DEMO_PROVIDERS = [
    CollapseDemo
];

//# sourceMappingURL=Collapse.Demo.js.map
