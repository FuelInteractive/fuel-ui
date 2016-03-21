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
var Tooltip_1 = require('./Tooltip');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TooltipDemo = (function () {
    function TooltipDemo() {
    }
    TooltipDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Tooltip</h2>\n            <p class=\"card-text\">Tooltip is a directive that causes a tooltip to display on the elements when it is focused on your hovered over</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div tooltip=\"Tooltip text goes here.\">Some text here.</div>\n    <div tooltip=\"Example data binding: {{tooltipText}}!\">Hover me with input value</div> <input [(ngModel)]=\"tooltipText\" type=\"text\" class=\"form-control\">\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Tooltip} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Tooltip directive makes it easy to add a tooltip to any element</p>\n\n<h3>Usage</h3>\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;div tooltip=&quot;Tooltip text goes here.&quot;&gt;Some text here.&lt;/div&gt;\n</code>\n</pre>\n\n<h3>Attributes</h3>\n<table class=\"table table-bordered table-striped\">\n    <thead>\n        <tr>\n            <th>Name</th>\n            <th>Type</th>\n            <th>Default</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>tooltip</td>\n            <td>string</td>\n            <td>null</td>\n            <td>Text of the tooltip</td>\n        </tr>\n    </tbody>\n</table>\n\n</div>",
            directives: [Tooltip_1.TOOLTIP_PROVIDERS, CodeHighlighter_1.CodeHighlighter]
        }), 
        __metadata('design:paramtypes', [])
    ], TooltipDemo);
    return TooltipDemo;
}());
exports.TooltipDemo = TooltipDemo;
exports.TOOLTIP_DEMO_PROVIDERS = [
    TooltipDemo
];

//# sourceMappingURL=Tooltip.Demo.js.map
