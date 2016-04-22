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
var Dropdown_1 = require('./Dropdown');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var DropdownDemo = (function () {
    function DropdownDemo() {
        this.attributes = [
            new demoUtilities_1.Attribute('label', 'string', 'null', 'Dropdown button text')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
    }
    DropdownDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Dropdown</h2>\n            <p class=\"card-text\">Dropdown is a custom component to display informational messages</p>\n        </div>\n    </div>\n</div>\n\n<dropdown label=\"test dropdown label\">\n    <a href=\"#\" class=\"dropdown-item\">Link 1</a>\n    <a href=\"#\" class=\"dropdown-item\">Link 2</a>\n    <a href=\"#\" class=\"dropdown-item\">Link 3</a>\n</dropdown>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Dropdown} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Dropdown is a custom element to programmatically create dropdowns</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;dropdown label=&quot;test dropdown label&quot;&gt;\n    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 1&lt;/a&gt;\n    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 2&lt;/a&gt;\n    &lt;a href=&quot;#&quot; class=&quot;dropdown-item&quot;&gt;Link 3&lt;/a&gt;\n&lt;/dropdown&gt;\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Dropdown_1.DROPDOWN_COMPONENT_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], DropdownDemo);
    return DropdownDemo;
}());
exports.DropdownDemo = DropdownDemo;
exports.DROPDOWN_DEMO_PROVIDERS = [
    DropdownDemo
];

//# sourceMappingURL=Dropdown.Demo.js.map
