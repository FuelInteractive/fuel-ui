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
var OffCanvasMenu_1 = require("./OffCanvasMenu");
var OffCanvasMenuDemo = (function () {
    function OffCanvasMenuDemo() {
        this.origin = "left";
        this.width = "25%";
        this.height = "25%";
        this.attributes = [
            new demoUtilities_1.Attribute('origin', '"left" | "top" | "right" "bottom"', '"left"', 'direction the menu extends from'),
            new demoUtilities_1.Attribute('width', 'string', '25% / 100%', 'Width of menu, forced to 100% when menu origin is either top or bottom'),
            new demoUtilities_1.Attribute('height', 'string', '25% / 100%', 'Height of menu, forced to 100% when menu origin is either left or right')
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
        this.events = [
            new demoUtilities_1.Event('close', 'null', 'When the menu is closed'),
            new demoUtilities_1.Event('open', 'null', 'When the menu is opened')
        ];
        this.eventsColumns = demoUtilities_1.EventColumns;
        this.eventsSort = demoUtilities_1.EventsDefaultSort;
    }
    OffCanvasMenuDemo.prototype.onClose = function () {
        console.log("Menu has been closed!");
    };
    OffCanvasMenuDemo.prototype.onOpen = function () {
        console.log("Menu has been opened!");
    };
    OffCanvasMenuDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Off Canvas Menu</h2>\n            <p class=\"card-text\">Menu that originates from off canvas</p>\n        </div>\n    </div>\n</div>\n\n<off-canvas-menu [origin]=\"origin\" [width]=\"width\" [height]=\"height\" \n    (close)=\"onClose()\" (open)=\"onOpen()\" #menu>\n    <div class=\"p-a-1\">\n        <h3>Menu</h3>\n        <button class=\"btn btn-info off-canvas-menu-close\">Close Menu with Class</button>\n        <button class=\"btn btn-primary\" offCanvasMenuClose>Close Menu with Directive</button>\n    </div>\n</off-canvas-menu>\n\n<div class=\"m-a\">\n    <div class=\"row\">\n        <label for=\"origin\" class=\"col-md-1 form-control-label\">Origin</label>\n        <div class=\"col-md-2\">\n            <select name=\"origin\" [(ngModel)]=\"origin\" class=\"c-select\">\n                <option>left</option>\n                <option>right</option>\n                <option>top</option>\n                <option>bottom</option>\n            </select>\n        </div>\n    </div>\n    <div class=\"row\">\n        <label for=\"width\" class=\"col-md-1 form-control-label\">Width</label>\n        <div class=\"col-md-2\">\n            <input type=\"text\" name=\"width\" [(ngModel)]=\"width\">\n        </div>\n    </div>\n    <div class=\"row\">\n        <label for=\"width\" class=\"col-md-1 form-control-label\">Height</label>\n        <div class=\"col-md-2\">\n            <input type=\"text\" name=\"height\" [(ngModel)]=\"height\">\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-2\">\n            <button class=\"btn btn-info\" (click)=\"menu.toggleMenu()\">Open Menu</button>\n        </div>\n    </div>\n</div>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {OFF_CANVAS_MENU_PROVIDERS} from \"fuel-ui/fuel-ui\"\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>The off canvas menu provides a way to extend content from off screen</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;off-canvas-menu [origin]=&quot;origin&quot; [width]=&quot;width&quot; [height]=&quot;height&quot; \n    (close)=&quot;onClose()&quot; (open)=&quot;onOpen()&quot; #menu&gt;\n    &lt;div class=&quot;p-a-1&quot;&gt;\n        &lt;h3&gt;Menu&lt;/h3&gt;\n        &lt;button class=&quot;btn btn-info off-canvas-menu-close&quot;&gt;Close Menu with Class&lt;/button&gt;\n        &lt;button class=&quot;btn btn-primary&quot; offCanvasMenuClose&gt;Close Menu with Directive&lt;/button&gt;\n    &lt;/div&gt;\n&lt;/off-canvas-menu&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class OffCanvasMenuExample {\n    origin = \"left\";  \n    width = \"25%\";\n    height = \"25%\";\n\n    onClose(){\n        console.log(\"Menu has been closed!\");\n    }\n    onOpen(){\n        console.log(\"Menu has been opened!\");\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Events</h3>\n<table-sortable\n    [columns]=\"eventsColumns\"\n    [data]=\"events\"\n    [sort]=\"eventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS, OffCanvasMenu_1.OFF_CANVAS_MENU_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], OffCanvasMenuDemo);
    return OffCanvasMenuDemo;
}());
exports.OffCanvasMenuDemo = OffCanvasMenuDemo;
exports.OFFCANVASMENU_DEMO_PROVIDERS = [
    OffCanvasMenuDemo
];

//# sourceMappingURL=OffCanvasMenu.Demo.js.map
