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
var Tooltip_1 = require('./Tooltip');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var TooltipDemo = (function () {
    function TooltipDemo() {
        this.attributes = [
            new demoUtilities_1.Attribute('tooltip', 'string', 'null', 'Text of the tooltip'),
            new demoUtilities_1.Attribute('position', 'string', 'top', "Position of the tooltip compared to the element. Allows for: 'bottom-right', 'bottom', 'bottom-left', 'right', 'left', 'top-right,' 'top', or 'top-left'"),
            new demoUtilities_1.Attribute('color', 'string', 'none', "Color of tooltip. Allows for: 'error', 'info', 'success', and 'warning'. Using anything else, include 'none', will result in the default black background with white text"),
            new demoUtilities_1.Attribute('rounded', 'boolean', 'false', 'Rounded edges of tooltip'),
            new demoUtilities_1.Attribute('always', 'boolean', 'false', 'Tooltip always displays even on mouseout and unfocus'),
            new demoUtilities_1.Attribute('size', 'string', 'auto', "Forced size of the tooltip. Allows for: 'small', 'medium', and 'large'. Anything else will cause the tooltip to shrink to fit, and stay on a single line."),
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
        this.position = "top";
        this.color = "none";
        this.size = "auto";
        this.rounded = false;
        this.always = false;
    }
    TooltipDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Tooltip</h2>\n            <p class=\"card-text\">Tooltip is a directive that causes a tooltip to display on the elements when it is focused on your hovered over</p>\n        </div>\n    </div>\n</div>\n\n<section class=\"row m-a\">\n    <div class=\"row\">\n        <div class=\"col-md-3\">\n            <a href=\"javascript:;\" tooltip=\"Tooltip text goes here.\" \n                [position]=\"position\" [color]=\"color\" [size]=\"size\"\n                [rounded]=\"rounded\" [always]=\"always\">\n                Some text here.\n            </a>\n        </div>\n        <div class=\"col-md-4 form-group\">\n            <div tooltip=\"You have entered: {{tooltipText}}!\" \n                        [position]=\"position\" [color]=\"color\" [size]=\"size\"\n                        [rounded]=\"rounded\" [always]=\"always\">\n                <input [(ngModel)]=\"tooltipText\" type=\"text\" class=\"form-control\" placeholder=\"Tooltip text\" /> \n            </div>\n            <small class=\"text-muted\">Enter text above, then hover the input.</small>\n        </div>\n    </div><br/>\n    \n    <form>\n        <div class=\"form-group row\">\n            <label for=\"position\" class=\"col-sm-2 col-md-1 form-control-label\">Position</label>\n            <div class=\"col-sm-2\">\n                <select [(ngModel)]=\"position\" class=\"form-control\">\n                    <option value=\"bottom-right\">bottom-right</option>\n                    <option value=\"bottom\">bottom</option>\n                    <option value=\"bottom-left\">bottom-left</option>\n                    <option value=\"right\">right</option>\n                    <option value=\"left\">left</option>\n                    <option value=\"top-right\">top-right</option>\n                    <option value=\"top\">top</option>\n                    <option value=\"top-left\">top-left</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"color\" class=\"col-sm-2 col-md-1 form-control-label\">Color</label>\n            <div class=\"col-sm-2\">\n                <select [(ngModel)]=\"color\" class=\"form-control\">\n                    <option value=\"none\">none</option>\n                    <option value=\"error\">error</option>\n                    <option value=\"warning\">warning</option>\n                    <option value=\"info\">info</option>\n                    <option value=\"success\">success</option>      \n                </select>\n            </div>\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"size\" class=\"col-sm-2 col-md-1 form-control-label\">Size</label>\n            <div class=\"col-sm-2\">\n                <select [(ngModel)]=\"size\" class=\"form-control\">\n                    <option value=\"auto\">auto</option>\n                    <option value=\"small\">small</option>\n                    <option value=\"medium\">medium</option>\n                    <option value=\"large\">large</option>    \n                </select>\n            </div>\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"rounded\" class=\"form-control-label\">Rounded</label>\n            <input #roundedcb type=\"checkbox\" (change)=\"rounded = roundedcb.checked\" [checked]=\"rounded\" />\n        </div>\n        <div class=\"form-group row\">\n            <label for=\"always\" class=\"form-control-label\">Always Showing</label>\n            <input #alwayscb type=\"checkbox\" (change)=\"always = alwayscb.checked\" [checked]=\"always\" />\n        </div>\n    </form>\n</section>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Tooltip} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Tooltip directive makes it easy to add a tooltip to any element. Inputs must be wrapped in a span or div to properly display. Inputs are not containers; therefore, cannot use :before and :after pseudo-elements. </p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;a href=&quot;#&quot; tooltip=&quot;Tooltip text goes here.&quot; \n    [position]=&quot;position&quot; [color]=&quot;color&quot; [size]=&quot;size&quot;\n    [rounded]=&quot;rounded&quot; [always]=&quot;always&quot;&gt;\n    Some text here.\n&lt;/a&gt;\n\n&lt;div class=&quot;col-md-4 form-group&quot;&gt;\n    &lt;div tooltip=&quot;You have entered: {<pre>{</pre>tooltipText}}!&quot; \n                [position]=&quot;position&quot; [color]=&quot;color&quot; [size]=&quot;size&quot;\n                [rounded]=&quot;rounded&quot; [always]=&quot;always&quot;&gt;\n        &lt;input [(ngModel)]=&quot;tooltipText&quot; type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Tooltip text&quot; /&gt; \n    &lt;/div&gt;\n    &lt;small class=&quot;text-muted&quot;&gt;Enter text above, then hover the input.&lt;/small&gt;\n&lt;/div&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class TooltipExample {\n    position: string = \"top\";\n    color: string = \"none\";\n    size: string = \"auto\";\n    rounded: boolean = false;\n    always: boolean = false;\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Tooltip_1.TOOLTIP_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
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
