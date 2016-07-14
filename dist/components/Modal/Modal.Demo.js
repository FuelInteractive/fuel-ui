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
var Modal_1 = require('./Modal');
var CodeHighlighter_1 = require('../../directives/CodeHighlighter/CodeHighlighter');
var TableSortable_1 = require('../../components/TableSortable/TableSortable');
var demoUtilities_1 = require('../../utilities/demoUtilities');
var Tab_1 = require('../../components/Tab/Tab');
var ModalDemo = (function () {
    function ModalDemo() {
        this.closeText = "Cancel";
        this.size = "";
        this.attributes = [
            new demoUtilities_1.Attribute('closeOnUnfocus', 'boolean', 'true', 'Closes the opened modal when the user clicks off of it'),
            new demoUtilities_1.Attribute('closeButton', 'boolean', 'true', "Option to display an 'X' close button in the corner of the modal"),
            new demoUtilities_1.Attribute('modalTitle', 'string', 'null', 'Text to display in modal header'),
            new demoUtilities_1.Attribute('size', 'string', 'null', "Change the size of the modal. Supports 'sm' and 'small' for small size and 'lg' and 'large' for large. Null or empty will keep the default size")
        ];
        this.attributesColumns = demoUtilities_1.AttributeColumns;
        this.attributesSort = demoUtilities_1.AttributesDefaultSort;
        this.events = [
            new demoUtilities_1.Event('close', 'null', 'When the modal is closed'),
            new demoUtilities_1.Event('open', 'null', 'When the modal is opened')
        ];
        this.eventsColumns = demoUtilities_1.EventColumns;
        this.eventsSort = demoUtilities_1.EventsDefaultSort;
    }
    ModalDemo.prototype.onClose = function () {
        console.log("Modal has been closed!");
    };
    ModalDemo.prototype.onOpen = function () {
        console.log("Modal has been opened!");
    };
    ModalDemo = __decorate([
        core_1.Component({
            template: "\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"card card-block\">\n            <h2 class=\"card-title\">Modal</h2>\n            <p class=\"card-text\">Modal is a custom component to display a popup</p>\n        </div>\n    </div>\n</div>\n\n<div class=\"form-group row\">\n    <label for=\"size\" class=\"col-md-1 form-control-label\">Size</label>\n    <div class=\"col-md-2\">\n        <select name=\"size\" [(ngModel)]=\"size\" class=\"c-select\">\n            <option value=\"\">Default</option>\n            <option value=\"sm\">Small</option>\n            <option value=\"lg\">Large</option>\n        </select>\n    </div>\n</div>\n<button class=\"btn btn-primary\" (click)=\"modal.showModal()\">Show Modal</button>\n<modal #modal\n    modalTitle=\"Modal Title\"\n    [closeButton]=\"true\"\n    [closeOnUnfocus]=\"true\"\n    [size]=\"size\"\n    (close)=\"onClose()\"\n    (open)=\"onOpen()\">\n    <div class=\"modal-body\">\n        <ul>\n            <li>Testing 1</li>\n            <li>Testing 2</li>\n            <li>Testing 3</li>\n        </ul>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"modal.closeModal()\">\n            <i class=\"fa fa-chevron-left\"></i> Go Back\n        </button>\n    </div>\n</modal>\n\n<div class=\"source\">\n<h3>Import</h3>\n<pre>\n<code class=\"language-javascript\" code-highlight>\nimport {Modal} from 'fuel-ui/fuel-ui';\n</code>\n</pre>\n\n<h3>Getting Started</h3>\n<p>Modal is a custom element to create a popup</p>\n\n<h3>Usage</h3>\n<tabset>\n<tab heading=\"HTML\">\n<pre>\n<code class=\"language-markup\" code-highlight>\n&lt;button class=&quot;btn btn-primary&quot; (click)=&quot;modal.showModal()&quot;&gt;Toggle Modal&lt;/button&gt;\n&lt;modal #modal\n    modalTitle=&quot;Modal Title&quot;\n    [closeButton]=&quot;true&quot;\n    [closeOnUnfocus]=&quot;true&quot;\n    size=&quot;lg&quot;\n    (close)=&quot;onClose()&quot;\n    (open)=&quot;onOpen()&quot;&gt;\n    &lt;div class=&quot;modal-body&quot;&gt;\n        &lt;ul&gt;\n            &lt;li&gt;Any&lt;/li&gt;\n            &lt;li&gt;Html&lt;/li&gt;\n            &lt;li&gt;Here&lt;/li&gt;\n        &lt;/ul&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;modal-footer&quot;&gt;\n        &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; (click)=&quot;modal.closeModal()&quot;&gt;\n            &lt;i class=&quot;fa fa-chevron-left&quot;&gt;&lt;/i&gt; Go Back\n        &lt;/button&gt;\n    &lt;/div&gt;\n&lt;/modal&gt;\n</code>\n</pre>\n</tab>\n<tab heading=\"TypeScript\">\n<pre>\n<code class=\"language-javascript\" code-highlight>\nexport class ModalExample {\n    onClose(){\n        console.log(\"Modal has been closed!\");\n    }\n    onOpen(){\n        console.log(\"Modal has been opened!\");\n    }\n}\n</code>\n</pre>\n</tab>\n</tabset>\n\n<h3>Attributes</h3>\n<table-sortable\n    [columns]=\"attributesColumns\"\n    [data]=\"attributes\"\n    [sort]=\"attributesSort\">\n    Loading table...\n</table-sortable>\n\n<h3>Events</h3>\n<table-sortable\n    [columns]=\"eventsColumns\"\n    [data]=\"events\"\n    [sort]=\"eventsSort\">\n    Loading table...\n</table-sortable>\n\n</div>",
            directives: [Modal_1.MODAL_PROVIDERS, CodeHighlighter_1.CodeHighlighter, TableSortable_1.TableSortable, Tab_1.TAB_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], ModalDemo);
    return ModalDemo;
}());
exports.ModalDemo = ModalDemo;
exports.MODAL_DEMO_PROVIDERS = [
    ModalDemo
];

//# sourceMappingURL=Modal.Demo.js.map
